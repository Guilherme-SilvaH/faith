import axios from "axios";
import { useState } from "react";
import "./generaterVerses.sass"

const generaterApi = "https://bible-api.com/data/almeida/random";

// Definindo o tipo para o estado
interface BooksGenerate {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export default function GenereterVerses() {
 
  const [verseData, setVerseData] = useState<BooksGenerate | null>(null);

  const fetchVerse = async () => {
    try {
      const response = await axios.get(generaterApi);
      console.log("Resposta da API:", response.data);
      
   
      const { book, chapter, verse, text } = response.data.random_verse;

      // Armazenando os dados do versículo no estado
      setVerseData({ book, chapter, verse, text });
    } catch (error) {
      console.error("Erro ao obter versículo:", error);
    }
  };

  return (
    <div className="container-generater">
      <div className="div-button-generater">
        <button className="button" onClick={fetchVerse}>Gerar Versículo Aleatório</button>
      </div>
      {verseData && (
      <div className="container-dados-gerador">
        <p><strong>Livro:</strong> {verseData.book}</p>
        <p><strong>Capítulo:</strong> {verseData.chapter}</p>
        <p><strong>Versículo:</strong> {verseData.verse}</p>
        <p><strong>Texto:</strong> {verseData.text}</p>
      </div>
      )}
    </div>
  );
}
