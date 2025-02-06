import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { parse, isValid } from "date-fns";
import "./ButtomOpem.sass"

const baseUrlOpemBook = "https://apibible.vercel.app/api/user/show-book";

export default function FilterBooks() {
  const [selectedDate, setSelectedDate] = useState(""); // Data escolhida
  const [books, setBooks] = useState<string[]>([]); // Lista de livros retornados
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterBooks = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Você precisa estar logado para visualizar os livros.");
      return;
    }

    if (!selectedDate) {
      toast.error("Por favor, selecione uma data.");
      return;
    }

    const parsedDate = parse(selectedDate, "yyyy-MM-dd", new Date());
    if (!isValid(parsedDate)) {
      toast.error("Por favor, selecione uma data válida.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrlOpemBook}?day=${selectedDate}`,  { headers: { Authorization: `Bearer ${token}` } 
      });

      setBooks(response.data.books || []);
      toast.success("Livros carregados com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("authToken");
        window.location.href = "/";
      } else {
        toast.error("Erro ao buscar livros. Verifique a data selecionada.");
      }
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="filter-books-container">
      <h2 className="h2-buttomOpem">Filtre os livros adicionados por data</h2>
      <div className="filter-inputs">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input-button-opem"
        />
        <button onClick={handleFilterBooks} disabled={isLoading} className="button-opem">
          {isLoading ? "Carregando..." : "Filtrar"}
        </button>
      </div>

      <div className="book-list">
        <h3>Livros encontrados:</h3>
        {books.length > 0 ? (
          <ul>
            {books.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
}
