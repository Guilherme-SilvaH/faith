import axios from "axios";
import "./buttonBook.sass"
// Interface para as props
interface ButtomBookProps {
    onClick: () => void;
  dia: Date;    
  livrosLidos: string[];
}

const baseUrlAddBook = "http://localhost:5000/api/user/add-book";

export default function ButtomBook({ dia, livrosLidos }: ButtomBookProps) {
  const handleClickBook = async () => {
    // Formatar o 'dia' como string (exemplo: '2025-01-14')
    const formattedDate = dia.toISOString().split("T")[0];

    try {
      
      const response = await axios.post(baseUrlAddBook, {
        day: formattedDate,
        books: livrosLidos,
      });

      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className="div-button" id="book-button">
      <button className="button" onClick={handleClickBook}>
        Adicionar Livro
      </button>
    </div>
  );
}
