import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Slider from './Slider';

interface TritanomalyFilterProps {
  isActive: boolean;
  onActivate: () => void;
}

const TritanomalyFilter: React.FC<TritanomalyFilterProps> = ({
  isActive,
  onActivate,
}) => {
  const { t } = useTranslation();
  const [intensity, setIntensity] = useState(100);

  useEffect(() => {
    const body = document.body;
    const colorMatrix = document.getElementById('tritanomalyMatrix');

    if (isActive) {
      body.style.filter = 'url(#tritanomaly)';
      updateMatrix(intensity, colorMatrix);
    } else {
      body.style.filter = 'none';
    }
  }, [isActive, intensity]);

  const handleSliderChange = (value: number) => {
    setIntensity(value);
    const colorMatrix = document.getElementById('tritanomalyMatrix');
    updateMatrix(value, colorMatrix);
  };

  const updateMatrix = (percent: number, matrixElement: HTMLElement | null) => {
    const matrix0 = [
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    ];

    /*
     * Red becomes increasingly yellowish when mixed with blue and green, green
     * is shifted slightly to blue, blue becomes lighter and shifts towards
     * yellow or cyan
     */
    const matrix100 = [
      1, 0, 0, 0, 0, 0.9, 0.05, 0, 0, 0, 0, 0.4, 0.6, 0, 0, 0, 0, 0, 1, 0,
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
      <svg className="hiddenSvg">
        <filter id="tritanomaly">
          <feColorMatrix
            id="tritanomalyMatrix"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
        </filter>
      </svg>
      <button
        onClick={onActivate}
        title={t('tritanomaly.title')}
        aria-label={t('tritanomaly.title')}
        aria-description={t('tritanomaly.description')}
      >
        {isActive
          ? t('tritanomaly.tritanomalyOff')
          : t('tritanomaly.tritanomalyOn')}
      </button>
      {isActive && (
        <Slider
          intensity={intensity}
          onChange={handleSliderChange}
          aria-label={`${t('tritanomaly.title')}`}
          aria-description={`${t('slider.currentValue')} ${intensity}%`}
        />
      )}
    </>
  );
};

export default TritanomalyFilter;
