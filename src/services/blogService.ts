import type { Blog } from "../types/blog";
import { API_BASE } from "../utils/api";

const BLOG_URL = `${API_BASE}/blog`;

export const fetchBlogs =
  async (): Promise<Blog[]> => {
    const response =
      await fetch(BLOG_URL);

    const data =
      await response.json();

    return data.data || [];
  };

export const fetchBlogById =
  async (
    id: number
  ): Promise<Blog> => {
    const response =
      await fetch(
        `${BLOG_URL}/${id}`
      );

    const data =
      await response.json();

    return data.data;
  };