import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className={
        "font-bungee text-black text-2xl flex items-center justify-center bg-white rounded-xl w-10 h-10 hover:bg-gradient-to-r from-orange-600 to-pink-600"
      }
    >
      C
    </Link>
  );
}
