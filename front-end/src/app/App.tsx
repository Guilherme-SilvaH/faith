import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CadastroPage from "../cadastro/cadastro"
import LoginPage from "../login/login"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CadastroPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
