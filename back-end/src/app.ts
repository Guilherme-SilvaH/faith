import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';
import { connectDB } from './config/db';

const app = express();

// Habilitar CORS antes das rotas
app.use(cors({
  origin: ['https://my-bible-reader.vercel.app', 'http://localhost:3000'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json()); // Middleware para processar requisições JSON

// Roteador de usuários
app.use('/api/user', userRouter);

// Conectar ao banco de dados MongoDB
connectDB();

// Iniciar o servidor
app.listen(5000, () => {
  console.log('Servidor rodando em http://localhost:5000');
});
