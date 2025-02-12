import { useState } from "react";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import verseIcon from "../assets/bible_PNG48.png"; 
import "./generaterVerses.sass"

const generaterApi = "https://bible-api.com/data/almeida/random";

interface BooksGenerate {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

function GeneratorVerses({ ...props }) {
  const [show, setShow] = useState(false);
  const [verseData, setVerseData] = useState<BooksGenerate | null>(null);

  const options = {
    name: "Leitura Diária",
    scrollable: true,
    backdrop: true,
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
      {/* Imagem clicável para abrir o Offcanvas */}
      <img
        src={verseIcon}
        alt="Ícone de Leitura Diária"
        onClick={handleShow}
        className="img-generater"
      />

      <Offcanvas
        show={show}
        onHide={handleClose}
        scrollable={options.scrollable}
        backdrop={options.backdrop}
        {...props}
        
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
