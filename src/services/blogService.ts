import type { Blog } from "../types/blog";

const BLOG_URL =
  "https://ambchapcorps.org/api/blog";

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