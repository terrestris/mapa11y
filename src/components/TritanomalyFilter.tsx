import React from 'react';

import ColorFilter from './ColorFilter';

interface TritanomalyFilterProps {
  isActive: boolean;
  onActivate: () => void;
}

const TritanomalyFilter: React.FC<TritanomalyFilterProps> = props => {
  return <ColorFilter type="tritanomaly" {...props} />;
};

export default TritanomalyFilter;
