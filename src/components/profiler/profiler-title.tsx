'use client'
import { useState } from "react";

export function ProfilerTitle() {
    const [nameType, setNameType] = useState<'br' | 'jp'>("br");

    return (

        <h1 className={"text-white text-5xl lg:text-6xl lg:w-full"} title={nameType === "br" ? "" : "Meu nome em japonês: Ku-ri-su-chi-a-no"} onDoubleClick={() => setNameType(nameType === "br" ? "jp" : "br")}>
            {nameType === "br" ? "Cristiano Gonçalves" : "クリスチアノ"}
        </h1>


    );
}