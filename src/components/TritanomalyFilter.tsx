import React, { useEffect } from 'react';

interface TritanomalyFilterProps {
  isActive: boolean;
  onActivate: () => void;
}

const TritanomalyFilter: React.FC<TritanomalyFilterProps> = ({
  isActive,
  onActivate
}) => {
  useEffect(() => {
    const body = document.body;
    const colorMatrix = document.getElementById('tritanomalyMatrix');

    if (isActive) {
      body.style.filter = 'url(#tritanomaly)';
      updateMatrix(100, colorMatrix);
    } else {
      body.style.filter = 'none';
    }
  }, [isActive]);

  const handleSliderChange = (value: number) => {
    const colorMatrix = document.getElementById('tritanomalyMatrix');
    updateMatrix(value, colorMatrix);
  };

  const updateMatrix = (percent: number, matrixElement: HTMLElement | null) => {
    const matrix0 = [
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0
    ];

    const matrix100 = [
      1, 0, 0, 0, 0, 0.95, 0.05, 0, 0, 0, 0, 0.4335, 0.5665, 0, 0, 0, 0, 0, 1, 0
    ];

    const interpolatedMatrix = matrix0.map(
      (startValue, index) =>
        startValue + (matrix100[index] - startValue) * (percent / 100)
    );

    if (matrixElement) {
      matrixElement.setAttribute('values', interpolatedMatrix.join(' '));
    }
  };

  return (
    <>
      <svg style={{ display: 'none' }}>
        <filter id="tritanomaly">
          <feColorMatrix
            id="tritanomalyMatrix"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
        </filter>
      </svg>
      <button onClick={onActivate} title='Blausehschwäche'>
        {isActive ? 'Tritanomalie aus' : 'Tritanomalie an'}
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

export default TritanomalyFilter;
