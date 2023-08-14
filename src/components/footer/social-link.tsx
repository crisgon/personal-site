interface SocialLinkProps {
  name: string;
  link: string;
}
export function SocialLink({ link, name }: SocialLinkProps) {
  return (
    <li className={"text-white hover:primary-gradient-text"}>
      <a href={link} target="_blank">
        {name}
      </a>
    </li>
  );
}
