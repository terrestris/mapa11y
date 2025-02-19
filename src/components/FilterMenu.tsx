import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import './FilterMenu.css';
import DeuteranomalyFilter from './DeuteranomalyFilter';
import GrayscaleFilter from './GrayscaleFilter';
import appIcon from './icon_black.svg';
import ProtanomalyFilter from './ProtanomalyFilter';
import TritanomalyFilter from './TritanomalyFilter';

const FilterMenu: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === '0') {
        toggleMenu();
      }

      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

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
            aria-label={t('filterMenu.close')}
            aria-keyshortcuts="Escape"
            aria-description={t('filterMenu.closeFilterMenu')}
          >
            ✖
          </button>
          <div className="heading">{t('filterMenu.title')}</div>
          <div className="filter-menu-buttons">
            <ProtanomalyFilter
              isActive={activeFilter === 'protanomaly'}
              onActivate={() => activateFilter('protanomaly')}
            />
            <DeuteranomalyFilter
              isActive={activeFilter === 'deuteranomaly'}
              onActivate={() => activateFilter('deuteranomaly')}
            />
            <TritanomalyFilter
              isActive={activeFilter === 'tritanomaly'}
              onActivate={() => activateFilter('tritanomaly')}
            />
            <GrayscaleFilter
              isActive={activeFilter === 'grayscale'}
              onActivate={() => activateFilter('grayscale')}
            />
          </div>
        </div>
      ) : (
        <div className="filter-icon" onClick={toggleMenu}>
          <img
            src={appIcon}
            alt={t('filterMenu.openMenu')}
            aria-label={t('filterMenu.openMenu')}
            aria-description={t('filterMenu.openFilterMenu')}
          />
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
