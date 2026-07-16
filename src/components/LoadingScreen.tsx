import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Stage 0: Black screen, small white dot appears (0ms)
    // Stage 1: Dot expands to Google Cloud center node (300ms)
    // Stage 2: Surrounding nodes appear (700ms)
    // Stage 3: Connection lines draw & packets start (1200ms)
    // Stage 4: Text/Logo fades in (1700ms)
    // Stage 5: Progress line fills (2200ms)
    // Stage 6: Fade out (2700ms)
    // Stage 7: Complete (3000ms)

    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1200),
      setTimeout(() => setStep(4), 1700),
      setTimeout(() => setStep(5), 2200),
      setTimeout(() => setFadeOut(true), 2700),
      setTimeout(() => onComplete(), 3000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0F1115] flex flex-col items-center justify-center transition-opacity duration-300 select-none ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* SVG Network representing the GCP/AI architecture loading */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
          {/* Connection Lines (animating in Stage 3+) */}
          {step >= 3 && (
            <>
              {/* Lines from Center (160, 160) to Surrounding Nodes */}
              <line
                x1="160"
                y1="160"
                x2="80"
                y2="100"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeDasharray="100"
                strokeDashoffset={step >= 5 ? "0" : "100"}
                className="transition-all duration-700 ease-out"
              />
              <line
                x1="160"
                y1="160"
                x2="240"
                y2="100"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeDasharray="100"
                strokeDashoffset={step >= 5 ? "0" : "100"}
                className="transition-all duration-700 ease-out delay-150"
              />
              <line
                x1="160"
                y1="160"
                x2="160"
                y2="240"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeDasharray="100"
                strokeDashoffset={step >= 5 ? "0" : "100"}
                className="transition-all duration-700 ease-out delay-300"
              />
              <line
                x1="80"
                y1="100"
                x2="240"
                y2="100"
                stroke="#10B981"
                strokeWidth="1"
                strokeDasharray="200"
                strokeDashoffset={step >= 5 ? "0" : "200"}
                className="transition-all duration-700 ease-out"
              />

              {/* Data Packets flowing */}
              {step >= 4 && (
                <>
                  <circle r="3" fill="#60A5FA" className="animate-packet-1" />
                  <circle r="3" fill="#34D399" className="animate-packet-2" />
                </>
              )}
            </>
          )}

          {/* Center Node (GCP AI Node) */}
          {step >= 1 && (
            <g className="transition-all duration-500">
              <circle
                cx="160"
                cy="160"
                r={step >= 2 ? "20" : "6"}
                fill="#2563EB"
                className={`opacity-90 transition-all duration-500 ${
                  step >= 2 ? "animate-pulse" : ""
                }`}
              />
              <circle cx="160" cy="160" r="8" fill="#FFFFFF" />
            </g>
          )}

          {/* Surrounding Nodes */}
          {step >= 2 && (
            <>
              {/* Node 1: User/Client */}
              <circle
                cx="80"
                cy="100"
                r="10"
                fill="#1F2937"
                stroke="#4B5563"
                strokeWidth="2"
                className="animate-float"
              />
              <circle cx="80" cy="100" r="4" fill="#0EA5E9" />

              {/* Node 2: Vector DB */}
              <circle
                cx="240"
                cy="100"
                r="10"
                fill="#1F2937"
                stroke="#4B5563"
                strokeWidth="2"
                className="animate-float"
                style={{ animationDelay: "1.5s" }}
              />
              <circle cx="240" cy="100" r="4" fill="#10B981" />

              {/* Node 3: Cloud Storage / Grounding */}
              <circle
                cx="160"
                cy="240"
                r="10"
                fill="#1F2937"
                stroke="#4B5563"
                strokeWidth="2"
                className="animate-float"
                style={{ animationDelay: "3s" }}
              />
              <circle cx="160" cy="240" r="4" fill="#F59E0B" />
            </>
          )}
        </svg>

        {/* Small center dot for very start */}
        {step === 0 && <div className="w-2 h-2 rounded-full bg-white animate-ping" />}
      </div>

      {/* Title & Progress indicator */}
      <div
        className={`mt-4 text-center transition-all duration-500 transform ${
          step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-xl font-bold font-manrope tracking-wider text-gray-100">
          AI-FIRST ACADEMY
        </h1>
        <p className="text-xs text-gray-400 font-mono mt-1 tracking-widest uppercase">
          Preparing Enterprise AI Experience
        </p>

        {/* Animated Connection Line Progress */}
        <div className="w-48 h-[2px] bg-gray-800 mx-auto mt-6 rounded-full overflow-hidden relative">
          <div
            className={`h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-[1000ms] ease-out ${
              step >= 5 ? "w-full" : "w-1/12"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
