import React, { useEffect } from 'react';

interface GrayscaleFilterProps {
  isActive: boolean;
  onActivate: () => void;
}

const GrayscaleFilter: React.FC<GrayscaleFilterProps> = ({
  isActive,
  onActivate,
}) => {
  useEffect(() => {
    const body = document.body;
    const colorMatrix = document.getElementById('grayscaleMatrix');

    if (isActive) {
      body.style.filter = 'url(#grayscale)';
      updateMatrix(100, colorMatrix);
    } else {
      body.style.filter = 'none';
    }
  }, [isActive]);

  const handleSliderChange = (value: number) => {
    const colorMatrix = document.getElementById('grayscaleMatrix');
    updateMatrix(value, colorMatrix);
  };

  const updateMatrix = (percent: number, matrixElement: HTMLElement | null) => {
    const baseMatrix = [
      0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0, 0, 0, 1,
      0,
    ];

    const identityMatrix = [
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    ];

    const interpolatedMatrix = identityMatrix.map(
      (startValue, index) =>
        startValue + (baseMatrix[index] - startValue) * (percent / 100)
    );

    if (matrixElement) {
      matrixElement.setAttribute('values', interpolatedMatrix.join(' '));
    }
  };

  return (
    <>
      <svg style={{ display: 'none' }}>
        <filter id="grayscale">
          <feColorMatrix
            id="grayscaleMatrix"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
        </filter>
      </svg>
      <button onClick={onActivate} title="Graustufen">
        {isActive ? 'Graustufen aus' : 'Graustufen an'}
      </button>
      {isActive && (
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={100}
            onChange={e => handleSliderChange(Number(e.target.value))}
          />
          <p>Intensität: 100%</p>
        </div>
      )}
    </>
  );
};

export default GrayscaleFilter;
