import React from "react";
import "./Footer.scss";
import { FaLinkedin, FaGithub, FaPortrait } from "react-icons/fa";

const dataSocialMedia = [
  {
    name: "Francisco Costa",
    Linkedin: "https://www.linkedin.com/in/francisco-costa-dev/",
    Github: "https://github.com/FranciscoCosta",
    Portfolio: "https://franciscostaportfolio.netlify.app/",
  },
  {
    name: "Alan Fooster",
    Linkedin: "https://www.linkedin.com/in/foster-/",
    Github: "https://github.com/Foster-Alan",
    Portfolio: "https://foster-portifolio.netlify.app/",
  },
  {
    name: "Renan Munhoes",
    Linkedin: "https://www.linkedin.com/in/renancasarinmunhoes/",
    Github: "https://github.com/munhoesrc",
    Portfolio: "http://munhoesrc.me/",
  },
  {
    name: "Gustavo Vasconcelos",
    Linkedin: "https://www.linkedin.com/in/vasconcelos-gu/",
    Github: "https://github.com/vasconcelosguu",
    Portfolio: "https://vasconcelosguu.github.io/react-portfolio/",
  },
  {
    name: "Rafael Silva",
    Linkedin: "https://www.linkedin.com/in/rafael-soares-dev/",
    Github: "https://github.com/rafaelsisoares",
    Portfolio: "https://rafaelsisoares.github.io/",
  }
];





function Footer() {
  return (
    <div className="Footer">
      <h1>Trabalho realizado pelo Grupo nº1  da Turma 24 - Trybe 2023</h1>
      <div className="Footer__container">
        {dataSocialMedia.map((person) => {
          return (
            <div className="Person__social" key={person.name}>
              <h4>{person.name}</h4>
              <FaLinkedin
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  window.open(person.Linkedin, "_blank");
                }}
              />
              <FaGithub
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  window.open(person.Github, "_blank");
                }}
              />
              <FaPortrait
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  window.open(person.Portfolio, "_blank");
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Footer;
