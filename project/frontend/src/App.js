import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;