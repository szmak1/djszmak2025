import React from 'react';

interface DividerWaveProps {
  className?: string;
  inverted?: boolean;
}

export default function DividerWave({ className = '', inverted = false }: DividerWaveProps) {
  return (
    <div className="w-screen relative left-[50%] right-[50%] mx-[-50vw]">
      <div
        className={`custom-shape-divider-bottom-1743343575 ${
          inverted ? 'rotate-0' : ''
        } ${className}`}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}
