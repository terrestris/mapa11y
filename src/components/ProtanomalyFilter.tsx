import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

interface ProtanomalyFilterProps {
  isActive: boolean;
  onActivate: () => void;
}

const ProtanomalyFilter: React.FC<ProtanomalyFilterProps> = ({
  isActive,
  onActivate,
}) => {
  const { t } = useTranslation();
  const [intensity, setIntensity] = useState(100);

  useEffect(() => {
    const body = document.body;
    const colorMatrix = document.getElementById('colorMatrix');

    if (isActive) {
      body.style.filter = 'url(#protanomaly)';
      updateMatrix(intensity, colorMatrix);
    } else {
      body.style.filter = 'none';
    }
  }, [isActive, intensity]);

  const handleSliderChange = (value: number) => {
    setIntensity(value);
    const colorMatrix = document.getElementById('colorMatrix');
    updateMatrix(value, colorMatrix);
  };

  const updateMatrix = (percent: number, matrixElement: HTMLElement | null) => {
    const matrix0 = [
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    ];

    const matrix100 = [
      1, 0, 0, 0, 0, 0.4788968, 0.4769109, 0.0441916, 0, 0, 0.5972818,
      -0.6886921, 1.0914096, 0, 0, 0, 0, 0, 1, 0,
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
        <filter id="protanomaly">
          <feColorMatrix
            id="colorMatrix"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
        </filter>
      </svg>
      <button
        onClick={onActivate}
        title={t('protanomaly.title')}
        aria-label={'protanomaly.title'}
        aria-description={'protanomaly.description'}
      >
        {isActive
          ? t('protanomaly.protanomalyOff')
          : t('protanomaly.protanomalyOn')}
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

export default ProtanomalyFilter;
