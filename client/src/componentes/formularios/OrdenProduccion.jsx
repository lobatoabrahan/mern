import React, { useEffect, useState } from "react";
import Input from "../inputs/Input";
import { Link } from "react-router-dom";
import { SolicitudProduccion } from "../../modelos/solicitud_produccion";
import { OrdenesProduccion } from "../../modelos/orden_produccion";

function RegistroMP() {
  const [solicitudesProduccion1, setSolicitudesProduccion1] = useState([]);
  const [solicitudesProduccion, setSolicitudesProduccion] = useState([]);
  const [ordenesProduccion, setOrdenesProduccion] = useState([]);
  const [fecha, setFecha] = useState("");
  const [idSolicitudProduccion, setIdSolicitudProduccion] = useState("");
  const [solicitudProduccion, setSolicitudProduccion] = useState(null);
  const [ingredientes, setIngredientes] = useState([
    { nombre: "", cantidad: "" },
  ]);
  const [nombresProductos, setNombresProductos] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      fecha: fecha,
      idSolicitudProduccion: idSolicitudProduccion,
      ingredientes: ingredientes,
    };

    console.log(JSON.stringify(data));

    const newSolicitudOrdenProduccion = {
      ...solicitudProduccion,
      receta: ingredientes,
    };

    setSolicitudProduccion(newSolicitudOrdenProduccion);

    const newSolicitudProduccion = new SolicitudProduccion(
      newSolicitudOrdenProduccion
    );
    newSolicitudProduccion.editData(solicitudProduccion._id).then((data) => {
      console.log(data);
      fetch("http://192.168.0.112:3000/api/solicitud_produccion") // reemplace 'URL_DE_API' con la URL de su API
        .then((response) => response.json())
        .then((data) => setSolicitudesProduccion1(data));
    });

    const newOrdenProduccion = new OrdenesProduccion(data);
    newOrdenProduccion.addData().then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    fetch("http://192.168.0.112:3000/api/solicitud_produccion") // reemplace 'URL_DE_API' con la URL de su API
      .then((response) => response.json())
      .then((data) => setSolicitudesProduccion1(data));

    fetch("http://192.168.0.112:3000/api/solicitud_produccion") // reemplace 'URL_DE_API' con la URL de su API
      .then((response) => response.json())
      .then((data) => {
        const map = {};
        data.forEach((solicitudProduccion) => {
          map[solicitudProduccion._id] = solicitudProduccion.nombre;
        });
        setSolicitudesProduccion(map);
      });

    fetch("http://192.168.0.112:3000/api/ordenes_produccion") // reemplace 'URL_DE_API' con la URL de su API
      .then((response) => response.json())
      .then((data) => setOrdenesProduccion(data));

    fetch("http://192.168.0.112:3000/api/productos")
      .then((response) => response.json())
      .then((data) => {
        const nombres = {};
        data.forEach((producto) => {
          nombres[producto._id] = producto.nombre;
        });
        setNombresProductos(nombres);
      });
  }, []);

  const handleButtonClick = (id) => {
    fetch(`http://192.168.0.112:3000/api/solicitud_produccion/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSolicitudProduccion(data);
        setIdSolicitudProduccion(data.id);
        // Aquí puedes manejar los datos obtenidos
      });
  };

  function handleIngredientChange(e, index) {
    const updatedIngredients = [...ingredientes];
    updatedIngredients[index][e.target.name] = e.target.value;
    setIngredientes(updatedIngredients);
  }

  function handleAddIngredient() {
    setIngredientes([...ingredientes, { nombre: "", cantidad: "" }]);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <Input
          placeholder={"Fecha"}
          name="fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <Input
          placeholder={"ID"}
          name="id"
          type="text"
          value={idSolicitudProduccion}
          onChange={(e) => setIdSolicitudProduccion(e.target.value)}
          readOnly
        />

        {ingredientes.map((ingrediente, index) => (
          <div className="flex gap-4" key={index}>
            <Input
              placeholder={"Nombre del ingrediente"}
              name="nombre"
              type="text"
              value={ingrediente.nombre}
              onChange={(e) => handleIngredientChange(e, index)}
            />
            <Input
              placeholder={"Cantidad del ingrediente"}
              name="cantidad"
              type="text"
              value={ingrediente.cantidad}
              onChange={(e) => handleIngredientChange(e, index)}
            />
          </div>
        ))}

        <button type="button" onClick={handleAddIngredient}>
          Añadir ingrediente
        </button>

        <input type="submit" value="Enviar" />
      </form>
      <div className="flex flex-col gap-16">
        <div className="relative overflow-x-auto w-1/2 rounded-lg dark:bg-slate-800 mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {Object.keys(solicitudesProduccion1[0] || {}).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {solicitudesProduccion1.map((item, index) => (
                <tr key={index}>
                  {Object.keys(item).map((key) => (
                    <td key={key}>
                      {key === "producto"
                        ? nombresProductos[item[key]]
                        : typeof item[key] === "object"
                        ? item[key]
                            .map((obj, i) =>
                              Object.entries(obj)
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(", ")
                            )
                            .join(", ")
                        : item[key]}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => handleButtonClick(item._id)}>
                      Obtener datos
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="relative overflow-x-auto w-1/2 rounded-lg dark:bg-slate-800 mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {Object.keys(ordenesProduccion[0] || {}).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ordenesProduccion.map((item, index) => (
                <tr key={index}>
                  {Object.keys(item).map((key) => (
                    <td key={key}>
                      {typeof item[key] === "object"
                        ? item[key]
                            .map((obj, i) =>
                              Object.entries(obj)
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(", ")
                            )
                            .join(", ")
                        : item[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RegistroMP;
