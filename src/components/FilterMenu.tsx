import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import DeuteranomalyFilter from './DeuteranomalyFilter';
import {
  DEFAULT_MATRIX,
  PROTANOMALY_MATRIX,
  DEUTERANOMALY_MATRIX,
  TRITANOMALY_MATRIX,
  GRAYSCALE_MATRIX,
} from './filterMatrices';
import GrayscaleFilter from './GrayscaleFilter';
import appIcon from './icon_black.svg';
import ProtanomalyFilter from './ProtanomalyFilter';
import Slider from './Slider';
import TritanomalyFilter from './TritanomalyFilter';

import './FilterMenu.css';

interface FilterIntensities {
  protanomaly: number;
  deuteranomaly: number;
  tritanomaly: number;
  grayscale: number;
}

const LOCAL_STORAGE_FILTER = 'mapa11yActiveFilter';
const LOCAL_STORAGE_INTENSITIES = 'mapa11yFilterIntensities';
const LOCAL_STORAGE_DISABLED = 'mapa11yFilterDisabled';

const DEFAULT_INTENSITIES: FilterIntensities = {
  protanomaly: 100,
  deuteranomaly: 100,
  tritanomaly: 100,
  grayscale: 100,
};

const FilterMenu: React.FC = () => {
  const { t } = useTranslation('mapa11y');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_DISABLED) === 'true';
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(() => {
    return localStorage.getItem(LOCAL_STORAGE_FILTER);
  });
  const [intensities, setIntensities] = useState<FilterIntensities>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_INTENSITIES) || '') ||
        DEFAULT_INTENSITIES
      );
    } catch {
      return DEFAULT_INTENSITIES;
    }
  });

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    if (activeFilter) {
      localStorage.setItem(LOCAL_STORAGE_FILTER, activeFilter);
      document.body.style.filter = `url(#${activeFilter})`;

      const colorMatrix = document.getElementById(`${activeFilter}Matrix`);
      if (colorMatrix) {
        const matrix = calculateFilterMatrix(
          activeFilter,
          intensities[activeFilter as keyof FilterIntensities]
        );
        colorMatrix.setAttribute('values', matrix.join(' '));
      }
    } else {
      localStorage.removeItem(LOCAL_STORAGE_FILTER);
      document.body.style.filter = 'none';
    }

    localStorage.setItem(
      LOCAL_STORAGE_INTENSITIES,
      JSON.stringify(intensities)
    );
  }, [activeFilter, intensities]);

  const calculateFilterMatrix = (filter: string, intensity: number) => {
    const percent = intensity / 100;
    let matrix100;

    switch (filter) {
      case 'protanomaly':
        matrix100 = PROTANOMALY_MATRIX;
        break;
      case 'deuteranomaly':
        matrix100 = DEUTERANOMALY_MATRIX;
        break;
      case 'tritanomaly':
        matrix100 = TRITANOMALY_MATRIX;
        break;
      case 'grayscale':
        matrix100 = GRAYSCALE_MATRIX;
        break;
      default:
        return DEFAULT_MATRIX;
    }

    return DEFAULT_MATRIX.map(
      (startValue, index) =>
        startValue + (matrix100[index] - startValue) * percent
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) {
        if (event.key === '0') {
          if (isDisabled) {
            setIsDisabled(false);
            localStorage.setItem(LOCAL_STORAGE_DISABLED, 'false');
            setIsMenuOpen(true);
          } else {
            toggleMenu();
          }
        } else if (event.key.toLowerCase() === 'r' && !isDisabled) {
          resetFilters();
        }
      }

      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, isDisabled]);

  const resetFilters = () => {
    setActiveFilter(null);
    setIntensities(DEFAULT_INTENSITIES);
    localStorage.removeItem(LOCAL_STORAGE_FILTER);
    localStorage.removeItem(LOCAL_STORAGE_INTENSITIES);
  };

  const activateFilter = (filter: string) => {
    setActiveFilter(prev => (prev === filter ? null : filter));
  };

  if (isDisabled) {
    return null;
  }

  return (
    <div className="filter-menu-container">
      <svg className="hiddenSvg">
        <filter id="protanomaly">
          <feColorMatrix
            id="protanomalyMatrix"
            colorInterpolation="linearRGB"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
        </filter>
        <filter id="deuteranomaly">
          <feColorMatrix
            id="deuteranomalyMatrix"
            colorInterpolation="linearRGB"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
        </filter>
        <filter id="tritanomaly">
          <feColorMatrix
            id="tritanomalyMatrix"
            colorInterpolation="linearRGB"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
        </filter>
        <filter id="grayscale">
          <feColorMatrix
            id="grayscaleMatrix"
            colorInterpolation="linearRGB"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
        </filter>
      </svg>

      {isMenuOpen ? (
        <div className="filter-menu">
          <div className="header-buttons">
            <button
              className="reset-button"
              title={t('filterMenu.resetButtonTitle')}
              onClick={resetFilters}
              aria-label={t('filterMenu.resetFilterSettings')}
              aria-keyshortcuts="Alt+R"
              aria-description={t('filterMenu.resetFilterSettings')}
            >
              ⟳
            </button>

            <button
              className="close-button"
              title={t('filterMenu.closeButtonTitle')}
              onClick={toggleMenu}
              aria-label={t('filterMenu.close')}
              aria-keyshortcuts="Escape"
              aria-description={t('filterMenu.closeFilterMenu')}
            >
              ✖
            </button>
          </div>

          <div className="heading">{t('filterMenu.title')}</div>

          {activeFilter && (
            <Slider
              intensity={intensities[activeFilter as keyof FilterIntensities]}
              onChange={value => {
                setIntensities(prev => ({
                  ...prev,
                  [activeFilter]: value,
                }));
              }}
              aria-label={t(`${activeFilter}.title`)}
              aria-description={`${t('slider.currentValue')} ${
                intensities[activeFilter as keyof FilterIntensities]
              }%`}
            />
          )}

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

          <div className="disable-section">
            <button
              className="disable-button"
              onClick={() => {
                setIsDisabled(true);
                localStorage.setItem(LOCAL_STORAGE_DISABLED, 'true');
                setActiveFilter(null);
                setIntensities(DEFAULT_INTENSITIES);
                localStorage.removeItem(LOCAL_STORAGE_FILTER);
                localStorage.removeItem(LOCAL_STORAGE_INTENSITIES);
              }}
              type="button"
              role="link"
              aria-label={t('filterMenu.disableFiltersText')}
            >
              {t('filterMenu.disableFiltersText')}
            </button>
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
