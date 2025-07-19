import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Levelup.css";
import LevelupAsset from "../../assets/levelup.mp4";

gsap.registerPlugin(ScrollTrigger);

const Levelup = () => {
  const sectionRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      ".levelup-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.1, // slight delay
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".levelup-title",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".levelup-p",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".levelup-p",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".levelup-btn",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".levelup-btn",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".levelup-video",
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".levelup-video",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, sectionRef);

  return () => ctx.revert(); // clean up
}, []);


  return (
    <div ref={sectionRef} className="levelup flex-center">
      <div className="levelup-wrapper flex-center">
        <h1 className="levelup-title font-var">
          Thousands Of Traders Are Leveling Up With <span className="hero-header-span">TradePath</span>
        </h1>

        <p className="levelup-p font-var-2">
          Our platform empowers traders of all experience levels to connect, collaborate, and enhance their skills.
        </p>

        <div className=" font-var-2 levelup-btn">
          Get Started Now
        </div>

        <video className="levelup-video" autoPlay loop muted playsInline>
          <source src={LevelupAsset} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Levelup;
