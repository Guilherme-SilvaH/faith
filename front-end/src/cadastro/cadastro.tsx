import { useState } from "react";

import "./cadastro.sass";
import Buttom from "../componets/buttom-formulario/buttom";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
    <div className="bg">
      <div className="body-main">
        <div className="divPai-container" >
          <div className="divpai-formulario">
            <div className="dados-cadastro">
              <h1 className="form_title" id="id-cadastro">
                Crie uma nova conta!
              </h1>
            </div>
            <div className="main-form">
              <div className="dados-formulario">
                <label htmlFor="nome" className="form_label" id="label">Nome</label>
                <input
                  type="text"
                  name="nome"
                  className="form_input"
                  id="nome"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Atualizar estado
                  required
                />
              </div>
              <div className="dados-formulario">
                <label htmlFor="Email" className="form_label" id="label-email">Email</label>
                <input
                  type="email"
                  name="Email"
                  className="form_input"
                  id="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Atualizar estado
                  required
                />
              </div>
              <div className="dados-formulario">
                <label htmlFor="Password" className="form_label" id="label-password">Password</label>
                <input
                  type="password"
                  name="Password"
                  className="form_input"
                  id="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Atualizar estado
                  required
                />
              </div>
              <div className="container-bottom">
                {/* Passar os dados e a função para o botão */}
                <Buttom name={name} email={email} password={password} action="cadastro" />
              </div>
              <div className="ja-tem-uma-conta">
                <a href="https://faith-nu.vercel.app/">Já tem uma conta?</a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </>
  );  
} 
