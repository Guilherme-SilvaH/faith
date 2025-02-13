import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { parse, isValid } from "date-fns";
import "./ButtomOpem.sass";
import Table from "react-bootstrap/Table";

const baseUrlOpemBook = "https://apibible.vercel.app/api/user/show-book";

export default function FilterBooks() {
  const [selectedDate, setSelectedDate] = useState(""); // Data escolhida
  const [books, setBooks] = useState<string[]>([]); // Lista de livros retornados
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false); // Indica se a busca foi realizada

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
    setSearched(false); // Resetando antes da busca

    try {
      const response = await axios.get(`${baseUrlOpemBook}?day=${selectedDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedBooks = response.data.books || [];

      setBooks(fetchedBooks);
      setSearched(true); 

      if (fetchedBooks.length === 0) {
        toast.error("Nenhum livro filtrado");
      } else {
        toast.success("Livros carregados com sucesso!");
      }
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
      <h2 className="h2-buttomOpem">Buscar livros por data</h2>
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
        {searched && books.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Livro lido</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{selectedDate}</td>
                  <td>{book}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : searched && books.length === 0 ? (
          <p className="livros-opem">Nenhum livro encontrado.</p>
        ) : null}
      </div>
    </div>
  );
}
