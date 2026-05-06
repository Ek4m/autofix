export const httpClient = async (url: string, options: RequestInit) => {
  const isFormData = options.body instanceof FormData;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });
  const result = await response.json();
  if (("ok" in response && !response.ok) || response.status >= 400) {
    throw new Error(result.message || "HTTP error");
  }
  return result.data;
};
