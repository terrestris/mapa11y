import FilterMenu from './components/FilterMenu';
import MapComponent from './components/Map';

import './App.css';

const App = () => {
  return (
    <div className="filter-tests">
      <MapComponent />
      <FilterMenu />
    </div>
  );
};

export default App;
