"use client";

import { Roboto_Condensed } from "next/font/google";
import { Resume } from "./resume";

export function Profiler() {
  return (
    <>
      <h1 className={"text-white text-5xl lg:text-6xl lg:w-full"}>
        Cristiano Gonçalves
      </h1>

      <Resume />
    </>
  );
}
