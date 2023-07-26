import { BlogItem } from "@/components/blog/blog-item";
import { render, screen } from "@testing-library/react";

test("Should render the post component", async function () {
  render(
    <BlogItem
      title={"Titulo 1"}
      readingTimeInSeconds={60}
      date={new Date("2023-07-25T22:00:00")}
      link={"/titulo_1"}
    />,
  );

  const title = await screen.findByRole("heading");
  const link = await screen.findByRole("link");
  expect(title.innerHTML).toBe("Titulo 1");
  expect(link).toHaveAttribute("href", "/titulo_1");
});

test("Should render the date formated correctly", async function () {
  render(
    <BlogItem
      title={"Titulo 1"}
      readingTimeInSeconds={60}
      date={new Date("2023-07-25T22:00:00")}
      link={"/titulo_1"}
    />,
  );

  const date = await screen.findByText("25 de julho de 2023");
  expect(date).toBeInTheDocument();
});

test("Should render the reading time formated correctly", async function () {
  render(
    <BlogItem
      title={"Titulo 1"}
      readingTimeInSeconds={175}
      date={new Date("2023-07-25T22:00:00")}
      link={"/titulo_1"}
    />,
  );

  const readingTime = await screen.findByText("3 minutos");
  expect(readingTime).toBeInTheDocument();
});
