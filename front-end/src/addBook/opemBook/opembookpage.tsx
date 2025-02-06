import { useState } from "react";
import logo from "../../assets/_e02457ba-08e1-4b7d-92db-7f2f77f34843-removebg-preview.png";
import FilterBooks from "../buttom-opembook/ButtomOpem";



import "./opembookpage.sass"
import MyVerticallyCenteredModal from "../../componets/modal/Modal";

export default function OpenBookPage() {
  const [modalShow, setModalShow] = useState(false)
  
  return (
    <div className="opem-bookadded">
      <h2 className="h2-class">Quer conhecer mais sobre a Faith? Clique no ícone abaixo </h2>
      <section className="section-infobook">
          <img src={logo} alt="Logo"  onClick={() => setModalShow(true)}/>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
      </section>
      <section className="section-bookadded">
          <FilterBooks />
      </section>
    </div>
  );
}
