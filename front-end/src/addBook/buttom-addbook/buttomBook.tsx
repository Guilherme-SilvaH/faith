import axios from "axios";
import { formatISO } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import "./buttonBook.sass";

interface ButtomBookProps {
  dia: Date | null;
  livro: string[] | string;
  onResetLivro: () => void;
  onResetdia: () => void;
}

const baseUrlAddBook = "https://apibible.vercel.app/api/user/add-book";

export default function ButtomBook({ dia, livro, onResetLivro, onResetdia }: ButtomBookProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickBook = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Você precisa estar logado para adicionar um livro.");
      return;
    }

    if (!dia || isNaN(dia.getTime())) {
      toast.error("Por favor, selecione um dia válido antes de continuar.");
      return;
    }

    if (!Array.isArray(livro) || livro.length === 0) {
      toast.error("Digite um nome válido para o livro antes de adicionar.");
      return;
    }

    const formattedDate = formatISO(dia, { representation: 'date' }); // Novo formato

    setIsLoading(true);

    try {
      const response = await axios.post(
        baseUrlAddBook,
        { day: formattedDate, books: livro },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Livro adicionado com sucesso!");
      console.log("Resposta da API:", response.data);

      onResetLivro();
      onResetdia();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Sessão expirada. Faça login novamente.");
          localStorage.removeItem("authToken");
          window.location.href = "/";
        } else {
          toast.error(`Erro ao adicionar livro: ${error.response?.data.message || "Tente novamente."}`);
        }
      } else {
        toast.error("Erro inesperado. Tente novamente.");
      }
      console.error("Erro ao adicionar livro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="div-button" id="div-button-addbook">
      <button className="button" id="button-addbook" onClick={handleClickBook} disabled={isLoading}>
        {isLoading ? "Adicionando..." : "Adicionar Livro"}
      </button>
    </div>
  );
}