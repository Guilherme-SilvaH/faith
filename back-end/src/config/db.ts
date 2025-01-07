import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error('A variável MONGO_URI não está definida no arquivo .env');
        }

        await mongoose.connect(uri); // 

        console.log("MongoDB conectado com sucesso");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        process.exit(1); // Encerra o processo com erro
    }
};
