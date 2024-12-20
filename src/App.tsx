import FilterMenu from './components/FilterMenu';
import MapComponent from './components/Map';

import './App.css';

const App = () => {
  return (
    <>
      <img src='/favicon.svg' alt='MapA11y Logo' height={'100px'}/>
      <h1>MapA11y - Filter-Demo</h1>
      <div className="filter-tests">
        <FilterMenu />
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Ishihara-Test.svg"
            alt="Ishihara-Test"
          />
        </div>
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'green',
            margin: '20px auto'
          }}
        />
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'red',
            margin: '20px auto'
          }}
        />
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'blue',
            margin: '20px auto'
          }}
        />
        <MapComponent />
      </div>
    </>
  );
};

export default App;
