import React, { useState } from "react";

// create your first component
const Home = () => {

  // declaracion de estados
  // espacio de memoria, la funcion que actualiza el valor inicial
  const [activity, setActivity] = useState(""); // 1. creamos un estado del input email
  const [data, setData] = useState([]); // 2. creamos un estado de lo que se guarda en el array
  console.log(activity)

  // 3.vinculamos la funcion
  function handleActivity(e) { // lleva un e de evento (nativo de js) como parámetro
    setActivity(e.target.value);
    console.log(e.target.value);// muestra el valor del evento como objeto
  }


  // 4. procesamos todos los datos del formulario
  // funcion para guardar datos en el array
  function guardarTarea(e) {
    e.preventDefault();// detenemos el comportamiento predeterminado para procesar nuestro codigo
    // setData([... data, activity]); spread operator
    setData(data.concat(activity)) // La función concat() concatena los argumentos de tipo texto con la cadena de sobre la que se llama a la función y devuelve una nueva cadena de texto. Los      cambios en la cadena original o la cadena devuelta no afectan al otro.
  }
  console.log(data);


  // const para eliminar item en array
  const deleteItem = (id) => {
    setData(data.filter((item, index) => {
      return index != id;
    }))
  }

  // const numbers = [1, 2, 3, 4, 5];
  // const listItems = numbers.map((number) =>
  // <li>{number}</li>
  // );

  /* <ul>{listItems}</ul> */

  // El array a usar es data
  const listItems = data.map((item, index) =>
  <li>{item} <button onClick={() => remove(index)}>
  </button>X</li>
  );

  return (
    <div className="container">

            <div className="m-auto tamañoDiv padding-superior">
                <div className="p-4 color-de-fondo">
                    <h3 className="pb-3 text-dark">
                        Ingrese su tarea a realizar</h3>
                    <div className="input-group mb-3">
                        <button onClick={guardarTarea}
                            className="btn btn-success"
                            type="button"
							style={{backgroundColor:"rgb(0, 144, 133)"}}
                            id="button-addon1">Ingrese Tarea</button>
                        <input onChange={handleActivity} // The onchange event occurs when the value of an HTML element is changed
                            type="text"
                            className="form-control"
                            placeholder=""
							value={activity}
                          />
                    </div>
                    <div id="contenedorData" className="text-light">
                        {
                        data.map((item, index) => (
                            <div className="row d-flex m-2"  style={{borderRadius:"20px",backgroundColor: "rgb(110, 19, 214)"}}>
                                <div className="col-6">
                                    <h5 className="m-2">{item}</h5>
                                </div>
                                <div className="col-6 text-end">
                                    <i class="fas fa-trash-alt align-items-end m-2 pt-1"
                                        onClick={
                                            () => setData(data.filter((elementoDiv, currentIndex) => index != currentIndex))
                                    }></i>
                                </div>
                            </div>
                        ))
                    } </div>
                    {/* <div id="contenedorData">
                        <p className="text-light mt-3">Faltan por realizar {
                            data.length
                        }
                            &nbsp;tareas</p>
                    </div> */}

                    {/* <button onClick={deleteItem}
                        className="btn btn-warning"
                        type="button"
                        id="button-addon1">Borrar Todo</button> */}
                </div>
            </div>
        </div>
    );
};
export default Home;
