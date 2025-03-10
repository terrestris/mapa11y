import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Slider from './Slider';
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

    /*
     * Red colors are attenuated, green colors are slightly enhanced, part of
     * the blue component is reduced to appear less violet and to be more
     * distinct from red/green. Transparency and brightness remain unaffected.
     */
    const matrix100 = [
      1, 0, 0, 0, 0, 0.5, 0.5, 0, 0, 0, 0.6, -0.7, 1, 0, 0, 0, 0, 0, 1, 0,
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
        aria-label={t('protanomaly.title')}
        aria-description={t('protanomaly.description')}
      >
        {isActive
          ? t('protanomaly.protanomalyOff')
          : t('protanomaly.protanomalyOn')}
      </button>
      {isActive && (
        <Slider
          intensity={intensity}
          onChange={handleSliderChange}
          aria-label={`${t('protanomaly.title')}`}
          aria-description={`${t('slider.currentValue')} ${intensity}%`}
        />
      )}
    </>
  );
};

export default ProtanomalyFilter;
