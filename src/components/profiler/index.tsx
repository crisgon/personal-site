import { Roboto_Condensed } from "next/font/google";
import { ProfileImage } from "./profile-image";
import { Resume } from "./resume";

const roboto = Roboto_Condensed({ weight: "400", subsets: ["latin"] });

export function Profiler() {
  return (
    <div className={`${roboto.className} `}>
      <div className="grid grid-cols-[1fr_auto] items-center lg:gap-4 w-full max-w-lg">
        <h1 className={"text-white text-4xl lg:text-5xl lg:w-full"}>
          Cristiano Gonçalves
        </h1>
        <ProfileImage />
      </div>

      <Resume />
    </div>
  );
}
