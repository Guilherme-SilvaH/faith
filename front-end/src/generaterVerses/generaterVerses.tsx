import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const generaterApi = "https://bible-api.com/data/almeida/random";

// Definição do tipo dos dados do versículo
interface BooksGenerate {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

function GeneratorVerses({ ...props }) {
  const [show, setShow] = useState(false);
  const [verseData, setVerseData] = useState<BooksGenerate | null>(null);

  // Configuração correta do Offcanvas
  const options = {
    name: "Leitura Diária",
    scrollable: true, // Habilita a rolagem dentro do Offcanvas
    backdrop: true, // Ativa o fundo escuro ao redor do Offcanvas
  };

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    try {
      const response = await axios.get(generaterApi);
      console.log("Resposta da API:", response.data);

      const { book, chapter, verse, text } = response.data.random_verse;
      setVerseData({ book, chapter, verse, text });
    } catch (error) {
      console.error("Erro ao obter versículo:", error);
    }
  };

  return (
    <>
      {/* Botão com o nome correto */}
        <Button style={{
        backgroundColor: "#ff5733",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        border: "none",
      }}

      variant="primary" onClick={handleShow} className="me-2" id="btn-genereter">
        {options.name}
      </Button>

      {/* Offcanvas com opções corrigidas */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        scrollable={options.scrollable} 
        backdrop={options.backdrop}
        {...props}
        className="bg-dark text-light"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Leitura Diária</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {verseData ? (
            <div>
              <p><strong>Livro:</strong> {verseData.book}</p>
              <p><strong>Capítulo:</strong> {verseData.chapter}</p>
              <p><strong>Versículo:</strong> {verseData.verse}</p>
              <p><strong>Texto:</strong> {verseData.text}</p>
            </div>
          ) : (
            <p>Carregando versículo...</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default GeneratorVerses;
