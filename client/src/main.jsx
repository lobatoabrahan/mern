import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistroMP from "./componentes/formularios/RegistroMP";
import "./index.css";
import ProductoMP from "./componentes/productos/ProductoMP";
import FormularioOrdenesCompra from "./componentes/formularios/FormularioOrdenesCompra";
import Inventario from "./componentes/formularios/Inventario";
import Ventas from "./componentes/formularios/ventas";
import OrdenProduccion from "./componentes/formularios/OrdenProduccion";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/materia_prima" element={<RegistroMP />} />
        <Route path="/materia_prima/:id" element={<ProductoMP />} />
        <Route path="/orden_compra" element={<FormularioOrdenesCompra />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/orden_produccion" element={<OrdenProduccion />} />
        {/* Añade más rutas según sea necesario */}
      </Routes>
    </Router>
  </React.StrictMode>
);