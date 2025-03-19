"use client";

import ParticlesLibrary, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: { value: "transparent" }, // Keep the background transparent
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          push: { distance: 200, duration: 15 },
          grab: { distance: 150 },
        },
      },
      particles: {
        color: { value: "#FFFFFF" },
        links: {
          color: "#FFFFFF",
          distance: 150,
          enable: true,
          opacity: 0.1, // Make links more transparent
          width: 0.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: true,
          speed: 0.3,
          straight: false,
        },
        number: { density: { enable: true }, value: 100 },
        opacity: { value: 0 }, // Reduce opacity for transparency
        shape: { type: "star" },
        size: { value: { min: 1, max: 4 } }, // Increase size for blur effect
        shadow: {
          enable: true,
          color: "#ffffff",
          blur: 10, // Increase blur effect
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <ParticlesLibrary
      id={props.id}
      className="particles"
      init={particlesLoaded}
      options={options}
    />
  );
};

export default ParticlesComponent;
