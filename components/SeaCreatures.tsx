"use client";

import { motion } from "framer-motion";

const creatures = [
  // 1. Anglerfish (Original: RIGHT). Swims RIGHT -> NO flip (1)
  { id: "angler-1", image: "/creatures/anglerfish.png", alt: "Anglerfish", top: "15%", delay: -5, duration: 120, direction: 1, x: ["-10vw", "25vw", "65vw", "110vw"], y: ["0vh", "35vh", "-15vh", "20vh"], rotate: [18, -22, 20, 5], scale: [0.65, 0.7, 0.65, 0.75], type: "angler" },
  
  // 2. Jellyfish (Original: RIGHT). Swims LEFT -> Needs flip (-1)
  { id: "jelly-1", image: "/creatures/jellyfish.png", alt: "Jellyfish", top: "25%", delay: -22, duration: 95, direction: -1, x: ["110vw", "75vw", "40vw", "-15vw"], y: ["-10vh", "35vh", "-25vh", "15vh"], rotate: [-12, 18, -15, 10], scale: [0.6, 0.65, 0.6, 0.68], type: "jelly" },
  
  // 3. Manta Ray (Original: RIGHT). Swims LEFT -> Needs flip (-1)
  { id: "manta-1", image: "/creatures/manta.png", alt: "Manta ray", top: "45%", delay: -40, duration: 140, direction: -1, x: ["110vw", "70vw", "30vw", "-20vw"], y: ["15vh", "-35vh", "45vh", "0vh"], rotate: [20, -25, 15, 0], scale: [0.75, 0.8, 0.75, 0.85], type: "ray" },
  
  // 4. Viperfish (Original: RIGHT). Swims RIGHT -> NO flip (1)
  { id: "viper-1", image: "/creatures/viperfish.png", alt: "Viperfish", top: "35%", delay: -12, duration: 85, direction: 1, x: ["-20vw", "30vw", "80vw", "120vw"], y: ["-20vh", "25vh", "-30vh", "35vh"], rotate: [25, -28, 30, -5], scale: [0.6, 0.65, 0.6, 0.68], type: "viper" },
  
  // 5. Giant Squid (Original: LEFT, mantle on left). Swims LEFT -> NO flip (1)
  { id: "squid-1", image: "/creatures/squid.png", alt: "Giant Squid", top: "75%", delay: -50, duration: 160, direction: 1, x: ["120vw", "80vw", "40vw", "-20vw"], y: ["55vh", "15vh", "-15vh", "-45vh"], rotate: [15, 18, 12, 10], scale: [0.85, 0.9, 0.85, 0.95], type: "squid" },
  
  // 6. Oarfish (Original: RIGHT). Swims RIGHT -> NO flip (1)
  { id: "oarfish-1", image: "/creatures/oarfish.png", alt: "Oarfish", top: "60%", delay: -28, duration: 155, direction: 1, x: ["-30vw", "20vw", "80vw", "130vw"], y: ["-35vh", "-5vh", "45vh", "10vh"], rotate: [12, 22, -18, -5], scale: [1, 1.05, 1, 1.1], type: "oarfish" },
  
  // 7. Dumbo Octopus (Original: RIGHT). Swims LEFT -> Needs flip (-1)
  { id: "dumbo-1", image: "/creatures/dumbo.png", alt: "Dumbo Octopus", top: "85%", delay: -70, duration: 110, direction: -1, x: ["120vw", "60vw", "20vw", "-30vw"], y: ["-25vh", "15vh", "-35vh", "5vh"], rotate: [-18, 22, -15, 0], scale: [0.55, 0.6, 0.55, 0.65], type: "dumbo" },
  
  // 8. Gulper Eel (Original: LEFT). Swims RIGHT -> Needs flip (-1)
  { id: "eel-1", image: "/creatures/eel.png", alt: "Gulper Eel", top: "70%", delay: -18, duration: 130, direction: -1, x: ["-20vw", "35vw", "95vw", "120vw"], y: ["45vh", "-5vh", "25vh", "-25vh"], rotate: [-24, 18, -28, 5], scale: [0.7, 0.75, 0.7, 0.8], type: "eel" },
  
  // 9. Hatchetfish (Original: RIGHT). Swims LEFT -> Needs flip (-1)
  { id: "hatchet-1", image: "/creatures/hatchetfish.png", alt: "Hatchetfish", top: "20%", delay: -5, duration: 75, direction: -1, x: ["120vw", "75vw", "25vw", "-20vw"], y: ["15vh", "45vh", "15vh", "55vh"], rotate: [-28, 28, -32, 0], scale: [0.5, 0.55, 0.5, 0.6], type: "hatchet" },
  
  // 10. Jellyfish 2 (Original: RIGHT). Swims RIGHT -> NO flip (1)
  { id: "jelly-2", image: "/creatures/jellyfish.png", alt: "Jellyfish", top: "50%", delay: -85, duration: 105, direction: 1, x: ["-15vw", "35vw", "75vw", "120vw"], y: ["35vh", "-25vh", "40vh", "-10vh"], rotate: [-20, 25, -15, -5], scale: [0.65, 0.7, 0.65, 0.72], type: "jelly" },
  
  // 11. Anglerfish 2 (Original: RIGHT). Swims LEFT -> Needs flip (-1)
  { id: "angler-2", image: "/creatures/anglerfish.png", alt: "Anglerfish", top: "90%", delay: -60, duration: 125, direction: -1, x: ["115vw", "65vw", "25vw", "-25vw"], y: ["20vh", "-45vh", "15vh", "-25vh"], rotate: [28, -24, 18, 0], scale: [0.55, 0.6, 0.55, 0.65], type: "angler" },
  
  // 12. Manta Ray 2 (Original: RIGHT). Swims RIGHT -> NO flip (1)
  { id: "manta-2", image: "/creatures/manta.png", alt: "Manta ray", top: "80%", delay: -110, duration: 145, direction: 1, x: ["-25vw", "25vw", "85vw", "115vw"], y: ["-40vh", "30vh", "-30vh", "20vh"], rotate: [25, -28, 20, 0], scale: [0.8, 0.85, 0.8, 0.9], type: "ray" },
];

export default function SeaCreatures() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[12] overflow-hidden opacity-90">
      {creatures.map((c) => (
        <motion.div
          key={c.id}
          className="deep-creature"
          style={{ left: "0%", top: c.top, x: c.x[0], y: c.y[0] }}
          animate={{ x: c.x, y: c.y, rotate: c.rotate, scale: c.scale }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div style={{ transform: `scaleX(${c.direction})`, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src={c.image}
              alt={c.alt}
              className="creature-img"
              draggable="false"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
