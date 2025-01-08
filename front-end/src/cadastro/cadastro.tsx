import "./cadastro.sass";

export default function Cadastro() {
  return (
    <>
      <div className="divPai-container">
        <div className="divpai-formulario">
          <div className="dados-cadastro">
            <h1 className="form_title" id="id-cadastro">
              Cadastro
            </h1>
          </div>
          <div className="dados-formulario">
            <label htmlFor="nome" className="form_label" id="label">Nome</label>
            <input
              type="text"
              name="nome"
              className="form_input"
              id="nome"
              placeholder="Nome"
              required
            />
          </div>
          <div className="dados-formulario">
            <label htmlFor="Email" className="form_label" id="label">Email</label>
            <input
              type="email"
              name="Email"
              className="form_input"
              id="Email"
              placeholder="Email"
              required
            />
          </div>
          <div className="dados-formulario">
            <label htmlFor="Password" className="form_label" id="label">Password</label>
            <input
              type="password"
              name="Password"
              className="form_input"
              id="Password"
              placeholder="Password"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}
