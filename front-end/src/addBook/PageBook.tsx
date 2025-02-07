
import "./PageBook.sass";
import ContainerBook from "./containerBook/containerBook";
import OpenBookPage from "./opemBook/opembookpage"

export default function PageBook() {
  return (
    <div className="div-pageBook" >
      <ContainerBook />
      <OpenBookPage />
    </div>
  )
}