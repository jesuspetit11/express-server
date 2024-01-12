const express = require("express"); //Importamos express

const {matematicas} = require("../datos/cursos.js").infoCursos;

//Router
const routerMatematicas = express.Router();

routerMatematicas.get("/", (req, res)=>{ //Manejaremos cuando haya una solicitud de tipo get en ese camino "/api/cursos/matematicas"
    // res.send(infoCursos.programacion);
    res.send(JSON.stringify(matematicas)); //También podemos convertirlo a formato JSON y enviarlo
});


routerMatematicas.get("/:tema", (req, res)=>{ 
    const tema = req.params.tema; //Tomar el parámetro para buscar
    const resultados = matematicas.filter(curso => curso.tema === tema);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron los cursos del tema: ${tema}`);
        //Le asignamos primero el código de estado en .status y después lo que vamos a enviar
    }
    res.send(JSON.stringify(resultados));
    //Código de estado por defecto 200
});

module.exports = routerMatematicas; 