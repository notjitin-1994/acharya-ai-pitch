import React from 'react';
import { Mic, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotesProps {
  notes: string;
  onClose: () => void;
  isVisible: boolean;
}

export const Notes: React.FC<NotesProps> = ({ notes, onClose, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl bg-[#020C1B]/95 backdrop-blur-md border border-[#A7DADB]/30 p-6 rounded-2xl shadow-2xl z-50"
        >
          <div className="flex justify-between items-center mb-4 border-b border-[#142433] pb-2">
            <h4 className="font-display font-bold text-[#A7DADB] flex items-center gap-2">
              <Mic size={16}/> Teleprompter
            </h4>
            <button onClick={onClose} className="text-[#b0c5c6] hover:text-white">
              <X size={20} />
            </button>
          </div>
          <p className="text-xl leading-relaxed text-white font-body italic">
            {notes}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
