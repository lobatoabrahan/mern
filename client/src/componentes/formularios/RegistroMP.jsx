import React, { useEffect, useState } from "react";
import { MP } from "../../modelos/mp";
import Input from "../inputs/Input";
import { Link } from "react-router-dom";

function RegistroMP() {
  const [data, setData] = useState(null);
  const [addFormData, setAddFormData] = useState({});
  const [editFormData, setEditFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // Nuevo estado

  // Leer datos de una colección
  const fetchData = (collectionName) => {
    fetch(`http://localhost:3000/api/${collectionName}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchData("mp"); // Reemplaza 'mp' con el nombre de la colección que quieras leer
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
    const mp = new MP(addFormData);
    mp.addData().then((data) => {
      console.log(data);
      fetchData("mp"); // Fetch data again after adding new data
    });
    setAddFormData({});
    setShowAddForm(false); // Ocultar el formulario de agregar después de enviar
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const mp = new MP(editFormData);
    mp.editData(currentId).then((data) => {
      console.log(data);
      fetchData("mp"); // Fetch data again after adding new data
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
            placeholder={"Nombre"}
            name="nombre"
            type="text"
            value={addFormData.nombre || ""}
            onChange={handleAddChange}
          />
          <Input
            placeholder={"Proveedor"}
            name="proveedor"
            type="text"
            value={addFormData.proveedor || ""}
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
            placeholder={"Densidad"}
            name="densidad"
            type="text"
            value={editFormData.densidad || ""}
            onChange={handleEditChange}
          />
          <Input
            placeholder={"Nombre"}
            name="nombre"
            type="text"
            value={editFormData.nombre || ""}
            onChange={handleEditChange}
          />
          <Input
            placeholder={"Proveedor"}
            name="proveedor"
            type="text"
            value={editFormData.proveedor || ""}
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
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Proveedor
              </th>
              <th scope="col" className="px-6 py-3">
                Accion
              </th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4">
                    <Link to={`/materia_prima/${item._id}`}>{item.nombre}</Link>
                  </td>
                  <td className="px-6 py-4">{item.proveedor}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
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
