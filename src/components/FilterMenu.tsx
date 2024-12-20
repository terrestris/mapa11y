import React, { useState } from 'react';
import './FilterMenu.css';
import ProtanomalyFilter from './ProtanomalyFilter';
import GrayscaleFilter from './GrayscaleFilter';
import TritanomalyFilter from "./TritanomalyFilter";

const FilterMenu: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const activateFilter = (filter: string) => {
    setActiveFilter(prev => (prev === filter ? null : filter));
  };

  return (
    <div className="filter-menu">
      <h4>Filter-Menü</h4>
      <div className="filter-menu-buttons">
        <ProtanomalyFilter
          isActive={activeFilter === 'protanomaly'}
          onActivate={() => activateFilter('protanomaly')}
        />
        <GrayscaleFilter
          isActive={activeFilter === 'grayscale'}
          onActivate={() => activateFilter('grayscale')}
        />
        <TritanomalyFilter
          isActive={activeFilter === "tritanomaly"}
          onActivate={() => activateFilter("tritanomaly")}
        />
      </div>
    </div>
  );
};

export default FilterMenu;
