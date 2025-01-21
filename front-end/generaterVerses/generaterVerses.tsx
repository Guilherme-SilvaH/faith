import axios from "axios";
import React, { useState } from "react";

const generaterApi = "https://bible-api.com/data/almeida/random";

// Definindo o tipo para o estado
interface BooksGenerate {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export default function GenereterVerses() {
  // Tipando o estado corretamente como BooksGenerate ou null
  const [verseData, setVerseData] = useState<BooksGenerate | null>(null);

  const fetchVerse = async () => {
    try {
      const response = await axios.get(generaterApi);
      console.log("Resposta da API:", response.data);
      
      // Extraindo os dados necessários
      const { book, chapter, verse, text } = response.data;

      // Armazenando os dados do versículo no estado
      setVerseData({ book, chapter, verse, text });
    } catch (error) {
      console.error("Erro ao obter versículo:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchVerse}>Gerar Versículo Aleatório</button>

      {verseData && (
        <div>
          <h3>Versículo Aleatório:</h3>
          <p><strong>Livro:</strong> {verseData.book}</p>
          <p><strong>Capítulo:</strong> {verseData.chapter}</p>
          <p><strong>Versículo:</strong> {verseData.verse}</p>
          <p><strong>Texto:</strong> {verseData.text}</p>
        </div>
      )}
    </div>
  );
}
