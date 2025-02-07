import { useState } from "react";
import logo from "../../assets/logoF.svg";
import FilterBooks from "../buttom-opembook/ButtomOpem";



import "./opembookpage.sass"
import MyVerticallyCenteredModal from "../../componets/modal/Modal";
import GenereterVerses from "../../generaterVerses/generaterVerses";

export default function OpenBookPage() {
  const [modalShow, setModalShow] = useState(false)
  
  return (
    <div className="opem-bookadded">
      <div className="inf">
          <div className="h2-class-div">
            <h2 className="h2-class">Aproveite e leia um versiculo diario</h2>
            <GenereterVerses/>
          </div>
          <section className="section-infobook">
              <img src={logo} alt="Logo"  onClick={() => setModalShow(true)}/>
                <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
          </section>
      </div>
      <section className="section-bookadded">
          <FilterBooks />
      </section>
    </div>
  );
}
