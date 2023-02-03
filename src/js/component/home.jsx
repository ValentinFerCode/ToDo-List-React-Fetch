import React, { useState, useEffect } from "react";

// create your first component
const Home = () => {

  // declaracion de estados
  // espacio de memoria, la funcion que actualiza el valor inicial
  const [activity, setActivity] = useState(""); // 1. creamos un estado del input
  const [data, setData] = useState([]); // 2. creamos un estado de lo que se guarda en el array
  // console.log(activity)
  const [todosEnServer, setTodosEnServer] = useState([])

  // 3.vinculamos a la funcion
  function handleActivity(e) { // lleva un e de evento (nativo de js) como parámetro
    setActivity(e.target.value);//e.target.value toma el valor dentro del input, tenemos acceso al valor actual del input mediante target.value
    console.log(e.target.value);// muestra el valor del evento como objeto. Imprime lo que el usuario escribio
  }

  // const handleClick = () => {
  //   if (activity.length === 0) {
  //       alert("Ingrese un valor")
  //   } else {
  //       setActivity([...activity, {"label":input, "done":false}]);
  // setInput("")
  //   }
     
  //   }

  // 4. procesamos todos los datos del formulario
  // funcion para guardar datos en el array
  function guardarTarea(e) {
    e.preventDefault();// detenemos el comportamiento predeterminado para procesar nuestro codigo
    // setData([... data, activity]); spread operator
    setData(data.concat({"label": activity, "done": false})) // La función concat() concatena los argumentos de tipo texto con la cadena de sobre la que se llama a la función y devuelve una nueva cadena de texto. Los cambios en la cadena original o la cadena devuelta no afectan al otro. Suma una nueva actividad a lo que ya tenia.
    setActivity("")
}
  // console.log(data);


  // const para eliminar item en array
  const deleteItem = (id) => {
    console.log(id);
    setData(data.filter((item, index) => {
      return index != id;
    }))
    console.log(data);
  }

  useEffect(() => {
    createUser()     
}, [])

useEffect(() => {
getTodoList()
// updateTodos()
},[])



  function createUser(){
    //1. Get list of todo's for a particular user
    //al fetch le decimos que lleve la informacion a una url especifica y ejecuta dos promesas
    //con las {} de objeto añadimos un 2do valor y especificamos el metodo POST y algunas propiedades
    fetch('https://assets.breatheco.de/apis/fake/todos/user/aquilesbailo94',{ 
        method: 'POST', // *GET, POST, PUT, DELETE, etc. POST
        
        headers: {
            'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded'. Esta info que le envio: Es como decirle al servidor; la informacion que te estoy enviando es de cierto tipo. Normalmente cuando enviamos informacion a un servidor se le envia info de tipo application en formato json
          },

          body: JSON.stringify([]) // body data type must match "Content-Type" header. Especificamos lo que queremos enviar
          //Para crear el usuario, en body debemos colocar el array vacio (donde se encontraba data)
    })
    .then((response)=>response.json()) //al ejecutar las promesas, ejecutamos una funcion con un parametro de response que es donde guardamos la respuesta que buscamos, y la convertiremos en un json
    .then((data)=>console.log(data)) //acá le decimos que lo que convirtio en un json, entonces acá guardalo en este espacio de memoria para que se convierta en un dato. Luego para corroborar cualquier cosa es consologuear de data
  }

  function getTodoList(){
    //1. Get list of todo's for a particular user
    fetch('https://assets.breatheco.de/apis/fake/todos/user/aquilesbailo94',{ 
        method: 'GET', // *GET, POST, PUT, DELETE, etc. POST
        
        headers: {
            'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded'. Esta info que le envio: Es como decirle al servidor; la informacion que te estoy enviando es de cierto tipo. Normalmente cuando enviamos informacion a un servidor se le envia info de tipo application en formato json
          },

        //   body: JSON.stringify([]) // body data type must match "Content-Type" header. Especificamos lo que queremos enviar (body sirve si solo si quiero enviar info)
          //Para crear el usuario, en body debemos colocar el array vacio (donde se encontraba data)
    })
    .then((response)=>response.json()) //al ejecutar las promesas, ejecutamos una funcion con un parametro de response que es donde guardamos la respuesta que buscamos, y la convertiremos en un json
    .then((data)=>setData(data)) //acá le decimos que lo que convirtio en un json, entonces acá guardalo en este espacio de memoria para que se convierta en un dato. Luego para corroborar cualquier cosa es consologuear de data

  }

  function updateTodos(){
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/aquilesbailo94`,
		{method: 'PUT', 
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}

  function borrarTodos(){
    // setData([])
    // updateTodos()
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/aquilesbailo94`,
		{method: 'DELETE', 
		headers: {
			'Content-Type': 'application/json'}
	  })
		.then((response)=>response.json())
		.then((data)=>console.log(data))
    createUser()
    getTodoList()
	}

  // useEffect(()=>{
  //   //escribir un bloque de codigo
  //   //2. Create a new todo list of a particular user
  //   createUser()
  //   getTodoList()
  //   updateTodos()
  //   //el fetch se activa al cargar la pagina (array inferior vacio)
    

  // },[])

  // const numbers = [1, 2, 3, 4, 5];
  // const listItems = numbers.map((number) =>
  // <li>{number}</li>
  // );

  /* <ul>{listItems}</ul> */

  // El array a usar es data
  // const listItems = data.map((item, index) =>
  // <li key={index}>{item} <button onClick={() => remove(index)}>
  // </button>X</li>
  // );

  return (
    <div className="container">

            <div className="m-auto tamañoDiv padding-superior">
                <div className="p-4 color-de-fondo">
                    <h3 className="pb-3 text-dark text-center">
                        Tareas por realizar</h3>
                    <div className="input-group mb-3">
                        <button onClick={guardarTarea}
                            className="btn btn-success"
                            type="button"
							style={{backgroundColor:"rgb(0, 144, 133)"}}
                            id="button-addon1">Ingrese Tarea</button>
                        <input onChange={handleActivity} // The onchange event occurs when the value of an HTML element is changed. onChange se ejecuta cada vez que el valor cambie.
                            type="text"
                            className="form-control"
                            placeholder=""
							value={activity}
                          />
                    </div>
                    <div id="contenedorData" className="text-light">
                        {
                        data?.map((item, index) => (
                            <div key={index} className="row d-flex m-2"  style={{borderRadius:"20px",backgroundColor: "rgb(69, 255, 249)"}}>
                                <div className="col-6">
                                {/* //para que se muestren las tareas coloco item-punto-propiedad */}
                                    <h5 className="m-2">{item.label}</h5> 
                                </div>
                                <div className="col-6 text-end">
                                    <i className="fas fa-trash-alt align-items-end m-2 pt-1"
                                        onClick={ 
                                            () => deleteItem(index)
                                    }></i>
                                </div>
                            </div>
                        ))
                    } </div>
                    
                    {/* Aquí vamos a contar los todos que se encuentren en el lado del servidor */}
                    <div id="contenedorTodos" className="text-info">
                        {/* <h5>Todos en el servidor</h5> */}
                        
                        {/* <p>{todosEnServer.length}</p> */}
                        

                        <ul>
{
todosEnServer?.map((todo, i)=>{
return (<li key={i}>{todo?.label}</li>)
})
}
</ul>
                        
                        </div>

                    <div id="contadorTodos">
                        <p className="text-info mt-3">Faltan por realizar {
                            data.length
                        }
                            &nbsp;tareas</p>
                    </div>
                    <button onClick={borrarTodos}
                        className="btn btn-danger"
                        type="button"
                        id="button-addon1">Borrar To do's</button>

                        <button onClick={updateTodos}
                        className="btn btn-danger mx-1"
                        type="button"
                        style={{backgroundColor:"rgb(0, 144, 133)"}}
                        id="button-addon1">Guardar To do's</button>
                </div>
            </div>
        </div>
    );
};
                    
export default Home;
