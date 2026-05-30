import { blogs } from "./mockData";

export async function getBlog(slug: string) {
  return blogs.find((b) => b.slug === slug);
}
