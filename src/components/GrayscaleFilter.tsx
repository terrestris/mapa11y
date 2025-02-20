import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Slider from './Slider';

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
      <svg className="hiddenSvg">
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
        <Slider
          intensity={intensity}
          onChange={handleSliderChange}
          aria-label={`${t('grayscale.title')}`}
          aria-description={`${t('slider.currentValue')} ${intensity}%`}
        />
      )}
    </>
  );
};

export default GrayscaleFilter;
