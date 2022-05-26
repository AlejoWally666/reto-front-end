import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MostrarPaquetes from "./components/ListaPaquetes";
import EnviarPaquete from "./components/RegistrarPaquete";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MostrarPaquetes />} />
          <Route path="/nuevo" element={<EnviarPaquete />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;