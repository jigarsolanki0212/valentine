import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    const x = Math.random() * 200 - 100; // Random x between -100 and 100
    const y = Math.random() * 200 - 100; // Random y between -100 and 100
    setNoPosition({ x, y });
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    const colors = ["#e11d48", "#fb7185", "#fff0f5", "#ffd700"];
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
    });
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Mayuriiiiiiiiii please?",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-[#fef2f2] text-[#881337]">
      <FloatingHearts />
      <div className="z-10 w-full max-w-2xl px-4 py-8 text-center">
        <AnimatePresence mode="wait">
          {yesPressed ? (
            <CelebrationView key="celebration" />
          ) : (
            <QuestionView
              key="question"
              onYes={handleYesClick}
              onNoHover={handleNoHover}
              noPosition={noPosition}
              noButtonText={getNoButtonText()}
              yesButtonSize={noCount * 20 + 16}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const FloatingHearts = () => {
  // Simplified for efficiency
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-rose-200"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-50px",
            fontSize: `${Math.random() * 30 + 10}px`,
            animation: `floatUp ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <Heart fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

const QuestionView = ({
  onYes,
  onNoHover,
  noPosition,
  noButtonText,
  yesButtonSize,
}: {
  onYes: () => void;
  onNoHover: () => void;
  noPosition: { x: number; y: number };
  noButtonText: string;
  yesButtonSize: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center"
    >
      <img
        className="h-[230px] rounded-lg mb-8 object-cover"
        src="https://media.tenor.com/hJ3sX5yA_20AAAAi/mocha-bear-bears.gif"
        alt="Cute Bear"
      />

      <h1 className="text-4xl md:text-6xl font-bold mb-8 font-[Indie Flower] text-[#e11d48]">
        Will you be my Valentine?
      </h1>

      <div className="flex flex-wrap flex-col md:flex-row gap-4 items-center justify-center w-full relative h-[150px] md:h-auto">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          style={{ fontSize: yesButtonSize }}
          onClick={onYes}
        >
          Yes
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md absolute md:static transition-all duration-100 ease-in-out"
          style={{
            top: noPosition.y !== 0 ? `${noPosition.y}px` : "auto",
            left: noPosition.x !== 0 ? `${noPosition.x}px` : "auto",
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
          }}
          onMouseEnter={onNoHover}
          onTouchStart={onNoHover} // For mobile escapability
        >
          {noButtonText}
        </button>
      </div>
    </motion.div>
  );
};

const CelebrationView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <img
        className="h-[250px] rounded-lg mb-6"
        src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
        alt="Celebration Kiss"
      />

      <h1 className="text-4xl md:text-6xl font-bold text-[#e11d48] mb-4 font-[Indie Flower]">
        Happy Valentine Day <br /> Mayuriiiiiiiiii! ❤️
      </h1>

      <p className="text-xl text-[#9f1239] font-medium italic">
        "You are the most beautiful person in my life!"
      </p>
    </motion.div>
  );
};
