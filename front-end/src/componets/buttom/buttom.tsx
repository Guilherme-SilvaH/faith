import axios from "axios";
import "./buttos.sass";

const baseUrl = "http://localhost:5000/api/user/cadastro";

// Interface para as props
interface ButtomProps {
  name: string;
  email: string;
  password: string;
}

export default function Buttom({ name, email, password }: ButtomProps) {
  const handleClickRegister = async () => {
    try {
      const response = await axios.post(baseUrl, {
        name,
        email,
        password,
        days: [], 
      });

      alert("Cadastro realizado com sucesso!");
      
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="div-button">
      <button className="button" onClick={handleClickRegister}>
        Cadastre-se
      </button>
    </div>
  );
}
