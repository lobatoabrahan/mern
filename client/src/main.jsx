import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistroMP from "./componentes/formularios/RegistroMP";
import "./index.css";
import ProductoMP from "./componentes/productos/ProductoMP";
import FormularioOrdenesCompra from "./componentes/formularios/FormularioOrdenesCompra";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/materia_prima" element={<RegistroMP />} />
        <Route path="/materia_prima/:id" element={<ProductoMP />} />
        <Route path="/orden_compra" element={<FormularioOrdenesCompra />} />
        {/* Añade más rutas según sea necesario */}
      </Routes>
    </Router>
  </React.StrictMode>
);