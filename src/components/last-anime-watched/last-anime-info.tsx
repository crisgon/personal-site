"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

interface LastAnimeInfoProps {
  name: string;
  japaneseName: string;
  synopsis: string;
  imageUrl: string;
  score: string;
}

export function LastAnimeInfo({
  name,
  japaneseName,
  synopsis,
  imageUrl,
  score,
}: LastAnimeInfoProps) {
  const [show, setShow] = useState(true);
  return (
    <>
      <IoMdInformationCircleOutline
        onClick={() => setShow(true)}
        className="cursor-pointer text-xl"
      />

      {createPortal(
        <dialog
          open={show}
          className="fixed top-1/2 
            -translate-y-1/2 bg-neutral-900 rounded-lg border-0 z-50 shadow-2xl p-6 w-[400px] text-white"
        >
          <div>
            <img width={200} src={imageUrl} className="mb-4" />
            <h3 className="font-extrabold">{name}</h3>
            <h4 className="italic">{japaneseName}</h4>
            <div className="flex gap-2 mt-4">
              <h4>{score}</h4>
              <FaStar className="text-yellow-400" />
            </div>
            <p className="pt-2 text-sm">{synopsis}</p>
            <button
              className="absolute top-4 right-4 cursor-pointer text-2xl"
              onClick={() => setShow(false)}
            >
              <IoCloseOutline />
            </button>
          </div>
        </dialog>,
        document.body,
      )}
    </>
  );
}
