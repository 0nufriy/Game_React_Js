import React, { useEffect, useState } from 'react';

const LoadingItem = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-bar">
        <div
          className="loading-bar-progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="loading-text">Loading... {progress}%</p>
    </div>
  );
};

export default LoadingItem;
