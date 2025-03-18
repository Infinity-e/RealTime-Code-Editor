

"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function ThreeDPortfolio() {
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>3D Navbar Animation</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <div class="navbar">
        <div class="menu">
          <h3 class="logo">Vipin <span>Kumar</span></h3>
          <div class="hamburger-menu">
            <div class="bar"></div>
          </div>
        </div>
      </div>

      <div class="main-container">
        <div class="main">
          <header>
            <div class="overlay">
              <div class="inner">
                <h2 class="title">Click on NavBar icon</h2>
                <p>
                  In this project I try to make a 3D navbar animation you can check it out by clicking on the nav bar icon on ther top right corner.
                </p>
                <button class="btn">Read more</button>
              </div>
            </div>
          </header>
        </div>

        <div class="shadow one"></div>
        <div class="shadow two"></div>
      </div>

      <div class="links">
        <ul>
          <li>
            <a style="--i: 0.05s;">Home</a>
          </li>
          <li>
            <a  style="--i: 0.1s;">Services</a>
          </li>
          <li>
            <a  style="--i: 0.15s;">Portfolio</a>
          </li>
          <li>
            <a style="--i: 0.2s;">Testimonials</a>
          </li>
          <li>
            <a  style="--i: 0.25s;">About</a>
          </li>
          <li>
            <a  style="--i: 0.3s;">Contact</a>
          </li>
        </ul>
      </div>
    </div>

    <script src="app.js"></script>
  </body>
</html>`); // Your HTML code




  const [css, setCss] = useState(`@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body,
button {
  font-family: "Poppins", sans-serif;
}

.container {
  min-height: 100vh;
  width: 100%;
  background-color: #485461;
  background-image: linear-gradient(135deg, #485461 0%, #28313b 74%);
  overflow-x: hidden;
  transform-style: preserve-3d;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  height: 3rem;
}

.menu {
  max-width: 72rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.logo {
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 4rem;
}

.logo span {
  font-weight: 300;
}

.hamburger-menu {
  height: 4rem;
  width: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.bar {
  width: 1.9rem;
  height: 1.5px;
  border-radius: 2px;
  background-color: #eee;
  transition: 0.5s;
  position: relative;
}

.bar:before,
.bar:after {
  content: "";
  position: absolute;
  width: inherit;
  height: inherit;
  background-color: #eee;
  transition: 0.5s;
}

.bar:before {
  transform: translateY(-9px);
}

.bar:after {
  transform: translateY(9px);
}

.main {
  position: relative;
  width: 100%;
  left: 0;
  z-index: 5;
  overflow: hidden;
  transform-origin: left;
  transform-style: preserve-3d;
  transition: 0.5s;
}

header {
  min-height: 100vh;
  width: 100%;
  background: url("https://i.postimg.cc/vHtXVqkr/bg.jpg") no-repeat top center / cover;
  position: relative;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(43, 51, 59, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner {
  max-width: 35rem;
  text-align: center;
  color: #fff;
  padding: 0 2rem;
}

.title {
  font-size: 2.7rem;
}

.btn {
  margin-top: 1rem;
  padding: 0.6rem 1.8rem;
  background-color: #1179e7;
  border: none;
  border-radius: 25px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
}

.container.active .bar {
  transform: rotate(360deg);
  background-color: transparent;
}

.container.active .bar:before {
  transform: translateY(0) rotate(45deg);
}

.container.active .bar:after {
  transform: translateY(0) rotate(-45deg);
}

.container.active .main {
  animation: main-animation 0.5s ease;
  cursor: pointer;
  transform: perspective(1300px) rotateY(20deg) translateZ(310px) scale(0.5);
}

@keyframes main-animation {
  from {
    transform: translate(0);
  }

  to {
    transform: perspective(1300px) rotateY(20deg) translateZ(310px) scale(0.5);
  }
}

.links {
  position: absolute;
  width: 30%;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  list-style: none;
}

.links a {
  text-decoration: none;
  color: #eee;
  padding: 0.7rem 0;
  display: inline-block;
  font-size: 1rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.3s;
  opacity: 0;
  transform: translateY(10px);
  animation: hide 0.5s forwards ease;
}

.links a:hover {
  color: #fff;
}

.container.active .links a {
  animation: appear 0.5s forwards ease var(--i);
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes hide {
  from {
    opacity: 1;
    transform: translateY(0px);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
}

.shadow {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
  transform-origin: left;
  transition: 0.5s;
  background-color: white;
}

.shadow.one {
  z-index: -1;
  opacity: 0.15;
}

.shadow.two {
  z-index: -2;
  opacity: 0.1;
}

.container.active .shadow.one {
  animation: shadow-one 0.6s ease-out;
  transform: perspective(1300px) rotateY(20deg) translateZ(215px) scale(0.5);
}

@keyframes shadow-one {
  0% {
    transform: translate(0);
  }

  5% {
    transform: perspective(1300px) rotateY(20deg) translateZ(310px) scale(0.5);
  }

  100% {
    transform: perspective(1300px) rotateY(20deg) translateZ(215px) scale(0.5);
  }
}

.container.active .shadow.two {
  animation: shadow-two 0.6s ease-out;
  transform: perspective(1300px) rotateY(20deg) translateZ(120px) scale(0.5);
}

@keyframes shadow-two {
  0% {
    transform: translate(0);
  }

  20% {
    transform: perspective(1300px) rotateY(20deg) translateZ(310px) scale(0.5);
  }

  100% {
    transform: perspective(1300px) rotateY(20deg) translateZ(120px) scale(0.5);
  }
}

.container.active .main:hover + .shadow.one {
  transform: perspective(1300px) rotateY(20deg) translateZ(230px) scale(0.5);
}

.container.active .main:hover {
  transform: perspective(1300px) rotateY(20deg) translateZ(340px) scale(0.5);
}
`); // Your CSS code



  const [js, setJs] = useState(`const hamburger_menu = document.querySelector(".hamburger-menu");
const container = document.querySelector(".container");

hamburger_menu.addEventListener("click", () => {
  container.classList.toggle("active");
});


`); // Your JS code
  const [srcDoc, setSrcDoc] = useState("");

  const handlePreview = () => {
    setSrcDoc(`
      <html>
        <head><style>${css}</style></head>
        <body>${html}<script>${js}</script></body>
      </html>
    `);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-4">3D NavBar Animation</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center" >
            <h1>HTML</h1>
        <Editor
          height="40vh"
          defaultLanguage="html"
          theme="vs-dark"
          value={html}
          onChange={(value) => setHtml(value)}
        />
        </div>
        <div className="text-center" >
        <h1>CSS</h1>
        <Editor
          height="40vh"
          defaultLanguage="css"
          theme="vs-dark"
          value={css}
          onChange={(value) => setCss(value)}
        />
        </div>

        <div className="text-center" >
        <h1>JavaScript</h1>
        <Editor
          height="40vh"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={js}
          onChange={(value) => setJs(value)}
        />
        </div>
      </div>

      <button
        onClick={handlePreview}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Run Code
      </button>

      <iframe
        srcDoc={srcDoc}
        title="Output"
        className="w-full h-[400px] mt-4 bg-white"
      />
    </div>
  );
}
