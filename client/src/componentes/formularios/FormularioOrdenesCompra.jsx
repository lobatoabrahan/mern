import React, { useEffect, useState } from "react";
import{ OrdenCompra } from "../../modelos/orden_compra";
import Input from "../inputs/Input";
import { Link } from "react-router-dom";

function RegistroMP() {
  const [data, setData] = useState(null);
  const [addFormData, setAddFormData] = useState({});
  const [editFormData, setEditFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // Nuevo estado
  const [materiasPrimas, setMateriasPrimas] = useState([]);

  useEffect(() => {
    const fetchMateriasPrimas = async () => {
      const response = await fetch("http://192.168.0.112:3000/api/mp");
      const materiasPrimasData = await response.json();
      setMateriasPrimas(materiasPrimasData);
    };

    fetchMateriasPrimas();
  }, []);

  // ...

  // Leer datos de una colección
  const fetchData = (collectionName) => {
    fetch(`http://192.168.0.112:3000/api/${collectionName}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchData("ordenes_compra"); // Reemplaza 'mp' con el nombre de la colección que quieras leer
  }, []);

  const handleAddChange = (event) => {
    setAddFormData({
      ...addFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditChange = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();
    const mp = new OrdenCompra({
      ...addFormData,
      estado: "pendiente recibir",
    });
    mp.addData().then((data) => {
      console.log(data);
      fetchData("ordenes_compra"); // Fetch data again after adding new data
    });
    setAddFormData({});
    setShowAddForm(false); // Ocultar el formulario de agregar después de enviar
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const ordenCompra = new OrdenCompra(editFormData);
    ordenCompra.editData(currentId).then((data) => {
      console.log(data);
      fetchData("ordenes_compra"); // Fetch data again after adding new data
    });
    setEditFormData({});
    setEditMode(false);
    setCurrentId(null);
  };

  const handleEdit = (item) => {
    setEditFormData(item);
    setEditMode(true);
    setCurrentId(item._id);
  };

  return (
    <div className="">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => setShowAddForm(true)}
      >
        Añadir entrada
      </button>{" "}
      {/* Nuevo botón */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="max-w-sm mx-auto">
          <Input
            placeholder={"Fecha"}
            name="fecha"
            type="date"
            value={addFormData.fecha || ""}
            onChange={handleAddChange}
          />
          <Input
            placeholder={"Proveedor"}
            name="proveedor"
            type="text"
            value={addFormData.proveedor || ""}
            onChange={handleAddChange}
          />
          <select
            className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="materia_prima"
            value={addFormData.materia_prima || ""}
            onChange={handleAddChange}
          >
            <option value="">Seleccione una Materia Prima</option>
            {materiasPrimas.map((materiaPrima) => (
              <option key={materiaPrima._id} value={materiaPrima._id}>
                {materiaPrima.nombre}
              </option>
            ))}
          </select>
          <Input
            placeholder={"Precio"}
            name="precio"
            type="number"
            step="0.01"
            value={addFormData.precio || ""}
            onChange={handleAddChange}
          />
          <Input
            placeholder={"Cantidad Kg"}
            name="cantidad_kg"
            type="number"
            step="0.01"
            value={addFormData.cantidad_kg || ""}
            onChange={handleAddChange}
          />
          {/* Agrega aquí los campos adicionales para el formulario de agregar */}
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            Añadir Datos
          </button>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => setShowAddForm(false)}
          >
            X
          </button>
        </form>
      )}
      {editMode && (
        <form onSubmit={handleEditSubmit} className="max-w-sm mx-auto">
          <Input
            placeholder={"Fecha"}
            name="fecha"
            type="date"
            value={addFormData.fecha || ""}
            onChange={handleEditChange}
          />
          <Input
            placeholder={"Proveedor"}
            name="proveedor"
            type="text"
            value={addFormData.proveedor || ""}
            onChange={handleEditChange}
          />
          <Input
            placeholder={"Materia Prima"}
            name="materia_prima"
            type="text"
            value={addFormData.materia_prima || ""}
            onChange={handleEditChange}
          />
          <Input
            placeholder={"Cantidad Kg"}
            name="cantidad_kg"
            type="number"
            step="0.01"
            value={addFormData.cantidad_kg || ""}
            onChange={handleEditChange}
          />
          {/* Agrega aquí los campos adicionales para el formulario de edición */}

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            Editar Datos
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
            onClick={() => setEditMode(false)}
          >
            X
          </button>
        </form>
      )}
      <div className="relative overflow-x-auto w-1/2 rounded-lg dark:bg-slate-800 mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Proveedor
              </th>
              <th scope="col" className="px-6 py-3">
                Materia Prima
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item) => {
                const materiaPrima = materiasPrimas.find(
                  (materiaPrima) => materiaPrima._id === item.materia_prima
                );
                return (
                  <tr key={item._id}>
                    <td className="px-6 py-4">{item.fecha}</td>
                    <td className="px-6 py-4">{item.proveedor}</td>
                    <td className="px-6 py-4">
                      {materiaPrima ? (
                        <Link to={`/materia_prima/${materiaPrima._id}`}>
                          {materiaPrima.nombre}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4">{item.precio}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>cargando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegistroMP;
