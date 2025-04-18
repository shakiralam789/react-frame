import { useCallback } from "react";
import { useForm as useHookForm } from "react-hook-form";
import useApi from "./useApi";

// Improved form hook
export default function useForm(defaultValues = {}) {
  const formMethods = useHookForm({ defaultValues });
  const {
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = formMethods;

  const api = useApi();

  const submit = useCallback(
    async (callback) => {
      try {
        api.processing = true;
        await callback(getValues());
      } finally {
        api.processing = false;
      }
    },
    [getValues, api]
  );

  // Optimized to avoid unnecessary re-renders
  const setFormData = useCallback(
    (key, value) => {
      if (typeof key !== "string") {
        console.error("setFormData error: key must be a string", key);
        return;
      }
      setValue(key, value);
    },
    [setValue]
  );

  return {
    ...formMethods,
    ...api,
    isSubmitting,
    errors,
    submit,
    setData: setFormData,
  };
}
