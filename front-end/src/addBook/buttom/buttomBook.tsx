import axios from "axios";
import "./buttonBook.sass";

// Interface para as props
interface ButtomBookProps {
  dia: Date;
  livrosLidos: string[];
}

const baseUrlAddBook = "https://apibible.vercel.app/api/user/add-book";

export default function ButtomBook({ dia, livrosLidos }: ButtomBookProps) {
  const handleClickBook = async () => {
    // Formatar o 'dia' como string (exemplo: '2025-01-14')
    const formattedDate = dia.toISOString().split("T")[0];
    const token = localStorage.getItem("authToken"); // Recuperar o token do localStorage

    // Verificar se o token está presente
    if (!token) {
      alert("Você precisa estar logado para adicionar um livro.");
      return;
    }

    try {
      // Enviar a requisição para a API
      const response = await axios.post(
        baseUrlAddBook,
        {
          day: formattedDate,
          books: livrosLidos,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adicionar o token no cabeçalho
          },
        }
      );

      // Notificar sucesso ao usuário
      alert("Livro adicionado com sucesso!");
      console.log("Resposta da API:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Erros da API
          if (error.response.status === 401) {
            alert("Sessão expirada ou token inválido. Faça login novamente.");
          } else {
            alert(
              `Erro: ${error.response.data.message || "Tente novamente mais tarde."}`
            );
          }
        } else {
          // Erros de rede ou problemas no servidor
          alert("Não foi possível conectar à API. Verifique sua conexão.");
        }
      } else {
        // Outros erros desconhecidos
        alert("Erro inesperado. Por favor, tente novamente.");
      }
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className="div-button" id="book-button">
      <button className="button" onClick={handleClickBook}>
        Adicionar Livro
      </button>
    </div>
  );
}
