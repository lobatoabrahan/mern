import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  const fetchProducto = async (id) => {
    const response = await fetch(`http://192.168.0.112:3000/api/mp/${id}`);
    const producto = await response.json();
    return producto;
  };

  useEffect(() => {
    // Aquí debes reemplazar esta función con la que uses para obtener los detalles del producto
    fetchProducto(id).then((producto) => setProducto(producto));
  }, [id]);

  if (!producto) {
    return "Cargando...";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50 dark:bg-gray-900">
      <div className="relative overflow-x-auto w-1/2 rounded-lg dark:bg-slate-800 mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {producto &&
                Object.keys(producto).map((key) => (
                  <th scope="col" className="px-6 py-3" key={key}>
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {producto &&
                Object.values(producto).map((value, index) => (
                  <td className="px-6 py-4" key={index}>
                    {value}
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetalleProducto;
