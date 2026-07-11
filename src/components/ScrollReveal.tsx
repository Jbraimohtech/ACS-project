import { useEffect, useRef, useState } from "react";
import "./ScrollReveal.css";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

const ScrollReveal = ({
  children,
  className = "",
  threshold = 0.3,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShow(entry.isIntersecting);
        });
      },
      {
        threshold,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`image ${show ? "show" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;