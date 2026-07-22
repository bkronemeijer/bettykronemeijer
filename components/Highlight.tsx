import { useState, useRef, useEffect } from "react";

const randomDelay = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const Highlight = ({
  children,
  index,
  isVisible,
}: {
  children: React.ReactNode;
  index: number;
  isVisible: boolean;
}) => {
  const [pulseOff, setPulseOff] = useState(false);
  const [hasRevealedOnce, setHasRevealedOnce] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    // Only kick off once, and only after the section has scrolled into view
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const loop = () => {
      timeoutId = setTimeout(
        () => {
          if (cancelled) return;
          setPulseOff(true);

          timeoutId = setTimeout(() => {
            if (cancelled) return;
            setPulseOff(false);
            loop();
          }, 1000); // brief "off" beat before it sweeps back in
        },
        randomDelay(12000, 30000),
      );
    };

    // Wait for the initial staggered reveal (delay + transition) to finish
    // before starting the randomized pulse loop
    timeoutId = setTimeout(
      () => {
        if (cancelled) return;
        setHasRevealedOnce(true);
        loop();
      },
      400 + index * 1200 + 5000,
    );

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isVisible, index]);

  const revealed = isVisible && !pulseOff;

  return (
    <span
      className="inline-block rounded-sm px-1 font-semibold text-white transition-all duration-500 ease-out"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--color-orange), var(--color-orange))",
        backgroundPosition: "0% center",
        backgroundSize: revealed ? "100% 100%" : "0% 100%",
        backgroundRepeat: "no-repeat",
        // Only apply the staggered entrance delay for the very first reveal;
        // subsequent pulses should react immediately
        transitionDelay: hasRevealedOnce ? "0ms" : `${400 + index * 120}ms`,
        transitionDuration: "1000ms",
      }}
    >
      {children}
    </span>
  );
};
