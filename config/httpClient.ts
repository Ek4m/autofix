export const httpClient = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        "Content-Type": "application/json",
      },
    });
    if ("ok" in response && !response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("RESPONSE", response);
    return await response.json();
  } catch (error) {
    console.error("HTTP Client error:", error);
    throw error;
  }
};
