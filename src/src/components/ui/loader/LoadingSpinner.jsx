import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="creative-spinner">
        <div className="circle-group">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="loading-text">Loading</div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 