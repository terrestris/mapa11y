import React from 'react';

import { useTranslation } from 'react-i18next';

export type FilterType =
  | 'grayscale'
  | 'protanomaly'
  | 'deuteranomaly'
  | 'tritanomaly';

interface ColorFilterProps {
  type: FilterType;
  isActive: boolean;
  onActivate: () => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  type,
  isActive,
  onActivate,
}) => {
  const { t } = useTranslation('mapa11y');

  return (
    <button
      onClick={onActivate}
      title={t(`${type}.title`)}
      aria-label={t(`${type}.title`)}
      aria-description={t(`${type}.description`)}
    >
      {isActive ? t(`${type}.${type}Off`) : t(`${type}.${type}On`)}
    </button>
  );
};

export default ColorFilter;
