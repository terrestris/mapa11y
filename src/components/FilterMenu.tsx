import React, { useState } from 'react';
import './FilterMenu.css';
import ProtanomalyFilter from './ProtanomalyFilter';
import GrayscaleFilter from './GrayscaleFilter';
import TritanomalyFilter from './TritanomalyFilter';

const FilterMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const activateFilter = (filter: string) => {
    setActiveFilter(prev => (prev === filter ? null : filter));
  };

  return (
    <div className="filter-menu-container">
      {isMenuOpen ? (
        <div className="filter-menu">
          <button
            className="close-button"
            onClick={toggleMenu}
          >
            ✖
          </button>
          <div className='heading'>Filter Menu</div>
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
              isActive={activeFilter === 'tritanomaly'}
              onActivate={() => activateFilter('tritanomaly')}
            />
          </div>
        </div>
      ) : (
        <div
          className="filter-icon"
          onClick={toggleMenu}
        >
          <img
            src="/favicon.svg"
            alt="Open Filter Menu"
          />
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
