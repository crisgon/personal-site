import { Header } from "@/components/header";
import { Roboto } from "next/font/google";
import { Footer } from "@/components/footer";

import "../../public/css/highlightjs.css";

import Link from "next/link";
import type { Metadata } from "next";

import "./globals.css";

const roboto = Roboto({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cristiano Gonçalves",
  description: "Desenvolvedor Frontend",
  openGraph: {
    images: ["/thumb.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className}  max-w-4xl min-h-screen m-auto flex flex-col p-5 bg-[url('/bg-2.png')] bg-cover bg-center bg-no-repeat`}
      >
        <Header.Root>
          <Header.Logo />
          <Header.Nav>
            <Header.NavItem name="blog">
              <Link href="/blog">Blog</Link>
            </Header.NavItem>
            <Header.NavItem name="about">
              <Link href="/about">Sobre</Link>
            </Header.NavItem>
            <Header.NavItem name="talks">
              <Link href="/talks">Talks</Link>
            </Header.NavItem>
          </Header.Nav>
        </Header.Root>

        {children}

        <Footer.Root>
          <Footer.SocialLinks>
            <Footer.SocialLink
              name="Github"
              link="https://github.com/crisgon"
            />
            <Footer.SocialLink
              name="Twitter"
              link="https://twitter.com/Gonkristiano"
            />
            <Footer.SocialLink
              name="Linkedin"
              link="https://www.linkedin.com/in/cristiano-gon%C3%A7alves/"
            />
          </Footer.SocialLinks>
        </Footer.Root>
      </body>
    </html>
  );
}
