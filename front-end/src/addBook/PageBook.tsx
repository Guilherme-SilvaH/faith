import { useState } from "react";
import "./PageBook.sass";
import ButtomBook from "./buttom/buttomBook";

export default function PageBook() {
  const [dia, setDia] = useState(""); // Data selecionada
  const [livro, setLivro] = useState(""); // Nome do livro digitado

  return (
    <div className="container-pageBook">
      <div className="container-dados">
        <div className="page-left">
          <div className="left-title">
            <h1>ADCIONE A SUA LEITURA AQUI</h1>
            <h4>
            "A cada dia em que você se dedica a ler a Bíblia, está construindo um elo mais forte com Deus. Cada versículo, cada história, cada ensinamento, são passos que te aproximam mais do Seu amor e da Sua sabedoria. A palavra de Deus é luz para os nossos caminhos e força para o nosso coração. Não importa o ritmo, o importante é a constância e a fé. Dedique um tempo diário para refletir e permitir que Ele fale com você, transformando sua vida de dentro para fora."
            </h4>
          </div>
          <div className="form-left">
            <label htmlFor="dia" className="form_label-left">
              Dia
            </label>
            <input
              type="date"
              name="dia"
              className="form_input-left"
              id="dia"
              value={dia}
              onChange={(e) => setDia(e.target.value)} // Atualiza a data
              required
            />

            <label htmlFor="livro" className="form_label-left">
              Livro
            </label>
            <input
              type="text"
              name="livro"
              className="form_input-left"
              id="livro"
              placeholder="Digite o nome do livro"
              value={livro}
              onChange={(e) => setLivro(e.target.value)} // Atualiza o livro digitado
              required
            />
          </div>
          <div className="container-buttom">
            {/* Passa os valores diretamente para o ButtomBook */}
            <ButtomBook
              dia={dia ? new Date(dia) : null} // Converte para Date ou null
              livro={livro.trim()} // Remove espaços desnecessários
              onResetLivro={() => setLivro("")} // Função para limpar o campo do livro
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
