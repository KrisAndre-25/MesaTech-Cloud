import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export const CardStack = ({ items, offset, scaleFactor }) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop());
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative h-56 w-72">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-neutral-900 border border-white/10 h-56 w-72 rounded-3xl p-4 shadow-xl shadow-black/40 flex flex-col justify-between"
            style={{ transformOrigin: 'top center' }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div className="font-normal text-neutral-300">{card.content}</div>
            <div>
              <p className="text-white font-medium">{card.name}</p>
              <p className="text-neutral-500 font-mono text-sm font-normal">{card.designation}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export const Highlight = ({ children, className }) => {
  return (
    <span className={cn('font-bold bg-purple-700/25 text-purple-300 px-1 py-0.5 rounded', className)}>
      {children}
    </span>
  );
};

export default CardStack;
