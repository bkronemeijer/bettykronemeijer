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
        className={`max-w-4/5 text-lg lg:text-2xl leading-relaxed text-green-light transition-all duration-700 2xl:text-4xl p-8 ${
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
        <Highlight index={4} isVisible={isVisible}>
          design and data teams
        </Highlight>{" "}
        to create exciting and performant data visualisations.
      </p>
    </section>
  );
}

const Highlight = ({
  children,
  index,
  isVisible,
}: {
  children: React.ReactNode;
  index: number;
  isVisible: boolean;
}) => (
  <span
    className="inline-block rounded px-1 font-semibold text-green-light transition-all duration-500 ease-out"
    style={{
      backgroundImage:
        "linear-gradient(to right, rgb(15, 142, 56, 0.75), rgb(15, 142, 56, 0.75))",
      backgroundPosition: "0% center",
      backgroundSize: isVisible ? "100% 100%" : "0% 100%",
      backgroundRepeat: "no-repeat",
      transitionDelay: `${400 + index * 120}ms`,
    }}
  >
    {children}
  </span>
);
