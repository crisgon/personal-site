import Script from "next/script";

import { Header } from "@/components/header";
import { Roboto } from "next/font/google";
import { Footer } from "@/components/footer";

import "../../public/css/highlightjs.css";

import Link from "next/link";
import type { Metadata } from "next";

import "./globals.css";
import { SchemaMarkup } from "@/components/schema-markup";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
const roboto = Roboto({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cristiano Gonçalves",
  description: "Desenvolvedor Frontend",
  openGraph: {
    images: ["/thumb.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className}  max-w-4xl min-h-screen m-auto flex flex-col p-5 bg-black`}
      >
        <main className="h-[100dvh] grid grid-rows-[71.98px_1fr_88px]">
          <SpeedInsights />
          <Header.Root>
            <Header.Logo />
            <Header.Nav>
              <Header.NavItem name="blog">
                <Link href="/blog">Blog</Link>
              </Header.NavItem>
              <Header.NavItem name="about">
                <Link href="/about">Sobre</Link>
              </Header.NavItem>
              <Header.NavItem name="events">
                <Link href="/events">Eventos</Link>
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

          <Toaster />
        </main>
        <Script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function (c, l, a, r, i, t, y) {
            c[a] =
              c[a] ||
              function () {
                (c[a].q = c[a].q || []).push(arguments);
              };
            t = l.createElement(r);
            t.async = 1;
            t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t, y);
          })(window, document, "clarity", "script", "ihqq6zm106");
          `,
          }}
          strategy="beforeInteractive"
          async
        />
      </body>

      <SchemaMarkup />
    </html>
  );
}
