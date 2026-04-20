export const httpClient = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if ("ok" in response && !response.ok) {
    throw new Error(result.message || "HTTP error");
  }
  return result;
};
