import { useState } from "react";
import "./PageBook.sass";
import ButtomBook from "./buttom/buttomBook";

export default function PageBook() {
  const [dia, setDia] = useState("");
  const [livros, setLivros] = useState<string[]>([""]); // Inicia com um valor vazio para o primeiro livro
  

  const handleAddLivro = () => {
    if (livros.length === 0 || !livros[livros.length - 1]) return;
  
    // Adicionando o livro ao array de livros
    setLivros((prevLivros) => [...prevLivros, livros[livros.length - 1]]);
  
    // Resetando os estados após adicionar o livro
    setDia(""); // Reseta o dia
    setLivros([""]); // Reseta o array de livros para iniciar novamente
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
              onChange={(e) => setDia(e.target.value)} // Atualiza o estado 'dia'
              required
            />

            <label htmlFor="livros" className="form_label-left" id="label-left-livros">
              Livros Lidos
            </label>
            <input
              type="text"
              name="livros"
              className="form_input-left"
              id="livros"
              placeholder="Digite o nome do livro"
              value={livros[livros.length - 1] || ""} // Sempre exibe o último livro na lista
              onChange={(e) => {
                const newLivro = e.target.value;
                setLivros((prevLivros) => {
                  const updatedLivros = [...prevLivros];
                  updatedLivros[updatedLivros.length - 1] = newLivro; // Atualiza o último livro no array
                  return updatedLivros;
                });
              }}
              required
            />
          </div>
          <div className="container-buttom">
            <ButtomBook onClick={handleAddLivro} dia={new Date(dia)} livrosLidos={livros}  />
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

