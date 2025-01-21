import { useState } from "react";
import "./PageBook.sass";
import ButtomBook from "./buttom/buttomBook";

export default function PageBook() {
  const [dia, setDia] = useState("");
  const [livros, setLivros] = useState<string[]>([]);
  const [livroAtual, setLivroAtual] = useState(""); // Para controlar o input do livro atual

  const handleAddAndSend = () => {
    // Adiciona o livro atual à lista, se válido
    if (!livroAtual.trim()) {
      alert("Por favor, insira o nome de um livro válido.");
      return;
    }

    // Atualiza a lista de livros
    setLivros((prevLivros) => [...prevLivros, livroAtual.trim()]);

    // Reseta o campo do livro atual
    setLivroAtual("");

    // Aqui chamamos o botão para lidar com o envio à API
    handleSendToAPI([...livros, livroAtual.trim()]);
  };

  const handleSendToAPI = async (livrosParaEnviar: string[]) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Você precisa estar logado para adicionar um livro.");
      return;
    }

    try {
      const formattedDate = new Date(dia).toISOString().split("T")[0];
      const response = await axios.post(
        "https://apibible.vercel.app/api/user/add-book",
        { day: formattedDate, books: livrosParaEnviar },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Livros enviados com sucesso!");
      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar livros. Verifique sua conexão e tente novamente.");
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
            {/* Entrada para a data */}
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

            {/* Entrada para o livro atual */}
            <label htmlFor="livros" className="form_label-left" id="label-left-livros">
              Livro Atual
            </label>
            <input
              type="text"
              name="livros"
              className="form_input-left"
              id="livros"
              placeholder="Digite o nome do livro"
              value={livroAtual}
              onChange={(e) => setLivroAtual(e.target.value)} // Atualiza o estado do livro atual
              required
            />
          </div>

          {/* Botão único que adiciona o livro à lista e o envia */}
          <div className="container-buttom">
            <ButtomBook
              onClick={handleAddAndSend} // Passa a lógica de adicionar e enviar
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

    </div>
  );
}
