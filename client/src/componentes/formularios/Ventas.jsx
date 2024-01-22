import React, { useEffect, useState } from "react";
import Input from "../inputs/Input";
import { Link } from "react-router-dom";
import { SolicitudProduccion } from "../../modelos/solicitud_produccion";
import { Productos } from "../../modelos/productos";
import Autocomplete from "../inputs/Autocomplete";
import { linkData } from "../../server/Server";

function Ventas() {
  const [solicitudesProduccion, setSolicitudesProduccion] = useState([]);
  const [id, setId] = useState([]);
  const [fecha, setFecha] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidadKg, setCantidadKg] = useState("");
  const [productos, setProductos] = useState([]);
  const [precio, setPrecio] = useState("");
  const [tableData, setTableData] = useState([]);

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
    SolicitudProduccion.fetchData().then((data) => {
      setSolicitudesProduccion(data);
    });
  };

  useEffect(() => {
    SolicitudProduccion.fetchData().then((data) => {
      setSolicitudesProduccion(data);
    });

    Productos.fetchData().then((data) => {
      setProductos(data);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (solicitudesProduccion && productos) {
        const data = await linkData(
          solicitudesProduccion,
          productos,
          "producto",
          "nombre"
        );
        setTableData(data);
      }
    };

    fetchData();
  }, [solicitudesProduccion, productos]);

  const productosOptions = productos.map((producto) => ({
    label: producto.nombre,
    value: producto._id,
  }));

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
          placeholder={"Id"}
          name="id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Autocomplete
          options={productosOptions}
          onOptionSelected={(option) => setProducto(option.value)}
          placeholder={"Producto"}
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

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Guardar
        </button>
      </form>
      <div className="flex flex-col gap-16">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="font-semibold text-left px-4 py-3">fecha</th>
                <th className="font-semibold text-left px-4 py-3">id</th>
                <th className="font-semibold text-left px-4 py-3">producto</th>
                <th className="font-semibold text-left px-4 py-3">
                  cantidad kg
                </th>
                <th className="font-semibold text-left px-4 py-3">precio</th>
              </tr>
            </thead>
            <tbody>
              {solicitudesProduccion &&
                tableData.map((sp) => (
                  <tr
                    key={sp._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-4 py-3">{sp.fecha}</td>
                    <td className="px-4 py-3">{sp.id}</td>
                    <td className="px-4 py-3">{sp.producto}</td>
                    <td className="px-4 py-3">{sp.cantidad_kg}</td>
                    <td className="px-4 py-3">{sp.precio}</td>
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
