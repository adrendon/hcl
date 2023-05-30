"use strict";

//Numero de elementos montrados
var NUM_RESULT = 7;
// Boton ver mas
var linkVerMasResultados = document.querySelector('#btn-ver-mas-resultados');
// Llama la funcion cuando esta cargado el html
document.addEventListener('DOMContentLoaded', function() {
    mostrarResultados();
    verMasResultados();
});
// LLama a mostrar tarjetas al hacer click en ver mas
var verMasResultados = function() {
    if (linkVerMasResultados) {
        linkVerMasResultados.addEventListener('click', function() { return mostrarResultados(); });
    }
};
//Funcion para mostrar Preguntas - (7 Preguntas)
var mostrarResultados = function() {
    // lista Cards - (NodeList)
    var resultadosNodes = document.querySelectorAll('#resultados .resultado.d-none');
    // Convierte la Lista (7 Preguntas) de cards en Array - 
    var cardsArray = Array.from(resultadosNodes).slice(0, NUM_RESULT);
    cardsArray.forEach(function(card) {
        card.classList.remove('d-none');
    });
    // Oculta el boton ver mas
    if (resultadosNodes.length <= NUM_RESULT && linkVerMasResultados) {
        linkVerMasResultados.classList.add('d-none');
    }
};