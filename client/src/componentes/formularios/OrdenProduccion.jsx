import React, { useEffect, useState } from "react";
import Input from "../inputs/Input";
import { Link } from "react-router-dom";
import { SolicitudProduccion } from "../../modelos/solicitud_produccion";
import { OrdenesProduccion } from "../../modelos/orden_produccion";
import { Productos } from "../../modelos/productos";
import { linkData } from "../../server/Server";

function OrdenProduccion() {
  const [solicitudesProduccionData, setSolicitudesProduccionData] = useState(
    []
  );
  const [ordenesProduccionData, setOrdenesProduccionData] = useState([]);
  const [productosData, setProductosData] = useState([]);
  const [tablaVentasData, setTablaVentasData] = useState([]);
  const [tablaOrdenesProduccionData, setTablaOrdenesProduccionData] = useState(
    []
  );
  const [idSolicitudProduccion, setIdSolicitudProduccion] = useState("");
  const [formularioReceta, setFormularioReceta] = useState(true);

  const [fecha, setFecha] = useState("");
  const [idSP, setIdSP] = useState("");
  const [recetas, setRecetas] = useState([{ material: "", cantidad: "" }]);

  const handleInputChange = (index, event) => {
    const values = [...recetas];
    if (event.target.name === "material") {
      values[index].material = event.target.value;
    } else {
      values[index].cantidad = event.target.value;
    }
    setRecetas(values);
  };

  const handleAddFields = () => {
    setRecetas([...recetas, { material: "", cantidad: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      fecha: fecha,
      receta: recetas,
      id_solicitud_produccion: idSolicitudProduccion,
    };

    console.log(JSON.stringify(data));

    const newOrdenProduccion = new OrdenesProduccion(data);
    newOrdenProduccion.addData().then((data) => {
      console.log(data);
    });

    SolicitudProduccion.addProperties({
      estado: "en produccion",
      receta: recetas,
    }).then((data) => {
      console.log(data);
    });

    SolicitudProduccion.fetchData().then((data) => {
      setSolicitudesProduccionData(data);
    });

    OrdenesProduccion.fetchData().then((data) => {
      setOrdenesProduccionData(data);
    });
  };

  useEffect(() => {
    SolicitudProduccion.fetchData().then((data) => {
      setSolicitudesProduccionData(data);
    });

    OrdenesProduccion.fetchData().then((data) => {
      setOrdenesProduccionData(data);
    });

    Productos.fetchData().then((data) => {
      setProductosData(data);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (solicitudesProduccionData && productosData) {
        const data = await linkData(
          solicitudesProduccionData,
          productosData,
          "producto",
          "nombre"
        );
        setTablaVentasData(data);
      }
    };

    fetchData();
  }, [solicitudesProduccionData, productosData]);

  useEffect(() => {
    const fetchData = async () => {
      if (ordenesProduccionData && solicitudesProduccionData) {
        const data = await linkData(
          ordenesProduccionData,
          solicitudesProduccionData,
          "id_solicitud_produccion",
          "id"
        );
        setTablaOrdenesProduccionData(data);
      }
    };

    fetchData();
  }, [ordenesProduccionData, solicitudesProduccionData]);

  return (
    <>
      <div className="flex flex-col gap-16 h-screen">
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
                <th className="font-semibold text-left px-4 py-3">acciones</th>
              </tr>
            </thead>
            <tbody>
              {tablaVentasData &&
                tablaVentasData.map((sp) => (
                  <tr
                    key={sp._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-4 py-3">{sp.fecha}</td>
                    <td className="px-4 py-3">{sp.id}</td>
                    <td className="px-4 py-3">{sp.producto}</td>
                    <td className="px-4 py-3">{sp.cantidad_kg}</td>
                    <td className="px-4 py-3">{sp.precio}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setIdSolicitudProduccion(sp._id);
                          setIdSP(sp.id);
                          setFormularioReceta(true);
                        }}
                      >
                        Mostrar formulario
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div
          className={`${
            formularioReceta ? "" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex bg-black bg-opacity-50`}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Añadir receta
                </h3>
                <button
                  onClick={() => {
                    setFormularioReceta(false);
                  }}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="submit">
                  <Input
                    placeholder={"Id"}
                    name="id"
                    type="text"
                    value={idSP}
                    onChange={(e) => setIdSP(e.target.value)}
                    readonly
                  />
                  <Input
                    placeholder={"Fecha"}
                    type="date"
                    name={"fecha"}
                    onChange={(e) => setFecha(e.target.value)}
                    value={fecha}
                  />
                  <div className="flex flex-col gap-2">
                    {recetas.map((receta, index) => (
                      <div key={index} className="flex gap-4">
                        <Input
                          placeholder={"Material"}
                          type="text"
                          name={"material"}
                          value={receta.material}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        <Input
                          placeholder={"Cantidad"}
                          type="number"
                          name={"cantidad"}
                          value={receta.cantidad}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddFields}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Añadir Material
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="font-semibold text-left px-4 py-3">fecha</th>
                <th className="font-semibold text-left px-4 py-3">
                  id solicitud produccion
                </th>
                <th className="font-semibold text-left px-4 py-3">receta</th>
              </tr>
            </thead>
            <tbody>
              {ordenesProduccionData &&
                tablaOrdenesProduccionData.map((op) => (
                  <tr
                    key={op._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-4 py-3">{op.fecha}</td>
                    <td className="px-4 py-3">{op.id_solicitud_produccion}</td>
                    <td>
                      {op.receta.map((receta, index) => (
                        <div key={index}>
                          {receta.material} - {receta.cantidad} kg
                        </div>
                      ))}
                    </td>{" "}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OrdenProduccion;
