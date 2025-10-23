// src/components/MotivationalPanel.jsx
import { useEffect, useState } from "react";

const phrases = [
  "Todo lo puedo en Cristo que me fortalece. - Filipenses 4:13",
  "Confía en el proceso, la salud también es esperanza.",
  "Dios tiene un propósito incluso en los momentos difíciles.",
  "El cuerpo se cura con descanso, la mente con alegría y el alma con paz.",
  "Nunca te rindas, cada día es una nueva oportunidad para sanar.",
  "El Señor es mi pastor, nada me faltará. - Salmos 23:1",
  "Donde termina tu fuerza, comienza la de Dios.",
  "La fe mueve montañas, incluso las que parecen imposibles."
];

export default function MotivationalPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-900 to-black text-white text-center p-8 transition-all duration-500">
      <p className="text-2xl italic max-w-lg leading-relaxed animate-fadeIn">
        {phrases[index]}
      </p>
    </div>
  );
}