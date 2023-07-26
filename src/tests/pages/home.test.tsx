import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

test("Should render the home content", async function () {
  render(<Home />);

  const title = await screen.findByText("Cristiano Gonçalves");
  expect(title).toBeInTheDocument();
});
