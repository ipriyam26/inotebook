import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NavBar from './components/NavBar';
import DarkModeState from './context/darkModeState';
import Home from './components/Home';
import About from './components/About';
import SignUp from './components/SignUp';

function App() {
  return (
<DarkModeState>
   <Router>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/about" element={<About/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
    </Router>
</DarkModeState>

  );
}

export default App;
