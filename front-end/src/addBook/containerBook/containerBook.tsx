import { useState } from "react";
import "./containerBook.sass";
import ButtomBook from "../buttom-addbook/buttomBook";


export default function ContainerBook() {
  const [dia, setDia] = useState(""); // Data selecionada
  const [livro, setLivro] = useState(""); // Nome do livro digitado

  return (
      <div className="container-pageBook" >
        <div className="container-dados" id="bg">
          <div className="page-main">
            <div className="left-title">
              <h1>ADCIONE A SUA LEITURA AQUI</h1>
              <h4>
                "A cada dia em que você se dedica a ler a Bíblia, está construindo um elo mais forte com Deus. Cada versículo, cada história, cada ensinamento, são passos que te aproximam mais do Seu amor e da Sua sabedoria. A palavra de Deus é luz para os nossos caminhos e força para o nosso coração. Não importa o ritmo, o importante é a constância e a fé. Dedique um tempo diário para refletir e permitir que Ele fale com você, transformando sua vida de dentro para fora."
              </h4>
            </div>
    
            <div className="form-left">
              <div className="div-label">
                  <label htmlFor="dia" className="form_label-left" >
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
              </div>
              <div className="div-label">
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
                      onChange={(e) => setLivro(e.target.value)}
                      required
                    />
                    
              </div>
            </div>
    
              <div className="container-buttom">
                  <ButtomBook
                    dia={dia ? new Date(dia) : null}
                    onResetdia={() => setDia("")}
                    livro={livro.trim() ? [livro.trim()] : []} 
                    onResetLivro={() => setLivro("")}
                  />
                  <h2>Quer conhecer mais sobre a Faith? Clique no ícone abaixo </h2>
              </div>
          </div>
      </div>
    </div>
  );  
} 
  