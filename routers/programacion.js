const express = require("express"); //Importamos express

const {programacion} = require("../datos/cursos.js").infoCursos;

//Router
const routerProgramacion = express.Router();

//Middleware
routerProgramacion.use(express.json());

routerProgramacion.get("/", (req, res)=>{ //Manejaremos cuando haya una solicitud de tipo get en ese camino "/api/cursos/programacion"
    // res.send(infoCursos.programacion);
    res.send(JSON.stringify(programacion)); //También podemos convertirlo a formato JSON y enviarlo
});

//Parámetros de ruta
routerProgramacion.get("/:lenguaje", (req, res)=>{ 
    const lenguaje = req.params.lenguaje; //Tomar el parámetro para buscar
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron los cursos del lenguaje: ${lenguaje}`);
        //Le asignamos primero el código de estado en .status y después lo que vamos a enviar
    }

    //Verificamos los parámetros query si fueron ingresados
    if(req.query.ordenar === "vistas"){
        const cursosOrdenados = ordenarCursos(resultados); //Tomamos el resultado de resultados y lo pasamos como argumento a ordenarCursos
        res.send(JSON.stringify(cursosOrdenados)); //Enviamos una lista ordenada, y dependiendo del valor si es positivo o negativo se ordena
    } else {
        res.send(JSON.stringify(resultados));
        //Código de estado por defecto 200
    }
});

//Usando dos parámetros de ruta
routerProgramacion.get("/:lenguaje/:nivel", (req, res)=>{ 
    const lenguaje = req.params.lenguaje; //Tomar el parámetro para buscar
    const nivel = req.params.nivel;
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron los cursos del lenguaje: ${lenguaje} de nivel ${nivel}`);
        //Le asignamos primero el código de estado en .status y después lo que vamos a enviar
    }
    res.send(JSON.stringify(resultados)); //Enviamos el JSON de todos los cursos para verificar
    //Código de estado por defecto 200
});

routerProgramacion.post("/", (req, res)=>{ //Cuando recibamos una petición de tipo post la manejamos con esta ruta en específico
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion));
});

routerProgramacion.put("/:id", (req, res)=>{ //Cuando recibamos una petición de tipo post la manejamos con esta ruta en específico
    //PUT actualiza los datos
    const cursoActualizado = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id); 

    if(indice >= 0){
        programacion[indice] = cursoActualizado;
    }
    res.send(JSON.stringify(programacion)); //Enviamos el JSON de todos los cursos para verificar
});

routerProgramacion.patch('/:id', (req, res) => {
    const infoNueva = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoNueva);
    }
    res.json(programacion); //Ya se pone automáticamente como JSON
});

routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
    programacion.splice(indice, 1);
    }
    res.json(programacion);
});


//Funciones
function ordenarCursos(cursos) {
    return cursos.sort((a, b) => b.vistas - a.vistas);
}

module.exports = routerProgramacion;