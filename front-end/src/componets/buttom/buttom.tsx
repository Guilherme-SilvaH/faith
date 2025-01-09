import React from "react";
import axios from "axios";
import "./buttos.sass";

// Interface para as props
interface ButtomProps {
  name?: string;  // name é opcional para o login
  email: string;
  password: string;
  action: "cadastro" | "login"; // nova prop para decidir qual ação
}

const baseUrlCadastro = "http://localhost:5000/api/user/cadastro";
const baseUrlLogin = "http://localhost:5000/api/user/login";

export default function Buttom({ name, email, password, action }: ButtomProps) {
  const handleClick = async () => {
    try {
      const baseUrl = action === "cadastro" ? baseUrlCadastro : baseUrlLogin;

      // Dados para o login ou cadastro
      const data = action === "cadastro"
        ? { name, email, password, days: [] } // Cadastro
        : { email, password }; // Login

      const response = await axios.post(baseUrl, data);

      if (action === "cadastro") {
        alert("Cadastro realizado com sucesso!");
      } else {
        alert("Login realizado com sucesso!");
      }
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
