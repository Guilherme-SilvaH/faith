import { useState, useEffect } from "react";
import logo from "../../assets/logoF.svg";
import FilterBooks from "../buttom-opembook/ButtomOpem";
import "./opembookpage.sass";
import MyVerticallyCenteredModal from "../../componets/modal/Modal";
import GenereterVerses from "../../generaterVerses/generaterVerses";

export default function OpenBookPage() {
  const [modalShow, setModalShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="opem-bookadded">
      <div className="inf">
        <div className="h2-class-div">
          <h1 className="h2-class">
            Gerador de <span className="inf-highlight">Versículo</span>
          </h1>
          <h6 className="h6-class">
            O gerador de versículo ajuda você a se fortalecer espiritualmente e a tornar a leitura mais acessível no dia a dia.
          </h6>
          <p className="p-class">{isMobile ? "Clique no ícone abaixo." : "Clique no ícone ao lado."}</p>
        </div>
        <div className="container-genereterVerses">
          <GenereterVerses />
        </div>
      </div>
      <section className="section-infobook">
        <div className="modal-img">
          <img src={logo} alt="Logo" onClick={() => setModalShow(true)} />
          <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
        <div className="infobook">
          <h1>SOBRE</h1>
          <h6 className="h6-infobook-title">
            Quer conhecer mais sobre a <span className="infobook-highlight">FAITH</span> e seu propósito no desenvolvimento?
          </h6>
          <p className="infobook-text-p">{isMobile ? "Clique na imagem abaixo e descubra!" : "Clique na imagem ao lado e descubra!"}</p>
        </div>
      </section>
      <section className="section-bookadded">
        <FilterBooks />
      </section>
    </div>
  );
}
