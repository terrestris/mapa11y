# MapA11y

MapA11y is a React-based accessibility tool for map applications and general
websites that provides various color filters to enhance visualization for people
with visual impairments (e.g., Protanomaly, Tritanomaly, Grayscale). The filters
are optimized for integration into mapping applications like OpenLayers.

## Features - December 2024

- **Protanomaly Filter:** Adjusts colors for individuals with Protanomaly
  (red-green color blindness).
- **Tritanomaly Filter:** Adjusts colors for individuals with Tritanomaly
  (blue-yellow color blindness).
- **Grayscale Filter:** Converts the visualization into grayscale.

## Installation - not available now

To install the package in your project, use the following command:

```bash
npm install mapa11y
```

## Usage

### Basic Integration

To integrate the accessibility filters into your React application, import the
FilterMenu component.

## Development

### Local Setup

To run the project locally, clone the repository and install dependencies:

```bash
git clone https://code.terrestris.de/mholthausen/mapa11y.git
cd mapa11y
npm install
npm run dev
```

Then open <http://localhost:5173/> in your browser.

### Build

To build the package:

```bash
npm run build
```

## Further Details

See also
<https://www.ashleysheridan.co.uk/blog/Testing+Colour+Blindness+Effects+Online+with+SVG+Filters>
for further details about SVG matrix.

## License

This project is licensed under the BSD 2-Clause [License](LICENSE). See the
LICENSE file for details.

### Contributors

- Michael Holthausen (<holthausen@terrestris.de>)  
  Maintainer and Developer.

### Author

- Developed by terrestris GmbH & Co. KG  
  Contact: <info@terrestris.de>  
  Website: <https://www.terrestris.de>
