import { Footer } from "@/components/footer";
import { render, screen } from "@testing-library/react";

test("Should render the social links correctly", async function () {
  render(
    <Footer.Root>
      <Footer.SocialLinks>
        <Footer.SocialLink name="Github" link="https://github.com/crisgon" />
        <Footer.SocialLink
          name="Twitter"
          link="https://twitter.com/Gonkristiano"
        />
        <Footer.SocialLink
          name="Linkedin"
          link="https://www.linkedin.com/in/cristiano-gon%C3%A7alves/"
        />
      </Footer.SocialLinks>
    </Footer.Root>,
  );

  const github = await screen.findByText("Github");
  expect(github).toHaveAttribute("href", "https://github.com/crisgon");
  expect(github).toHaveAttribute("target", "_blank");

  const twitter = await screen.findByText("Twitter");
  expect(twitter).toHaveAttribute("href", "https://twitter.com/Gonkristiano");
  expect(twitter).toHaveAttribute("target", "_blank");

  const linkedin = await screen.findByText("Linkedin");
  expect(linkedin).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/cristiano-gon%C3%A7alves/",
  );
  expect(linkedin).toHaveAttribute("target", "_blank");
});
