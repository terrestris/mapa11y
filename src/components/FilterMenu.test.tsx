import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import '@testing-library/jest-dom';

import i18n from '../i18n';

import FilterMenu from './FilterMenu';

type Filter = {
  buttonName: RegExp;
  sliderName?: RegExp;
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
};

const filters: Filter[] = [
  {
    buttonName: /protanomaly/i,
    sliderName: /protanomaly/i,
  },
  {
    buttonName: /deuteranomaly/i,
    sliderName: /deuteranomaly/i,
  },
  {
    buttonName: /tritanomaly/i,
    sliderName: /tritanomaly/i,
  },
  {
    buttonName: /grayscale/i,
    sliderName: /grayscale/i,
  },
];

describe('FilterMenu Component', () => {
  test('shows the icon for opening the menu', () => {
    renderWithProviders(<FilterMenu />);
    const menuIcon = screen.getByRole('img', { name: /Open Filter Menu/i });
    expect(menuIcon).toBeInTheDocument();
  });

  test('opens the menu by clicking on the icon', () => {
    renderWithProviders(<FilterMenu />);
    const menuIcon = screen.getByRole('img', { name: /Open Filter Menu/i });

    fireEvent.click(menuIcon);

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('closes the menu by clicking on the close button', () => {
    renderWithProviders(<FilterMenu />);
    fireEvent.click(screen.getByRole('img', { name: /Open Filter Menu/i }));

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(closeButton).not.toBeInTheDocument();
  });

  test('activates the filters by clicking on the corresponding button', () => {
    renderWithProviders(<FilterMenu />);
    fireEvent.click(screen.getByRole('img', { name: /Open Filter Menu/i }));

    filters.forEach(({ buttonName, sliderName }) => {
      const filterButton = screen.getByRole('button', { name: buttonName });
      fireEvent.click(filterButton);

      const rangeElement = screen.getByRole('slider', { name: sliderName });
      expect(rangeElement).toBeInTheDocument();
    });
  });

  test('checks that there are no unexpected buttons in the FilterMenu and that all filters are present', () => {
    renderWithProviders(<FilterMenu />);
    fireEvent.click(screen.getByRole('img', { name: /Open Filter Menu/i }));

    filters.push({
      buttonName: /close/i,
      sliderName: undefined,
    });

    const buttonElements = screen.getAllByRole('button');

    filters.forEach(({ buttonName }) => {
      const button = buttonElements.find(btn =>
        btn.getAttribute('aria-label')?.match(buttonName)
      );

      if (!button) {
        throw new Error(
          `The configured button with name '${buttonName.source}' is missing in the FilterMenu. Please check or update the test.`
        );
      }

      expect(button).toBeInTheDocument();
    });

    buttonElements.forEach(button => {
      const ariaLabel = button.getAttribute('aria-label');
      if (
        ariaLabel &&
        !filters.some(({ buttonName }) => ariaLabel.match(buttonName))
      ) {
        throw new Error(`Unexpected button found: ${ariaLabel}`);
      }
    });
  });
});
