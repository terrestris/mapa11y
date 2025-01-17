import React, { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import Slider from './Slider';

// TODO maybe do not use SVG and div/css insted?
interface BlueLightFilterProps {
  isActive: boolean;
  onActivate: () => void;
}

const BlueLightFilter: React.FC<BlueLightFilterProps> = ({
  isActive,
  onActivate,
}) => {
  const { t } = useTranslation();
  const [intensity, setIntensity] = useState(100);
  const [opacity, setOpacity] = useState(100);

  const updateMatrix = useCallback(
    (percent: number, matrixElement: HTMLElement | null) => {
      setOpacity(percent / 100);
      const matrix = [
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        percent / 100,
        0,
      ];

      if (matrixElement) {
        matrixElement.setAttribute('values', matrix.join(' '));
      }
    },
    []
  );

  useEffect(() => {
    const body = document.body;
    const colorMatrix = document.getElementById('blueLightMatrix');

    if (isActive) {
      body.style.filter = 'url(#blueLight)';
      updateMatrix(intensity, colorMatrix);
    } else {
      body.style.filter = 'none';
    }
  }, [isActive, intensity, updateMatrix]);

  const handleSliderChange = (value: number) => {
    setIntensity(value);
    const colorMatrix = document.getElementById('blueLightMatrix');
    updateMatrix(value, colorMatrix);
  };

  return (
    <>
      <svg className="hiddenSvg">
        <filter id="blueLight">
          <feColorMatrix
            id="blueLightMatrix"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1" intercept="0" />
            <feFuncG type="linear" slope="0.577" intercept="0.423" />
            <feFuncB type="linear" slope="0.161" intercept="0.839" />
            <feFuncA type="linear" slope={opacity} intercept="0" />
          </feComponentTransfer>
        </filter>
      </svg>
      <button
        onClick={onActivate}
        title={t('blueLight.title')}
        aria-label={t('blueLight.title')}
        aria-description={t('blueLight.description')}
      >
        {isActive ? t('blueLight.blueLightOff') : t('blueLight.blueLightOn')}
      </button>
      {isActive && (
        <Slider
          intensity={intensity}
          onChange={handleSliderChange}
          aria-label={`${t('blueLight.title')}`}
          aria-description={`${t('slider.currentValue')} ${intensity}%`}
        />
      )}
    </>
  );
};

export default BlueLightFilter;
