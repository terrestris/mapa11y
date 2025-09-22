import React from 'react';

import ColorFilter from './ColorFilter';

interface DeuteranomalyFilterProps {
  isActive: boolean;
  onActivate: () => void;
}

const DeuteranomalyFilter: React.FC<DeuteranomalyFilterProps> = props => {
  return <ColorFilter type="deuteranomaly" {...props} />;
};

export default DeuteranomalyFilter;
