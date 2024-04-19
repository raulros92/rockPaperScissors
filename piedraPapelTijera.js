// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //
// Asignaciones:
let nombreJugador = document.getElementsByName("nombre")[0];
let numeroPartidas = document.getElementsByName("partidas")[0];
const botonJugar = document.getElementsByTagName("button")[0];
let partidaActual = document.getElementById("actual");
let partidaTotal = document.getElementById("total");

// Selección de las imágenes del jugador
const piedra = document.querySelector(".seleccionado");
const papel = document.querySelectorAll(".noSeleccionado")[0];
const tijera = document.querySelectorAll(".noSeleccionado")[1];

const botonYa = document.getElementsByTagName("button")[1];

// Selección de la imagen de la máquina
let maquina = document.getElementById("maquina");


let historial = document.querySelector("#historial");

const botonReset = document.getElementsByTagName("button")[2];

// Comienzo de la partida

botonJugar.addEventListener("click", function () {
    // Verificar si el campo del nombre del jugador cumple con la condición
    const nombreValido = /^[^\d].{3,}$/.test(nombreJugador.value);
    if (!nombreValido) {
        // Agregar clase fondoRojo si el nombre no es válido
        nombreJugador.classList.add("fondoRojo");
    } else {
        // Remover la clase fondoRojo si el nombre es válido
        nombreJugador.classList.remove("fondoRojo");
    }

    // Verificar si el número de partidas es menor que 1
    if (numeroPartidas.value < 1) {
        console.log("Numero de partidas es menor que 1");
        numeroPartidas.classList.add("fondoRojo");
    } else {
        numeroPartidas.classList.remove("fondoRojo");
    }

    // Si tanto el nombre como el número de partidas son válidos, desactivar los campos
    if (nombreValido && numeroPartidas.value >= 1) {
        nombreJugador.disabled = true;
        numeroPartidas.disabled = true;
        partidaTotal.innerText = numeroPartidas.value;
    }
});





