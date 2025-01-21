import { useState } from "react";
import "./PageBook.sass";
import ButtomBook from "./buttom/buttomBook";

export default function PageBook() {
  const [dia, setDia] = useState("");
  const [livros, setLivros] = useState<string[]>([]);
  const [novoLivro, setNovoLivro] = useState(""); // Estado para o novo livro a ser adicionado

  const handleAddLivro = () => {
    if (novoLivro.trim() === "") return; // Não adiciona valores vazios

    // Adiciona o livro à lista local
    const livroAdicionado = novoLivro.trim();
    setLivros((prevLivros) => [...prevLivros, livroAdicionado]);

    // Envia os dados ao banco de dados
    enviarDadosAoBanco(new Date(dia), [...livros, livroAdicionado]);

    setNovoLivro(""); // Limpa o campo de entrada
  };

  const enviarDadosAoBanco = async (diaSelecionado: Date, livrosAtualizados: string[]) => {
    try {
      // Aqui você deve ajustar para chamar sua API ou serviço que envia os dados ao banco de dados
      await fetch("/api/salvarLeitura", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dia: diaSelecionado, livros: livrosAtualizados }),
      });
      console.log("Dados enviados ao banco com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados ao banco:", error);
    }
  };

  return (
    <div className="container-pageBook">
      <div className="container-dados">
        <div className="page-left">
          <div className="left-title">
            <h1>ADCIONE A SUA LEITURA AQUI</h1>
            <h4>
              "A cada dia em que você se dedica a ler a Bíblia, está construindo um elo mais forte com Deus. Cada versículo, cada história, cada ensinamento, 
              são passos que te aproximam mais do Seu amor e da Sua sabedoria. A palavra de Deus é luz para os nossos caminhos e força para o nosso coração. 
              Não importa o ritmo, o importante é a constância e a fé. Dedique um tempo diário para refletir e permitir que Ele fale com você, 
              transformando sua vida de dentro para fora."
            </h4>
          </div>
          <div className="form-left">
            <label htmlFor="dia" className="form_label-left" id="label-left">
              Dia
            </label>
            <input
              type="date"
              name="dia"
              className="form_input-left"
              id="dia"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
              required
            />

            <label htmlFor="livros" className="form_label-left" id="label-left-livros">
              Adicionar Livro
            </label>
            <input
              type="text"
              name="livros"
              className="form_input-left"
              id="livros"
              placeholder="Digite o nome do livro"
              value={novoLivro}
              onChange={(e) => setNovoLivro(e.target.value)} // Atualiza o estado do novo livro
              required
            />

            <div className="book-list">
              <h4>Livros Adicionados:</h4>
              <ul>
                {livros.map((livro, index) => (
                  <li key={index}>{livro}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="container-buttom">
            {/* O botão agora adiciona um novo livro e envia os dados ao banco */}
            <ButtomBook
              onClick={handleAddLivro} // A lógica de adicionar e enviar ao banco
              dia={new Date(dia)}
              livrosLidos={livros}
            />
          </div>
        </div>

        <div className="page-right">
          <h2>Página Direita</h2>
          <p>Conteúdo da página direita.</p>
        </div>
      </div>
    </div>
  );
}
