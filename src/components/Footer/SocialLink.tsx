import { Roboto } from "next/font/google";

const robotoWeight400 = Roboto({ weight: "400", subsets: ["latin"] });

interface SocialLinkProps {
  name: string;
  link: string;
}
export function SocialLink({ link, name }: SocialLinkProps) {
  return (
    <li className={`${robotoWeight400.className} hover:primary-gradient-text`}>
      <a href={link} target="_blank">
        {name}
      </a>
    </li>
  );
}
