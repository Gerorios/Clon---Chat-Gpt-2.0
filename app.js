import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";


const formulario = document.querySelector("form");

const input = document.querySelector("form input");

const template = document.querySelector("#mensaje-template");

const mensajes = document.querySelector("ul");

const contenedor = document.querySelector("main");

const boton = document.querySelector("button");

const info = document.querySelector("small")

const SELECTED_MODEL = "stablelm-2-zephyr-1_6b-q4f16_1-MLC-1k"

const engine = await CreateMLCEngine(
    SELECTED_MODEL,
    {
        initProgressCallback : (info) => {
            console.log("initProgressCallback",info);
            info.textContent = `${info.text} `
        }
    }
)

formulario.addEventListener("submit", (event) =>{
    event.preventDefault()

    const mensajetext = input.value.trim();

    if (mensajetext != "") {
        input.value="";
    }
    añadirMensaje(mensajetext,"usuario");

    boton.setAttribute("disabled", true);

    setTimeout(() =>{
        añadirMensaje("hola , ¿como estas?", "bot")
        boton.removeAttribute("disabled")
    },2000)
})

const añadirMensaje = (mensaje , mensajero) =>{
    const templateClon = template.content.cloneNode(true);

    const nuevoMensaje = templateClon.querySelector(".mensaje");

    const who = nuevoMensaje.querySelector("span");
    const texto = nuevoMensaje.querySelector("p");

    texto.textContent = mensaje;
    who.textContent = mensajero == "bot" ? "GPT" : "Yo";

    nuevoMensaje.classList.add(mensajero)

    
    mensajes.appendChild(nuevoMensaje);
    contenedor.scrollTop = contenedor.scrollHeight; 

    
}