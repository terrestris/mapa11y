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

First, install the package and its peer dependencies in your project:

```bash
npm install @terrestris/mapa11y
```

Then import and use the `FilterMenu` component in your application:

```typescript
import { FilterMenu } from '@terrestris/mapa11y';
import '@terrestris/mapa11y/dist/mapa11y.css';

const App = () => {
  return (
    <>
      {/* Your other components */}
      <FilterMenu />
    </>
  );
};

export default App;
```

To add the mapa11y translations to an exisitng i18n instance use

```typescript
import { addTranslations } from '@terrestris/mapa11y';

// i18n initialisation

await addTranslations(i18n);
```

Otherwise, the plugin uses its own i18n instance.

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
