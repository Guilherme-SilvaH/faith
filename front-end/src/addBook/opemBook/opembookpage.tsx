
import logo from "../../assets/_e02457ba-08e1-4b7d-92db-7f2f77f34843-removebg-preview.png";
import FilterBooks from "../buttom-opembook/ButtomOpem";

import "./opembookpage.sass"

export default function OpenBookPage() {
  return (
    <div className="opem-bookadded">
      <section className="section-infobook">
          <img src={logo} alt="Logo" />
      </section>
      <section className="section-bookadded">
          <FilterBooks />
      </section>
    </div>
  );
}
