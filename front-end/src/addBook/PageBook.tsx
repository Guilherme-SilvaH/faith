import { useState } from "react";
import "./PageBook.sass";
import ButtomBook from "./buttom/buttomBook";

export default function PageBook() {
  const [dia, setDia] = useState("");
  const [livros, setLivros] = useState<string[]>([]);
  const [livroAtual, setLivroAtual] = useState(""); // Para controlar o input do livro atual

  const handleAddLivro = () => {
    // Adiciona o livro atual à lista, se válido
    if (!livroAtual.trim()) {
      alert("Por favor, insira o nome de um livro válido.");
      return;
    }

    // Atualiza a lista de livros
    setLivros((prevLivros) => [...prevLivros, livroAtual.trim()]);

    // Reseta o campo do livro atual
    setLivroAtual("");
  };

  return (
    <div className="container-pageBook">
      <div className="container-dados">
        <div className="page-left">
          <div className="left-title">
            <h1>ADCIONE A SUA LEITURA AQUI</h1>
            <h4>
              "A cada dia em que você se dedica a ler a Bíblia..."
            </h4>
          </div>

          <div className="form-left">
            <label htmlFor="dia" className="form_label-left">Dia</label>
            <input
              type="date"
              name="dia"
              className="form_input-left"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
              required
            />

            <label htmlFor="livros" className="form_label-left">Livro Atual</label>
            <input
              type="text"
              name="livros"
              className="form_input-left"
              placeholder="Digite o nome do livro"
              value={livroAtual}
              onChange={(e) => setLivroAtual(e.target.value)}
              required
            />
          </div>

          <div className="container-buttom">
            <ButtomBook 
              onClick={handleAddLivro} // Adiciona livro à lista, o envio é feito no ButtonBook
              dia={new Date(dia)}
              livrosLidos={livros} 
            />
          </div>
        </div>

        <div className="page-right">
          <h2>Livros Adicionados:</h2>
          <ul>
            {livros.map((livro, index) => (
              <li key={index}>{livro}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

