import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();
console.log(process.env.MONGO_URI)
export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        
        if (!uri) {
            throw new Error('A variável MONGO_URI não está definida no arquivo .env');
        }

        // Conecta ao MongoDB sem as opções obsoletas
        await mongoose.connect(uri);

        console.log("MongoDB conectado com sucesso");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        process.exit(1); // Encerra o processo com erro
    }
};
