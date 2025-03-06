# MapA11y

![Beschreibung](./src/components/icon_black.svg)

MapA11y is a React-based accessibility tool for map applications and general
websites that provides various color filters to enhance visualization for people
with visual impairments (e.g., Protanomaly and Tritanomaly). The filters are
optimized for integration into mapping applications like OpenLayers.

This plugin is still under constant development

## Features - February 2025

- **Protanomaly Filter:** Adjusts colors for individuals with Protanomaly (red
  color blindness).
- **Deuteranomaly Filter:** Adjusts colors for individuals with Deuteranomaly
  (green color blindness).
- **Tritanomaly Filter:** Adjusts colors for individuals with Tritanomaly (blue
  color blindness).
- **Grayscale Filter:** Converts the visualization into grayscale.

## Installation

To install the package in your project, use the following command:

```bash
npm install @terrestris/mapa11y
```

Import the `FilterMenu` and add the component to your `App`.

```typescript
import { FilterMenu } from '@terrestris/mapa11y';

import MapComponent from './Map';

const App = () => {
  return (
    <>
      <MapComponent />
      <FilterMenu />
    </>
  );
};

export default App;
```

To use the translation files, `i18n` must be imported from `mapa11y` (if not
already present in the application) and the `App` must be wrapped in an
`I18NextProvider`. The style of the `mapa11y` components can either be defined
independently or used via an import:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import i18n from '@terrestris/mapa11y/dist/i18n';
import { I18nextProvider } from 'react-i18next';

import '@terrestris/mapa11y/dist/mapa11y.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

```

The filter menu is then displayed in the application and can be applied to the
content of the entire website.

## Usage

### Basic Integration

To integrate the accessibility filters into your React application, import the
FilterMenu component.

## Development

### Local Setup

To run the project locally, clone the repository and install dependencies:

```bash
git clone git@github.com:terrestris/mapa11y.git
cd mapa11y
npm install
npm run dev
```

Then open <http://localhost:5173/> in your browser. Here the plugin is
integrated into a map application.

### Build

To build the package:

```bash
npm run build
```

## Further Details

See also
<https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix> and
<https://www.ashleysheridan.co.uk/blog/Testing+Colour+Blindness+Effects+Online+with+SVG+Filters>
for further details about SVG matrix and color blindness.

See also
<https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness/types-color-vision-deficiency>
for more information about the types of color vision deficiency.

## License

This project is licensed under the BSD 2-Clause [License](LICENSE). See the
LICENSE file for details.

Logo source:
[ISO 7001 PI PF 049](https://commons.wikimedia.org/wiki/File:ISO_7001_PI_PF_049.svg)  
This file is made available under the Creative Commons CC0 1.0 Universal Public
Domain Dedication.
