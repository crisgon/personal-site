import Blog from "@/app/blog/page";
import { render, screen } from "@testing-library/react";

test("Should render the blog content", async function () {
  render(<Blog />);

  const title = await screen.findByText("Compartilhar para aprender!");
  expect(title).toBeInTheDocument();
});
