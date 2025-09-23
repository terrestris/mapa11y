import React from 'react';

import ColorFilter from './ColorFilter';

interface GrayscaleFilterProps {
  isActive: boolean;
  onActivate: () => void;
}

const GrayscaleFilter: React.FC<GrayscaleFilterProps> = props => {
  return <ColorFilter type="grayscale" {...props} />;
};

export default GrayscaleFilter;
