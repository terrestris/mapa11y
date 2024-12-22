import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

interface GrayscaleFilterProps {
  isActive: boolean;
  onActivate: () => void;
}

const GrayscaleFilter: React.FC<GrayscaleFilterProps> = ({
  isActive,
  onActivate,
}) => {
  const { t } = useTranslation();
  const [intensity, setIntensity] = useState(100);

  useEffect(() => {
    const body = document.body;
    const colorMatrix = document.getElementById('grayscaleMatrix');

    if (isActive) {
      body.style.filter = 'url(#grayscale)';
      updateMatrix(intensity, colorMatrix);
    } else {
      body.style.filter = 'none';
    }
  }, [isActive, intensity]);

  const handleSliderChange = (value: number) => {
    setIntensity(value);
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
      <button
        onClick={onActivate}
        title={t('grayscale.title')}
        aria-label={t('grayscale.title')}
        aria-description={t('grayscale.description')}
      >
        {isActive ? t('grayscale.grayscaleOff') : t('grayscale.grayscaleOn')}
      </button>
      {isActive && (
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={e => handleSliderChange(Number(e.target.value))}
          />
          <p>
            {t('filterMenu.intensity')}: {intensity}%
          </p>
        </div>
      )}
    </>
  );
};

export default GrayscaleFilter;
