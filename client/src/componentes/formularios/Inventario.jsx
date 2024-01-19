import React, { useEffect, useState } from "react";
import { Inventario } from "../../modelos/inventario";
import Input from "../inputs/Input";
import { Link } from "react-router-dom";
import { OrdenCompra } from "../../modelos/orden_compra";

function RegistroMP() {
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("");
  const [idOrdenCompra, setIdOrdenCompra] = useState("");
  const [estatusOrdenCompra, setEstatusOrdenCompra] = useState("");
  const [cantidadKg, setCantidadKg] = useState("");
  const [ordenCompra, setOrdenCompra] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      fecha: fecha,
      tipo: tipo,
      idOrdenCompra: idOrdenCompra,
      cantidadKg: cantidadKg,
    };

    console.log(JSON.stringify(data));

    const newOrdenCompraData = {
      ...ordenCompra,
      estatus: estatusOrdenCompra,
    };

    setOrdenCompra(newOrdenCompraData);

    const newOrdenCompra = new OrdenCompra(newOrdenCompraData);
    newOrdenCompra.editData(ordenCompra._id).then((data) => {
      console.log(data);
      fetch("http://192.168.0.112:3000/api/ordenes_compra") // reemplace 'URL_DE_API' con la URL de su API
        .then((response) => response.json())
        .then((data) => setOrdenesCompra(data));
    });

    const newInventario = new Inventario(data);
    newInventario.addData().then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    fetch("http://192.168.0.112:3000/api/ordenes_compra") // reemplace 'URL_DE_API' con la URL de su API
      .then((response) => response.json())
      .then((data) => setOrdenesCompra(data));

    fetch("http://192.168.0.112:3000/api/mp") // reemplace 'URL_DE_API' con la URL de su API
      .then((response) => response.json())
      .then((data) => {
        const map = {};
        data.forEach((materiaPrima) => {
          map[materiaPrima._id] = materiaPrima.nombre;
        });
        setMateriasPrimas(map);
      });

    fetch("http://192.168.0.112:3000/api/inventario") // reemplace 'URL_DE_API' con la URL de su API
      .then((response) => response.json())
      .then((data) => setInventario(data));
  }, []);

  const handleButtonClick = (id) => {
    fetch(`http://192.168.0.112:3000/api/ordenes_compra/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrdenCompra(data);
        setIdOrdenCompra(data._id);
        setEstatusOrdenCompra(data.estatus);
        // Aquí puedes manejar los datos obtenidos
      });
  };

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
          placeholder={"Tipo"}
          name="tipo"
          type="text"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
        <Input
          placeholder={"Estatus Orden de Compra"}
          name="estatusOrdenCompra"
          type="text"
          value={estatusOrdenCompra}
          onChange={(e) => setEstatusOrdenCompra(e.target.value)}
        />
        <Input
          placeholder={"Cantidad Kg"}
          name="cantidadKg"
          type="number"
          value={cantidadKg}
          onChange={(e) => setCantidadKg(e.target.value)}
        />

        <input type="submit" value="Enviar" />
      </form>
      <div className="flex flex-col gap-16">
        <div className="relative overflow-x-auto w-1/2 rounded-lg dark:bg-slate-800 mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th>Materia Prima</th>
                <th>Proveedor</th>
                <th>Cantidad Kg</th>
                <th>estatus</th>
                <th>accion</th>
                {/* agregue más columnas según sea necesario */}
              </tr>
            </thead>
            <tbody>
              {ordenesCompra.map((orden) => (
                <tr key={orden._id}>
                  <td>{materiasPrimas[orden.materia_prima]}</td>
                  <td>{orden.proveedor}</td>
                  <td>{orden.cantidad_kg}</td>
                  <td>{orden.estatus}</td>
                  <td>
                    <button onClick={() => handleButtonClick(orden._id)}>
                      Obtener datos
                    </button>
                  </td>
                  {/* agregue más celdas según sea necesario */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="relative overflow-x-auto w-1/2 rounded-lg dark:bg-slate-800 mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {Object.keys(inventario[0] || {}).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventario.map((item, index) => (
                <tr key={index}>
                  {Object.keys(item).map((key) => (
                    <td key={key}>{item[key]}</td>
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
