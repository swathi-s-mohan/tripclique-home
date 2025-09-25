import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 40, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="url(#gradient)"
        stroke="url(#borderGradient)"
        strokeWidth="2"
      />
      
      {/* Map Pin Icon */}
      <path
        d="M50 20C40.5 20 33 27.5 33 37C33 50 50 70 50 70C50 70 67 50 67 37C67 27.5 59.5 20 50 20Z"
        fill="white"
        stroke="white"
        strokeWidth="1"
      />
      
      {/* Inner Circle for Pin */}
      <circle
        cx="50"
        cy="37"
        r="8"
        fill="url(#innerGradient)"
      />
      
      {/* Travel Path Lines */}
      <path
        d="M20 50 Q35 35 50 50 Q65 65 80 50"
        stroke="white"
        strokeWidth="2"
        fill="none"
        opacity="0.8"
      />
      
      <path
        d="M20 60 Q35 45 50 60 Q65 75 80 60"
        stroke="white"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        
        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
