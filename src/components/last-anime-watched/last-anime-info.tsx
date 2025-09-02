"use client";

import { useEffect, useRef, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <IoMdInformationCircleOutline
        onClick={openDialog}
        className="cursor-pointer text-xl"
      />

      {mounted &&
        createPortal(
          <dialog
            ref={dialogRef}
            className="bg-neutral-900 rounded-lg border-0 z-50 shadow-2xl p-6 max-w-[400px] w-full text-white"
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
                onClick={closeDialog}
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
