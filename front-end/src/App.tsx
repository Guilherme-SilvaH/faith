import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Função para tratar a submissão do formulário de cadastro
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página

    try {
      // Enviando dados para o back-end
      const response = await axios.post('http://localhost:5000/api/user/cadastro', {
        name,
        email,
        password,
      });

      // Se o cadastro for bem-sucedido, exibe mensagem de sucesso
      setSuccessMessage('Cadastro realizado com sucesso! Você pode fazer login agora.');
      setError('');
    } catch (err) {
      // Exibindo erro caso ocorra algum problema
      setError('Erro ao cadastrar. Verifique as informações e tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Cadastro</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default App;
