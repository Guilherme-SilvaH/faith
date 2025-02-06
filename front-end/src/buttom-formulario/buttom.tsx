import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./buttos.sass";
import { useState } from "react";

interface ButtomProps {
  name?: string;
  email: string;
  password: string;
  action: "cadastro" | "login";
}

const baseUrlCadastro = "https://apibible.vercel.app/api/user/cadastro";
const baseUrlLogin = "https://apibible.vercel.app/api/user/login";

export default function ButtonForm({ name, email, password, action }: ButtomProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    
    try {
      // Validação de campos vazios
      if (action === "cadastro") {
        if (!name || !email || !password) {
          toast.error("Por favor, preencha todos os campos!");
          return;
        }
      } else {
        if (!email || !password) {
          toast.error("Por favor, preencha todos os campos!");
          return;
        }
      }

      const baseUrl = action === "cadastro" ? baseUrlCadastro : baseUrlLogin;
      const data = action === "cadastro" 
        ? { name, email, password } 
        : { email, password };

      const response = await axios.post(baseUrl, data);

      if (action === "cadastro") {
        toast.success("Cadastro realizado com sucesso!");
        navigate("/");
      } else {
        if (!response.data.token) {
          throw new Error("Token não recebido");
        }
        
        localStorage.setItem("authToken", response.data.token);
        toast.success("Login realizado com sucesso!");
        navigate("/add-book");
      }
    } catch (error) {
      let errorMessage = `${action === "cadastro" ? "Cadastro" : "Login"} falhou. Tente novamente.`;
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      
      toast.error(errorMessage);
      console.error(`${action} error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="div-button">
      <button 
        className="button-form" 
        onClick={handleClick} 
        disabled={isLoading}
      >
        {isLoading ? "Carregando..." : (action === "cadastro" ? "Cadastre-se" : "Entrar")}
      </button>
    </div>
  );
}