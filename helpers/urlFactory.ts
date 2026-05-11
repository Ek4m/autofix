export function urlFactory(
  baseUrl: string,
  params: Record<string, string | number | boolean | null | undefined> = {},
) {
  const paramsStr: string[] = [];
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      paramsStr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });
  return `${baseUrl}?${paramsStr.join("&")}`;
}
