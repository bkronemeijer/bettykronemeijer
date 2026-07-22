import { useEffect, useRef, useState } from "react";
import { Highlight } from "./Highlight";

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
    <section>
      <p
        ref={textRef}
        className={`max-w-[85%] lg:max-w-[75%] text-sm md:text-xl lg:text-2xl leading-relaxed text-white transition-all duration-700 2xl:text-4xl p-5 md:p-8 ${
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
        <br />
        When I'm not working, I play{" "}
        <Highlight index={7} isVisible={isVisible}>
          beachvolleyball
        </Highlight>{" "}
        and love to explore the outdoors in the form of{" "}
        <Highlight index={8} isVisible={isVisible}>
          hiking
        </Highlight>
        ,{" "}
        <Highlight index={9} isVisible={isVisible}>
          surfing
        </Highlight>{" "}
        and{" "}
        <Highlight index={10} isVisible={isVisible}>
          sailing
        </Highlight>
        . I also do a lot of{" "}
        <Highlight index={11} isVisible={isVisible}>
          photography
        </Highlight>
        , and enjoy playing the{" "}
        <Highlight index={12} isVisible={isVisible}>
          piano and guitar
        </Highlight>
        .
      </p>
    </section>
  );
}
