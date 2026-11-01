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

  const options = useMemo(
    () => ({
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          push: { distance: 160, duration: 8 },
          grab: { distance: 120 },
        },
      },
      particles: {
        color: { value: "#FFFFFF" },
        links: {
          color: "#FFFFFF",
          distance: 140,
          enable: true,
          opacity: 0.08,
          width: 0.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: true,
          speed: 0.25,
          straight: false,
        },
        number: { density: { enable: true }, value: 35 },
        opacity: { value: 0.12 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.5 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <ParticlesLibrary
      id={props.id}
      className="particles"
      options={options}
    />
  );
};

export default ParticlesComponent;
