import React from 'react';

const AgrilinkSpinner = ({ size = 200, color = '#ffffff' }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative animate-spin">
        <svg
          viewBox="0 0 800 800"
          width={size}
          height={size}
          className="fill-current"
          style={{ color }}
        >
          {/* Share Icon */}
          <circle cx="400" cy="400" r="80" />
          <rect x="380" y="200" width="40" height="200" />
          <circle cx="400" cy="200" r="40" />
          <rect
            x="380"
            y="200"
            width="40"
            height="200"
            transform="rotate(120 400 400)"
          />
          <circle
            cx="400"
            cy="200"
            r="40"
            transform="rotate(120 400 400)"
          />
          <rect
            x="380"
            y="200"
            width="40"
            height="200"
            transform="rotate(240 400 400)"
          />
          <circle
            cx="400"
            cy="200"
            r="40"
            transform="rotate(240 400 400)"
          />
        </svg>
      </div>
      <div className="mt-4 text-2xl font-light tracking-wide text-center" style={{ color }}>
        AGRILINK
      </div>
      <div className="mt-2 text-sm tracking-wider text-center" style={{ color }}>
        Connecting Farmers and Buyers
      </div>
    </div>
  );
};

export default AgrilinkSpinner;