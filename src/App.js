import HomePage from './pages/HomePage/HomePage'
import AddAlgorithmPage from './pages/AddAlgorithmPage/AddAlgorithmPage';
import RunAlgorithmsPage from './pages/RunAlgorithmsPage/RunAlgorithmsPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import './App.css';
import {
  Routes ,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/addAlgorithm" element={<AddAlgorithmPage/>}/>
        <Route path="/runAlgorithms" element={<RunAlgorithmsPage/>}/>
        <Route path="/results" element={<ResultsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
