import axios from "axios";
import "./buttonBook.sass";

interface ButtomBookProps {
  dia: Date;
  livrosLidos: string[];
  onClick?: () => void;
}

const baseUrlAddBook = "https://apibible.vercel.app/api/user/add-book";

export default function ButtomBook({ dia, livrosLidos, onClick }: ButtomBookProps) {
  const handleClickBook = async () => {
    if (onClick) onClick(); // Executa o handler de adicionar o livro na lista

    const formattedDate = dia.toISOString().split("T")[0]; // Formata a data como "YYYY-MM-DD"
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Você precisa estar logado para adicionar um livro.");
      return;
    }

    // Filtra livros válidos
    const livrosFiltrados = livrosLidos.filter((livro) => livro.trim() !== "");

    if (livrosFiltrados.length === 0) {
      alert("Nenhum livro válido foi adicionado.");
      return;
    }

    try {
      const response = await axios.post(
        baseUrlAddBook,
        {
          day: formattedDate,
          books: livrosFiltrados,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Livros adicionados com sucesso!");
      console.log("Resposta da API:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            alert("Sessão expirada ou token inválido. Faça login novamente.");
          } else {
            alert(`Erro: ${error.response.data.message || "Tente novamente mais tarde."}`);
          }
        } else {
          alert("Não foi possível conectar à API. Verifique sua conexão.");
        }
      } else {
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
