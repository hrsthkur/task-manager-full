import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';

function App() {
  return (
    <>
    <Navbar></Navbar>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        
        

      </Routes>
    </>
  );
}

export default App;
