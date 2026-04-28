"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { mediaList } from "../app/data/mediaList";

gsap.registerPlugin(useGSAP);

export default function DisplayBoard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentImgRef = useRef<HTMLImageElement>(null);
  const nextImgRef = useRef<HTMLImageElement>(null);

  const currentLayerRef = useRef<HTMLDivElement>(null);
  const nextLayerRef = useRef<HTMLDivElement>(null);
  const logoPanelRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);

  const currentIndexRef = useRef(0);
  const mediaDurationRef = useRef(10000);

  useGSAP(
    () => {
      const savedTime = localStorage.getItem("customMediaTime");
      if (savedTime) mediaDurationRef.current = parseInt(savedTime, 10);

      let timeoutId: ReturnType<typeof setTimeout>;

      gsap.set(currentLayerRef.current, { xPercent: 0 });
      gsap.set(nextLayerRef.current, { xPercent: -100 });
      gsap.set(logoPanelRef.current, { xPercent: -100 });
      gsap.set(logoImgRef.current, {
        rotation: 0,
        rotationY: 0,
        opacity: 0,
        scale: 0.5,
      });

      const runCycle = () => {
        const cur = currentIndexRef.current;
        const next = (cur + 1) % mediaList.length;

        if (nextImgRef.current) {
          nextImgRef.current.src = mediaList[next].src;
        }

        const tl = gsap.timeline({
          onComplete: () => {
            if (currentImgRef.current && nextImgRef.current) {
              currentImgRef.current.src = mediaList[next].src;
            }

            gsap.set(currentLayerRef.current, { xPercent: 0 });
            gsap.set(nextLayerRef.current, { xPercent: -100 });
            gsap.set(logoPanelRef.current, { xPercent: -100 });

            gsap.set(logoImgRef.current, {
              rotation: 0,
              rotationY: 0,
              opacity: 0,
              scale: 0.5,
            });

            currentIndexRef.current = next;

            timeoutId = setTimeout(runCycle, mediaDurationRef.current);
          },
        });

        // ==========================================
        // ÉTAPE 1 : L'ENTRÉE DU LOGO
        // ==========================================
        tl.to(
          currentLayerRef.current,
          { xPercent: 100, duration: 1.2, ease: "power2.inOut" },
          "entree",
        );
        tl.to(
          logoPanelRef.current,
          { xPercent: 0, duration: 1.2, ease: "power2.inOut" },
          "entree",
        );

        tl.to(
          logoImgRef.current,
          {
            rotation: 360,
            rotationY: 360,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "entree+=0.2",
        );

        // ==========================================
        // ÉTAPE 2 : LA PAUSE (1 seconde figée)
        // ==========================================
        tl.to({}, { duration: 1 });

        // ==========================================
        // ÉTAPE 3 : LA SORTIE DU LOGO
        // ==========================================
        tl.to(
          logoPanelRef.current,
          { xPercent: 100, duration: 1.2, ease: "power2.inOut" },
          "sortie",
        );
        tl.to(
          nextLayerRef.current,
          { xPercent: 0, duration: 1.2, ease: "power2.inOut" },
          "sortie",
        );

        tl.to(
          logoImgRef.current,
          {
            rotation: 720,
            rotationY: 720,
            opacity: 0,
            scale: 0.5,
            duration: 1.2,
            ease: "power2.in",
          },
          "sortie",
        );
      };

      timeoutId = setTimeout(runCycle, mediaDurationRef.current);

      return () => {
        clearTimeout(timeoutId);
        gsap.killTweensOf([
          currentLayerRef.current,
          nextLayerRef.current,
          logoPanelRef.current,
          logoImgRef.current,
        ]);
      };
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <main
      className="relative flex h-screen w-screen items-center justify-center bg-black overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute w-0 h-0 opacity-0 overflow-hidden pointer-events-none">
        {mediaList.map((media) => (
          <img
            key={`preload-${media.id}`}
            src={media.src}
            alt=""
            decoding="async"
            loading="eager"
          />
        ))}
      </div>

      <div className="relative w-full max-w-[100vw] aspect-video bg-black overflow-hidden shadow-2xl">
        <div
          ref={nextLayerRef}
          className="absolute inset-0 will-change-transform z-30"
        >
          <img
            ref={nextImgRef}
            src={mediaList[1].src}
            alt="Slide suivante"
            className="w-full h-full object-cover"
            decoding="async"
          />
        </div>

        <div
          ref={logoPanelRef}
          className="absolute inset-0 flex items-center justify-center bg-black will-change-transform z-20"
        >
          <img
            ref={logoImgRef}
            src="/Logo _ Les Pétillantes_fonds clairs.svg"
            alt="Logo"
            className="w-80 h-80 object-contain will-change-transform"
          />
        </div>

        <div
          ref={currentLayerRef}
          className="absolute inset-0 will-change-transform z-10"
        >
          <img
            ref={currentImgRef}
            src={mediaList[0].src}
            alt="Slide actuelle"
            className="w-full h-full object-cover"
            decoding="async"
          />
        </div>
      </div>
    </main>
  );
}
