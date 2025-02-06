import { useState } from "react";
import "./login.sass"
import Buttom from "../buttom-formulario/buttom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
    <div className="bg">
      <div className="divPai-login" id="body-main">
        <div className="divpai-formulario-login">
          <div className="dados-login">
            <h1 className="form_title-login" id="id-cadastro">
              Entrar na Faith!
            </h1>
          </div>
          <div className="main-form">
            <div className="dados-formulario">
              <label htmlFor="Email" className="form_label" id="label">
                Email
              </label>
              <input
                type="email"
                name="Email"
                className="form_input"
                id="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="dados-formulario">
              <label htmlFor="Password" className="form_label" id="label-passoword">
                Password
              </label>
              <input
                type="password"
                name="Password"
                className="form_input"
                id="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="container-bottom">
              {/* Passando os dados e a ação de login para o botão */}
              <Buttom email={email} password={password} action="login" />
            </div>
            <div className="nao-tem-uma-conta">
            <a href="https://faith-nu.vercel.app/cadastro">Nao tem uma conta?</a>
            </div>
        </div>
        </div>
      </div>
    </div>
    </>
  );
}
