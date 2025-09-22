import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';

import i18n from '../test-utils/i18n';

import ColorFilter, { FilterType } from './ColorFilter';

describe('ColorFilter Component', () => {
  const renderWithI18n = (ui: React.ReactElement) => {
    return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
  };

  const filterTypes: FilterType[] = [
    'grayscale',
    'protanomaly',
    'deuteranomaly',
    'tritanomaly',
  ];

  filterTypes.forEach(type => {
    describe(`${type} filter`, () => {
      test('renders with correct initial state when inactive', () => {
        const onActivate = vi.fn();
        renderWithI18n(
          <ColorFilter type={type} isActive={false} onActivate={onActivate} />
        );

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute(
          'title',
          expect.stringMatching(new RegExp(type, 'i'))
        );
        expect(button).toHaveTextContent(new RegExp(`${type}.*On`, 'i'));
        expect(button).toHaveAttribute(
          'aria-description',
          expect.stringMatching(new RegExp(type, 'i'))
        );
      });

      test('renders with correct state when active', () => {
        const onActivate = vi.fn();
        renderWithI18n(
          <ColorFilter type={type} isActive={true} onActivate={onActivate} />
        );

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(new RegExp(`${type}.*Off`, 'i'));
      });

      test('calls onActivate when clicked', () => {
        const onActivate = vi.fn();
        renderWithI18n(
          <ColorFilter type={type} isActive={false} onActivate={onActivate} />
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(onActivate).toHaveBeenCalledTimes(1);
      });

      test('has correct accessibility attributes', () => {
        const onActivate = vi.fn();
        renderWithI18n(
          <ColorFilter type={type} isActive={false} onActivate={onActivate} />
        );

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute(
          'aria-label',
          expect.stringMatching(new RegExp(type, 'i'))
        );
        expect(button).toHaveAttribute(
          'aria-description',
          expect.stringMatching(new RegExp(type, 'i'))
        );
      });
    });
  });

  test('renders with all filter types', () => {
    const onActivate = vi.fn();
    filterTypes.forEach(type => {
      const { container } = renderWithI18n(
        <ColorFilter type={type} isActive={false} onActivate={onActivate} />
      );
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(new RegExp(type, 'i'));
    });
  });
});
