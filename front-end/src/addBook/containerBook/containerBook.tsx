import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Importa os estilos do AOS
import "./containerBook.sass";
import ButtomBook from "../buttom-addbook/buttomBook";
import RetroImage from "../../assets/retro.png"
import RetroMobile from "../../assets/retro-mobile.png"

export default function ContainerBook() {
  const [dia, setDia] = useState("");
  const [livro, setLivro] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Inicializa o AOS
  }, []);

  const [imageSrc, setImageSrc] = useState(RetroImage);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setImageSrc(RetroMobile);
      } else {
        setImageSrc(RetroImage);
      }
    };

    handleResize(); // Verifica no carregamento
    window.addEventListener("resize", handleResize); 

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <div className="container-pageBook">
      <div className="container-dados" id="bg">
        <div className="page-main">
          <div className="left-title" data-aos="fade-up">
            <img src={imageSrc} alt="Retro Image" className="retro-image" />
          </div>

          <div className="form-left" >
            <div className="div-label">
              <label htmlFor="dia" className="form_label-left">Dia</label>
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
              <label htmlFor="livro" className="form_label-left">Livro</label>
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

          <div className="container-buttom" >
            <ButtomBook
              dia={dia ? new Date(dia) : null}
              onResetdia={() => setDia("")}
              livro={livro.trim() ? [livro.trim()] : []}
              onResetLivro={() => setLivro("")}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
}
