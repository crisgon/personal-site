import { BlogList } from "@/components/blog/blog-list";
import { render, screen } from "@testing-library/react";

test("Should render the blog post list", async function () {
  render(
    <BlogList
      posts={[
        {
          title: "Titulo 1",
          formattedDate: "21 abr 2023",
          readingTime: 60,
          slug: "/titulo_1",
        },
        {
          title: "Titulo 2",
          formattedDate: "21 abr 2023",
          readingTime: 120,
          slug: "/titulo_2",
        },
      ]}
    />,
  );

  const posts = await screen.findAllByRole("heading");
  expect(posts).toHaveLength(2);
});
