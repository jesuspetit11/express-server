const express = require("express"); //Importamos express
const app = express();  //Hacemos una instancia de express
const routerMatematicas = require("./routers/matematicas"); //Importamos el Router de matemáticas
const routerProgramacion = require("./routers/programacion"); //Importamos el Router de matemáticas

const {infoCursos} = require("./datos/cursos.js"); //Importamos la bd que tenemos en infoCursos

//Creando un router

app.use("/api/cursos/programacion", routerProgramacion); //Asociamos el router con la aplicación

app.use("/api/cursos/matematicas", routerMatematicas); //Asociamos el router con la aplicación 

//Routing

//GET
//app.método("/camino")
app.get("/", (req, res)=>{ //Manejaremos cuando haya una solicitud de tipo get en ese camino "/"
    res.send("Mi primer servidor con Express!");
});

app.get("/api/cursos", (req, res)=>{ //Manejaremos cuando haya una solicitud de tipo get en ese camino "/"
    //Es bueno dar a entender que estamos usando una API, por eso tendremos que ponerlo en algún lugar, en este caso la URL
    // res.send(infoCursos);
    res.send(JSON.stringify(infoCursos)); //También podemos convertirlo a formato JSON y enviarlo
});

//Parámetros query
const PUERTO = process.env.PORT || 3000;
//En un ambiente real el puerto será asignado de forma dinámica, en dado caso escribimos lo siguiente
//process.env.PORT => CONSEGUIRÁ EL VALOR DEL PUERTO EN EL ENVIROMENT

app.listen(PUERTO, ()=>{
    console.log(`El servidor esta escuchando en el puerto: ${PUERTO}...`);
});

