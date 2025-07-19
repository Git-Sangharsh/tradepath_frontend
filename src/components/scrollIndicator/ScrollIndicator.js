import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ScrollIndicator = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;

    // Use pixel-based animation for better accuracy and visibility
    const quickSetHeight = gsap.quickSetter(lineRef.current, "height", "px");

    const updateHeight = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const totalHeight = window.innerHeight * scrollPercent;
      quickSetHeight(totalHeight);
    };

    window.addEventListener("scroll", updateHeight);
    updateHeight(); // Initial run

    return () => window.removeEventListener("scroll", updateHeight);
  }, []);

  return (
    <div style={styles.container}>
      <div ref={lineRef} style={styles.line} />
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "4px",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    zIndex: 9999,
  },
  line: {
    width: "100%",
    height: "0px",
    backgroundColor: "#3DFF90",
  },
};

export default ScrollIndicator;
