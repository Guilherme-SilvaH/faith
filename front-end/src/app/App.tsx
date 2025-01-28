import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CadastroPage from "../cadastro/cadastro";
import LoginPage from "../login/login";
import PageBook from '../addBook/PageBook';
import ProtectedRoute from '../componets/protectedRoute/ProtectedRoute';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/cadastro' element={<CadastroPage/>}/>
        <Route 
          path='/add-book' 
          element={
            <ProtectedRoute>
              <PageBook/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;