import React from 'react';

import { useTranslation } from 'react-i18next';

interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  intensity: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  intensity,
  onChange,
  ...passThroughProps
}) => {
  const { t } = useTranslation('mapa11y');

  return (
    <div
      className="slider-container"
      aria-description={t('slider.description')}
    >
      <input
        type="range"
        min="0"
        max="100"
        value={intensity}
        onChange={e => onChange(Number(e.target.value))}
        {...passThroughProps}
      />
      <p className="intensity-label">
        <span className="label-text">{t('filterMenu.intensity')}:</span>
        <span className="value">{intensity}%</span>
      </p>
    </div>
  );
};

export default Slider;
