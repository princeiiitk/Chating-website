import Login from './Pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Start from './Component/Start';

function App() {
  return (
    <div className="bg-[#F8F4EA]">
      <Router>
        <Routes>
       
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/chats" element={<Home />} />
          <Route path="/" element={<Start />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
