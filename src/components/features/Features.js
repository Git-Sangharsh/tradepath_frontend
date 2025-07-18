import React from "react";
import "./Features.css";
import DashboardAsset from "../../assets/dashboard.mp4";
import AnalysisAsset from "../../assets/statistics.mp4"; // Example second video

const featuresData = [
  {
    subtitle: "Key Features",
    title: "Personal Dashboard",
    description:
      "Visualize your trading journey with a comprehensive dashboard that highlights your unique statistics. Log your daily trades, set long-term goals, and establish a clear trading plan to help you succeed.",
    video: DashboardAsset,
    reverse: false,
  },
  {
    subtitle: "Analytics",
    title: "Smart Trade Analysis",
    description:
      "Dive deeper into your trading behavior with advanced analysis tools. Identify patterns, review performance, and fine-tune your strategies with visual feedback.",
    video: AnalysisAsset,
    reverse: true,
  },
];

const Features = () => {
  return (
    <section className="features">
      {featuresData.map((feature, index) => (
        <div
          key={index}
          className={`features-wrapper ${feature.reverse ? "reverse" : ""}`}
        >
          <div className="features-left">
            <h4 className="features-subtitle font-var">{feature.subtitle}</h4>
            <h2 className="features-title font-var-2">
              {feature.title.split(" ").map((word, i) =>
                i === 1 ? <br key={i} /> : " "
              )}
              {feature.title}
            </h2>
            <p className="features-description font-var-2">
              {feature.description}
            </p>
            <button className="features-btn">Get Started Now</button>
          </div>

          <div className="features-right">
            <video
              className="features-video"
              autoPlay
              muted
              loop
              playsInline
            >
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
