import { useEffect, useRef, useState } from "react";

export default function Mission() {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="mission" title="Our Mission">
      <p
        ref={textRef}
        className={`max-w-[75%] text-lg lg:text-2xl leading-relaxed text-white transition-all duration-700 2xl:text-4xl p-8 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
      >
        Enthusiastic, creative and pragmatic{" "}
        <Highlight index={0} isVisible={isVisible}>
          Software Developer
        </Highlight>{" "}
        with over 6 years of experience building and shipping custom interfaces
        and data visualisations. I enjoy working on both building and designing
        frontend systems with{" "}
        <Highlight index={1} isVisible={isVisible}>
          React
        </Highlight>{" "}
        and{" "}
        <Highlight index={2} isVisible={isVisible}>
          Typescript
        </Highlight>
        . I am currently serving as a{" "}
        <Highlight index={3} isVisible={isVisible}>
          Technical Lead
        </Highlight>
        , where I take ownership of frontend architecture decisions and{" "}
        <Highlight index={4} isVisible={isVisible}>
          collaborate closely
        </Highlight>{" "}
        with{" "}
        <Highlight index={5} isVisible={isVisible}>
          design and data teams
        </Highlight>{" "}
        to create exciting and performant data visualisations.
      </p>
    </section>
  );
}

const randomDelay = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const Highlight = ({
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
      className="inline-block rounded px-1 font-semibold text-white transition-all duration-500 ease-out"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255, 179, 71, 1.0), rgba(255, 179, 71, 1.0))",
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
