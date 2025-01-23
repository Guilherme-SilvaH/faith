import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/userRouter';
import { connectDB } from './src/config/db';

const app = express();

// Habilitar CORS antes das rotas
app.use(cors({
  origin: ['https://faith-nu.vercel.app', 'http://localhost:3000'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json()); // Middleware para processar requisições JSON

// Roteador de usuários
app.use('/api/user', userRouter);

// Conectar ao banco de dados MongoDB
connectDB();

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
