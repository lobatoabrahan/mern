import React, { useEffect, useState } from "react";
import Input from "../inputs/Input";
import { Link } from "react-router-dom";
import { SolicitudProduccion } from "../../modelos/solicitud_produccion";

function Ventas() {
  const [solicitudesProduccion, setSolicitudesProduccion] = useState([]);
  const [id, setId] = useState([]);
  const [fecha, setFecha] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidadKg, setCantidadKg] = useState("");
  const [productos, setProductos] = useState([]);
  const [precio, setPrecio] = useState("");
  const [nombresProductos, setNombresProductos] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      fecha: fecha,
      producto: producto,
      id: id,
      cantidad_kg: cantidadKg,
      precio: precio,
    };

    console.log(JSON.stringify(data));

    const newSolicitudProduccion = new SolicitudProduccion(data);
    newSolicitudProduccion.addData().then((data) => {
      console.log(data);
    });
    fetch("http://192.168.0.112:3000/api/solicitud_produccion") // reemplace 'URL_DE_API' con la URL de su API
      .then((response) => response.json())
      .then((data) => setSolicitudesProduccion(data));
  };

  useEffect(() => {
    fetch("http://192.168.0.112:3000/api/solicitud_produccion") // reemplace 'URL_DE_API' con la URL de su API
      .then((response) => response.json())
      .then((data) => setSolicitudesProduccion(data));

    fetch("http://192.168.0.112:3000/api/productos") // reemplace 'URL_DE_API' con la URL de su API
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        console.log(data);
      });

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
        <select
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="materia_prima"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        >
          <option value="" disabled>
            Seleccione un producto
          </option>
          {productos.map((p) => (
            <option key={p._id} value={p._id}>
              {p.nombre}
            </option>
          ))}
        </select>
        <Input
          placeholder={"ID"}
          name="id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          placeholder={"Cantidad Kg"}
          name="cantidad Kg"
          type="number"
          value={cantidadKg}
          onChange={(e) => setCantidadKg(e.target.value)}
        />
        <Input
          placeholder={"Precio"}
          name="precio"
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <input type="submit" value="Enviar" />
      </form>
      <div className="flex flex-col gap-16">
        <div className="relative overflow-x-auto w-1/2 rounded-lg dark:bg-slate-800 mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {Object.keys(solicitudesProduccion[0] || {}).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {solicitudesProduccion.map((item, index) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Ventas;
