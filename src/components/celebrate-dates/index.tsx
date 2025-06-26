"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";

export function CelebrateDates() {
  function celebrate() {
    confetti({
      particleCount: 50,
      spread: 35,
      origin: { y: 0.6 },
    });
  }

  useEffect(() => {
    toast.custom(
      t => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full border border-neutral-800 bg-neutral-900 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 `}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5 text-lg">🎂</div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-bold  primary-gradient-text">
                  Hoje é o meu aniversário!
                </p>
                <p className="mt-1 text-sm">
                  Estou compilando mais um ano de histórias incríveis.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                toast.dismiss(t.id);

                celebrate();
              }}
              className="w-fit border border-transparent rounded p-2 text-sm font-medium"
            >
              Dispensar!
            </button>
          </div>
        </div>
      ),
      {
        position: "bottom-center",
        duration: 50000,
      },
    );
  }, []);

  return null;
}
