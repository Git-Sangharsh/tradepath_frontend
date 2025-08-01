import React, { useEffect, useRef } from "react";
import "./Features.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DashboardAsset from "../../assets/dashboard.mp4";
import AnalysisAsset from "../../assets/statistics.mp4";
import BaisAsset from "../../assets/bais.mp4";
import ZenAsset from "../../assets/zen.mp4";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    subtitle: "Key Features",
    title: "Personal Dashboard",
    description:
      "Visualize your trading journey with a comprehensive dashboard that highlights your unique statistics. Log your daily trades, set long-term goals, and establish a clear trading plan to help you succeed.",
    video: DashboardAsset,
  },
  {
    subtitle: "Key Features",
    title: "Smart Trade Analysis",
    description:
      "Dive deeper into your trading behavior with advanced analysis tools. Identify patterns, review performance, and fine-tune your strategies with visual feedback.",
    video: AnalysisAsset,
  },
  {
    subtitle: "Key Features",
    title: "Bais Journaling",
    description:
      "Document every aspect of your trading and life. Organize your thoughts, track your progress, and cultivate the habit of reflection—an essential practice for both traders and personal growth.",
    video: BaisAsset,
  },
  {
    subtitle: "Key Features",
    title: "Zen Page",
    description:
      "Embrace mindfulness with our guided meditation resources. Prepare your mind before trading, find clarity during sessions, and reflect afterward to maintain focus and emotional balance.",
    video: ZenAsset,
  },
];

const Features = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const leftElements = sectionRef.current.querySelectorAll(".features-left");
    const rightElements = sectionRef.current.querySelectorAll(".features-right");

    leftElements.forEach((el, i) => {
      gsap.fromTo(
        el,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    rightElements.forEach((el, i) => {
      gsap.fromTo(
        el,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleAuthRoute = () => {
    navigate("/auth/login");
  };

  return (
    <section className="features" ref={sectionRef}>
      {featuresData.map((feature, index) => (
        <div
          key={index}
          className={`features-wrapper ${index % 2 !== 0 ? "reverse" : ""}`}
        >
          <div className="features-left">
            <span className="corner top-right"></span>
            <span className="corner bottom-left"></span>

            <h4 className="features-subtitle font-var">{feature.subtitle}</h4>
            <h2 className="features-title font-var-2">{feature.title}</h2>
            <p className="features-description font-var-2">
              {feature.description}
            </p>
            <button className="features-btn" onClick={handleAuthRoute}>Get Started Now</button>
          </div>

          <div className="features-right">
            <video className="features-video" autoPlay muted loop playsInline>
              <source src={feature.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
