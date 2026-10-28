import React from 'react';

export const FloatingLeaves: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Top Right Leaf */}
      <svg
        className="absolute top-12 right-6 md:right-24 w-12 h-12 md:w-16 md:h-16 text-olive-500/30 animate-float-slow transform rotate-45 motion-reduce:animate-none"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,5.25,9,6.25S2,11.5,2,13.5A6.22,6.22,0,0,0,3,17C3,17,4,13,8,10,12,7,17,8,17,8Z" />
      </svg>

      {/* Bottom Left Leaf */}
      <svg
        className="absolute bottom-20 left-4 md:left-16 w-10 h-10 md:w-14 md:h-14 text-forest-800/20 animate-float-delayed transform -rotate-12 motion-reduce:animate-none"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,5.25,9,6.25S2,11.5,2,13.5A6.22,6.22,0,0,0,3,17C3,17,4,13,8,10,12,7,17,8,17,8Z" />
      </svg>
    </div>
  );
};
