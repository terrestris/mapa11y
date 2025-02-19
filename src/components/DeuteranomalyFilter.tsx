import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Slider from './Slider';

interface DeuteranomalyFilterProps {
  isActive: boolean;
  onActivate: () => void;
}

const DeuteranomalyFilter: React.FC<DeuteranomalyFilterProps> = ({
  isActive,
  onActivate,
}) => {
  const { t } = useTranslation();
  const [intensity, setIntensity] = useState(100);

  useEffect(() => {
    const body = document.body;
    const colorMatrix = document.getElementById('colorMatrixDeuteranomaly');

    if (isActive) {
      body.style.filter = 'url(#deuteranomaly)';
      updateMatrix(intensity, colorMatrix);
    } else {
      body.style.filter = 'none';
    }
  }, [isActive, intensity]);

  const handleSliderChange = (value: number) => {
    setIntensity(value);
    const colorMatrix = document.getElementById('colorMatrixDeuteranomaly');
    updateMatrix(value, colorMatrix);
  };

  const updateMatrix = (percent: number, matrixElement: HTMLElement | null) => {
    const matrix0 = [
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    ];

    /*
     * Green colors are attenuated, red colors are slightly enhanced, part of
     * the blue component contains more red and additional green components in
     * blue change the color perception so that blue tends more towards
     * purple/violet. Transparency and brightness remain unaffected.
     */
    const matrix100 = [
      1.4, -0.6, 0.2, 0, 0, 0, 1, 0, 0, 0, -0.2, 0.2, 1, 0, 0, 0, 0, 0, 1, 0,
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
        <filter id="deuteranomaly">
          <feColorMatrix
            id="colorMatrixDeuteranomaly"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
        </filter>
      </svg>
      <button
        onClick={onActivate}
        title={t('deuteranomaly.title')}
        aria-label={t('deuteranomaly.title')}
        aria-description={t('deuteranomaly.description')}
      >
        {isActive
          ? t('deuteranomaly.deuteranomalyOff')
          : t('deuteranomaly.deuteranomalyOn')}
      </button>
      {isActive && (
        <Slider
          intensity={intensity}
          onChange={handleSliderChange}
          aria-label={`${t('deuteranomaly.title')}`}
          aria-description={`${t('slider.currentValue')} ${intensity}%`}
        />
      )}
    </>
  );
};

export default DeuteranomalyFilter;
