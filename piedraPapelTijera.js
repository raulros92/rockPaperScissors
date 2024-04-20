// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //
// Asignaciones:
const nombreJugador = document.getElementsByName("nombre")[0];
const numeroPartidas = document.getElementsByName("partidas")[0];
const botonJugar = document.getElementsByTagName("button")[0];
const partidaActual = document.getElementById("actual");
const partidaTotal = document.getElementById("total");

const opcionesJugador = document.querySelectorAll("#jugador img");

const maquina = document.querySelector("#maquina img");

const botonYa = document.getElementsByTagName("button")[1];

const historial = document.querySelector("#historial");

const botonReset = document.getElementsByTagName("button")[2];

let partidaIniciada = false;
let partidasJugadas = 0;

// Función para actualizar el estado del juego
function actualizarJuego() {
    partidaActual.innerText = partidasJugadas;
    if (partidasJugadas == partidaTotal.innerText) {
        botonYa.disabled = true;
    }
}

// Preparar partida
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
        partidaIniciada = true;
        botonYa.disabled = false;
    }

    // Asignar las imágenes correspondientes a las opciones del jugador
    opcionesJugador.forEach(function (opcion, index) {
        opcion.setAttribute("src", `img/${posibilidades[index]}Jugador.png`);
        opcion.addEventListener("click", function () {
            //Remover la clase "seleccionado" de todas las opciones
            opcionesJugador.forEach(function (op) {
                op.classList.remove("seleccionado");
                op.classList.add("noSeleccionado");
            });
            // Agregar la clase "seleccionado" a la opción seleccionada
            opcion.classList.remove("noSeleccionado");
            opcion.classList.add("seleccionado");
        });
    });

});

//Jugar ronda
botonYa.addEventListener("click", function () {
    if (!partidaIniciada) {
        return; //No hacer nada si la partida no ha comenzado
    }
    //desabilitamos el boton Jugar para no poder continuar una vez acaben las rondas
    botonJugar.disabled = true;

    //Obtener la opcion seleccionada por el jugador
    let opcionJugadorNombre;
    opcionesJugador.forEach(function (opcion) {
        if (opcion.classList.contains("seleccionado")) {
            //Extraemos el nombre de la imagen eliminando la parte de "Jugador"
            opcionJugadorNombre = opcion.getAttribute("src").split("/").pop().split("Jugador")[0];
        }
    });

    //Generar la opcion aleatoria de la maquina
    let opcionMaquina = Math.floor(Math.random() * posibilidades.length);
    let opcionMaquinaNombre = posibilidades[opcionMaquina];
    //Mostrar la opcion de la maquina
    maquina.setAttribute("src", `img/${posibilidades[opcionMaquina]}Ordenador.png`);

    //Determinar el resultado de la ronda
    if (opcionJugadorNombre === opcionMaquinaNombre) {
        historial.innerHTML += "<li>Empate</li>\n";
    } else if ((posibilidades.indexOf(opcionJugadorNombre) + 1) % posibilidades.length == posibilidades.indexOf(opcionMaquinaNombre)) {
        historial.innerHTML += "<li>Gana la maquina</li>\n";
    } else historial.innerHTML += "<li>Gana " + nombreJugador.value + "</li>\n";

    partidasJugadas++;
    actualizarJuego();
});

//Resetear el juego
botonReset.addEventListener("click", function () {
    nombreJugador.value = "";
    numeroPartidas.value = 0;
    partidaActual.innerHTML = 0;
    partidaTotal.innerHTML = 0;
    partidasJugadas = 0;
    maquina.setAttribute("src", "img/defecto.png");
    historial.innerHTML += "<li>Nueva partida</li>\n";
    partidaIniciada = false;
    botonJugar.disabled = false;
    nombreJugador.disabled = false;
    numeroPartidas.disabled = false;
});




