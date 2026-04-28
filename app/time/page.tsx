"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TimeConfigurator() {
  const [timeInput, setTimeInput] = useState<number>(10);
  const [saved, setSaved] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTime = localStorage.getItem("customMediaTime");
    if (savedTime) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeInput(parseInt(savedTime, 10) / 1000);
    }
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
    );
  }, []);

  const handleSave = () => {
    localStorage.setItem("customMediaTime", (timeInput * 1000).toString());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex items-center justify-center p-6">
      <div
        ref={cardRef}
        className="max-w-md w-full bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 border border-neutral-100"
      >
        <h1 className="text-2xl font-bold mb-6 tracking-tight">
          Configuration
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Durée d&apos;affichage des médias (en secondes)
            </label>
            <input
              type="number"
              min="5"
              value={timeInput}
              onChange={(e) => setTimeInput(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-neutral-50"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-black text-white rounded-xl py-3.5 font-medium hover:bg-neutral-800 transition-colors active:scale-95"
          >
            {saved ? "Mise à jour effectuée !" : "Sauvegarder"}
          </button>
        </div>
      </div>
    </div>
  );
}
