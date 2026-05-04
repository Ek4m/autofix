export function urlFactory(
  baseUrl: string,
  params: Record<string, string | number | boolean> = {},
) {
  const paramsStr: string[] = [];
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      paramsStr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });
  return `${baseUrl}?${paramsStr.join("&")}`;
}
