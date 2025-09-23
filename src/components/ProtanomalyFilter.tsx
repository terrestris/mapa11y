import React from 'react';

import ColorFilter from './ColorFilter';

interface ProtanomalyFilterProps {
  isActive: boolean;
  onActivate: () => void;
}

const ProtanomalyFilter: React.FC<ProtanomalyFilterProps> = props => {
  return <ColorFilter type="protanomaly" {...props} />;
};

export default ProtanomalyFilter;
