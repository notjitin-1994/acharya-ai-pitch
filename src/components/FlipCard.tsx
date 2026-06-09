import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  id?: string;
  front: React.ReactNode;
  back: React.ReactNode;
}

export const FlipCard: React.FC<FlipCardProps> = ({ id, front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!id) return;
    const channel = new BroadcastChannel('flip-sync');
    channel.onmessage = (event) => {
      if (event.data.id === id) {
        setIsFlipped(event.data.isFlipped);
      }
    };
    return () => channel.close();
  }, [id]);

  const handleFlip = () => {
    const newState = !isFlipped;
    setIsFlipped(newState);
    if (id) {
      const channel = new BroadcastChannel('flip-sync');
      channel.postMessage({ id, isFlipped: newState });
      channel.close();
    }
  };

  return (
    <div 
      className="relative h-[650px] w-full cursor-pointer perspective-1000"
      onClick={handleFlip}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden">
          {front}
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};
