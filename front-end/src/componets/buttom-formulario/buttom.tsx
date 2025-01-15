import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import "./buttos.sass";

interface ButtomProps {
  name?: string;
  email: string;
  password: string;
  action: "cadastro" | "login";
}

const baseUrlCadastro = "https://apibible.vercel.app/api/user/cadastro";
const baseUrlLogin = "https://apibible.vercel.app/api/user/login";

export default function Buttom({ name, email, password, action }: ButtomProps) {
  const navigate = useNavigate(); // Hook para navegação

  const handleClick = async () => {
    try {
      const baseUrl = action === "cadastro" ? baseUrlCadastro : baseUrlLogin;

      // Dados para login ou cadastro
      const data = action === "cadastro"
        ? { name, email, password }
        : { email, password };

      const response = await axios.post(baseUrl, data);
      
      if (action === "cadastro") {
        alert("Cadastro realizado com sucesso!");
        // Redireciona para a página de login após cadastro
        navigate("/login"); // Rota de login
      } else {
        alert("Login realizado com sucesso!");
        
        // Salva o token no localStorage
        localStorage.setItem("authToken", response.data.token);

        // Redireciona para a página de add-book
        navigate("/add-book"); // Página de adicionar livro
      }
      console.log(response);
    } catch (error) {
      console.error(`${action} erro:`, error);
      alert(`${action === "cadastro" ? "Cadastro" : "Login"} falhou. Tente novamente.`);
    }
  };

  return (
    <div className="div-button">
      <button className="button" onClick={handleClick}>
        {action === "cadastro" ? "Cadastre-se" : "Entrar"}
      </button>
    </div>
  );
}
