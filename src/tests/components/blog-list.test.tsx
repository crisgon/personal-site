import { BlogList } from "@/components/blog/blog-list";
import { render, screen } from "@testing-library/react";

test("Should render the blog post list", async function () {
  render(
    <BlogList
      posts={[
        {
          id: "1",
          title: "Titulo 1",
          date: new Date(),
          readingTimeInSeconds: 60,
          link: "/titulo_1",
        },
        {
          id: "2",
          title: "Titulo 2",
          date: new Date(),
          readingTimeInSeconds: 120,
          link: "/titulo_2",
        },
      ]}
    />,
  );

  const posts = await screen.findAllByRole("heading");
  expect(posts).toHaveLength(2);
});
