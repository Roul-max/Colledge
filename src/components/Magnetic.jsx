import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function Magnetic({ children, className = '' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Required: JS-driven mouse transform, cannot use Tailwind.
  const magneticStyle = { display: 'inline-flex' };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      style={magneticStyle}
      className={className}
    >
      {children}
    </motion.div>
  );
}

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
