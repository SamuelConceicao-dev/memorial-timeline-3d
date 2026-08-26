// Códigos ligados à UI

const eventos = document.querySelectorAll(".event");
const conteudos = document.querySelectorAll(".content-box");

// Mostra elementos da UI
export function mostrarConteudo(indice){

    eventos.forEach(e => e.classList.remove("active"));
    conteudos.forEach(c => c.classList.remove("active"));

    const evento = eventos[indice];

    evento.classList.add("active");

    document
        .getElementById(evento.dataset.content)
        .classList.add("active");
}

