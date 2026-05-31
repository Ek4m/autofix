export const httpClient = async (url: string, options: RequestInit) => {
  const isFormData = options.body instanceof FormData;
  const response = await fetch("http://localhost:4000" + url, {
    ...options,
    credentials: "include",
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });
  console.log(
    "_______________________________________________________",
    response,
  );
  const result = await response.json();
  if (("ok" in response && !response.ok) || response.status >= 400) {
    throw new Error(result.message || "HTTP error");
  }
  return result.data;
};
