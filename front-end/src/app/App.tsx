import './App.sass';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Adicione esta importação
import 'react-toastify/dist/ReactToastify.css'; // Adicione se não estiver em outro lugar
import 'bootstrap/dist/css/bootstrap.min.css'

import CadastroPage from "../cadastro/cadastro";
import LoginPage from "../login/login";
import PageBook from '../addBook/PageBook';
import ProtectedRoute from '../componets/protectedRoute/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      {/* Adicione o ToastContainer aqui */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
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
