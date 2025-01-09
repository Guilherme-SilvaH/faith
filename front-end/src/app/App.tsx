import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CadastroPage from "../cadastro/cadastro"
import LoginPage from "../login/login"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/cadastro' element={<CadastroPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
