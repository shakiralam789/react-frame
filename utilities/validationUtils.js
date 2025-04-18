// utils/validationUtils.js
"use client";

/**
 * A collection of common form validation rules and utility functions
 * for use with custom form hooks or React Hook Form
 */

// Email validation regular expression
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// URL validation regular expression
const URL_REGEX = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

// Phone number validation (supports different formats)
const PHONE_REGEX = /^(\+?\d{1,3}[- ]?)?\(?(?:\d{2,3})\)?[- ]?(\d{3,4})[- ]?(\d{4})$/;

/**
 * Email validation rule
 * @param {string} message - Custom error message
 * @returns {object} Validation rule object
 */
export const emailRule = (message = "Please enter a valid email address") => ({
  pattern: {
    value: EMAIL_REGEX,
    message: message
  }
});

/**
 * Required field validation rule
 * @param {string} message - Custom error message
 * @returns {object} Validation rule object
 */
export const requiredRule = (message = "This field is required") => ({
  required: message
});

/**
 * Minimum length validation rule
 * @param {number} length - Minimum length required
 * @param {string} message - Custom error message
 * @returns {object} Validation rule object
 */
export const minLengthRule = (length, message = `Must be at least ${length} characters`) => ({
  minLength: {
    value: length,
    message: message
  }
});

/**
 * Maximum length validation rule
 * @param {number} length - Maximum length allowed
 * @param {string} message - Custom error message
 * @returns {object} Validation rule object
 */
export const maxLengthRule = (length, message = `Cannot exceed ${length} characters`) => ({
  maxLength: {
    value: length,
    message: message
  }
});

/**
 * URL validation rule
 * @param {string} message - Custom error message
 * @returns {object} Validation rule object
 */
export const urlRule = (message = "Please enter a valid URL") => ({
  pattern: {
    value: URL_REGEX,
    message: message
  }
});

/**
 * Phone number validation rule
 * @param {string} message - Custom error message
 * @returns {object} Validation rule object
 */
export const phoneRule = (message = "Please enter a valid phone number") => ({
  pattern: {
    value: PHONE_REGEX,
    message: message
  }
});

/**
 * Match field validation rule (e.g., password confirmation)
 * @param {string} fieldToMatch - Name of the field to match against
 * @param {object} formValues - Current form values
 * @param {string} message - Custom error message
 * @returns {object} Validation rule object
 */
export const matchFieldRule = (
  fieldToMatch, 
  formValues, 
  message = "Fields do not match"
) => ({
  validate: (value) => value === formValues[fieldToMatch] || message
});

/**
 * Combine multiple validation rules into a single object
 * @param {...object} rules - Validation rules to combine
 * @returns {object} Combined validation rules
 */
export const combineRules = (...rules) => {
  return rules.reduce((combined, rule) => {
    // Handle special properties that need merging
    if (rule.validate && combined.validate) {
      const existingValidate = combined.validate;
      combined.validate = (value, formValues) => {
        const existingResult = typeof existingValidate === 'function' 
          ? existingValidate(value, formValues)
          : Object.entries(existingValidate).reduce((acc, [key, fn]) => {
              const result = fn(value, formValues);
              return result === true ? acc : result;
            }, true);
            
        const newResult = typeof rule.validate === 'function'
          ? rule.validate(value, formValues)
          : Object.entries(rule.validate).reduce((acc, [key, fn]) => {
              const result = fn(value, formValues);
              return result === true ? acc : result;
            }, true);
            
        return existingResult === true ? newResult : existingResult;
      };
    } else if (rule.validate) {
      combined.validate = rule.validate;
    }
    
    // Merge everything else
    return { ...combined, ...rule };
  }, {});
};

/**
 * Create common field validations for a form (useful for reuse)
 * @returns {object} Object containing validation rules for common fields
 */
export const commonValidations = {
  email: combineRules(
    requiredRule("Email is required"),
    emailRule()
  ),
  password: combineRules(
    requiredRule("Password is required"),
    minLengthRule(8, "Password must be at least 8 characters")
  ),
  name: combineRules(
    requiredRule("Name is required"),
    minLengthRule(2, "Name must be at least 2 characters")
  ),
  phone: combineRules(
    requiredRule("Phone number is required"),
    phoneRule()
  )
};

/**
 * Example of how to use these utilities with your form
 * 
 * In your component:
 * 
 * import { emailRule, requiredRule, minLengthRule, combineRules } from '@/utils/validationUtils';
 * 
 * // Then in your form:
 * <TextField
 *   {...register("email", combineRules(
 *     requiredRule("Email is required"),
 *     emailRule()
 *   ))}
 *   placeholder="Enter your email address"
 * />
 * 
 * // Or use commonValidations:
 * <TextField
 *   {...register("email", commonValidations.email)}
 *   placeholder="Enter your email address"
 * />
 */

// Create a named export object
const ValidationUtils = {
  emailRule,
  requiredRule,
  minLengthRule,
  maxLengthRule,
  urlRule,
  phoneRule,
  matchFieldRule,
  combineRules,
  commonValidations,
  patterns: {
    email: EMAIL_REGEX,
    url: URL_REGEX,
    phone: PHONE_REGEX
  }
};

export default ValidationUtils;