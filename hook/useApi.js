import { useCallback, useState } from "react";

export default function useApi(baseUrl = process.env.NEXT_PUBLIC_API_URL) {
  const [processing, setProcessing] = useState(false);
  const [apiErrors, setApiErrors] = useState(null);

  const request = useCallback(
    async (method, url, options = {}, onAction = {}) => {
      const { onSuccess, onError } = onAction;
      setProcessing(true);
      setApiErrors({});

      try {
        const isFormData = options.body instanceof FormData;
        const fetchOptions = {
          method,
          ...options,
        };

        if (!isFormData && method !== "GET") {
          fetchOptions.headers = {
            "Content-Type": "application/json",
            ...options.headers,
          };
          if (options.body) {
            fetchOptions.body = JSON.stringify(options.body);
          }
        }

        const response = await fetch(`${baseUrl}${url}`, fetchOptions);

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.errors) {
            setApiErrors(errorData.errors);
            onError?.(errorData.errors);
          }
          throw new Error(errorData.message || `Error: ${response.status}`);
        }
        let responseData = await response.json();
        onSuccess?.(responseData);
        return responseData;
      } catch (error) {
        onError?.(error);
        return { error: error?.message };
      } finally {
        setProcessing(false);
      }
    },
    [baseUrl]
  );

  const post = useCallback(
    (url, options, onAction) => request("POST", url, options, onAction),
    [request]
  );

  const put = useCallback(
    (url, options, onAction) => request("PUT", url, options, onAction),
    [request]
  );

  const get = useCallback(
    (url, onAction) => request("GET", url, {}, onAction),
    [request]
  );

  return {
    processing,
    apiErrors,
    request,
    post,
    put,
    get,
  };
}
