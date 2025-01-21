import axios from "axios";
import "./buttonBook.sass";

interface ButtomBookProps {
  dia: Date | null; // Data do dia
  livro: string; // Livro digitado
  onResetLivro: () => void; // Função para resetar o campo do livro
}

const baseUrlAddBook = "https://apibible.vercel.app/api/user/add-book";

export default function ButtomBook({ dia, livro, onResetLivro }: ButtomBookProps) {
  const handleClickBook = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Você precisa estar logado para adicionar um livro.");
      return;
    }

    if (!dia || isNaN(dia.getTime())) {
      alert("Por favor, selecione um dia válido antes de continuar.");
      return;
    }

    if (!livro) {
      alert("Digite um nome válido para o livro antes de adicionar.");
      return;
    }

    const formattedDate = dia.toISOString().split("T")[0];

    try {
      const response = await axios.post(
        baseUrlAddBook,
        { day: formattedDate, books: [livro] }, // Envia apenas o livro atual
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Livro adicionado com sucesso!");
      console.log("Resposta da API:", response.data);

      onResetLivro(); // Limpa o campo do livro após o envio
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      alert("Erro ao adicionar livro. Tente novamente.");
    }
  };

  return (
    <div className="div-button">
      <button className="button" onClick={handleClickBook}>
        Adicionar Livro
      </button>
    </div>
  );
}
