import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Help from './Pages/Help';
import Initiatives from './components/Initiatives';
import NGO from './components/NGO';
import MyFunds from './components/MyFunds';
import MyInitiatives from './components/MyInitiatives';
import MyDonations from './components/MyDonations';
function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path='/initiatives' element={<Initiatives />} />
          <Route path='/ngos' element={<NGO />} />
          <Route path='/myFunds' element={<MyFunds />} />
          <Route path="/help" element={<Help />} />
          <Route path='/myDonations' element={<MyDonations />} />
          <Route path='/myInitiatives' element={<MyInitiatives />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
