import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate , useLocation} from "react-router-dom";
import Navigation from "./Navigation";
import Geocode from "react-geocode";

const EnviarPaquete = () => {
  const [cliente_id, setIdcliente] = useState(0);
  const [salida, setSalida] = useState("");
  const [llegada, setLlegada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [valor_paquete, setValorPaquete] = useState(0);
  const [precio_envio, setPrecioEnvio] = useState(0);

  const navigate = useNavigate();
  const apiUrl = "http://127.0.0.1:8000/api/paquetes"
  const apiUrlCliente = "http://127.0.0.1:8000/api/clientes"
  const [clientes, setClientes] = useState()
  const fetchApi = async () => {
    const response = await fetch(apiUrlCliente)
    
    const responseJson = await response.json()
    setClientes(responseJson)
  }
  useEffect(() => {
    fetchApi()
  }, [])
  Geocode.setApiKey("AIzaSyCA3qrymzUCTQW0T8xsLb4UX_WPYKE3J9Q");
  navigator.geolocation.getCurrentPosition(function(position) {
    Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        setSalida(address)
      },
      (error) => {
        console.error(error);
      }
    );
  });




  const store = async (e) => {
    e.preventDefault();

    const res = await axios.post(apiUrl, {
      cliente_id,
      salida,
      llegada,
      descripcion,
      valor_paquete,
      precio_envio,
    });

    console.log(res.data.message);
    if (res.data.message === "Paquete agregado correctamente") {
      alert(res.data.message);
      navigate("/");
    } else {
      alert("Por favor llene correctamente los campos" + res.data.message);
    }
  };
  return (
    <div>
    <Navigation/>
    <h3 className="m-4">Registrar un nuevo Paquete</h3>
      <div className="card m-4 p-4">
        <form onSubmit={store}>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              type="text"
              className="form-control"
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Origen</label>
            <input
              value={salida}
              onChange={(e) => setSalida(e.target.value)}
              type="text"
              className="form-control"
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Destino</label>
            <input
              value={llegada}
              onChange={(e) => setLlegada(e.target.value)}
              type="text"
              className="form-control"
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Valor del Paquete</label>
            <input
              value={valor_paquete}
              onChange={(e) => setValorPaquete(e.target.value)}
              type="number"
              className="form-control"
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Precio del Envío</label>
            <input
              value={precio_envio}
              onChange={(e) => setPrecioEnvio(e.target.value)}
              type="number"
              className="form-control"
              required
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Cliente</label>
            {
              !clientes ? <input
                value={cliente_id}
                onChange={(e) => setIdcliente(e.target.value)}
                type="number"
                className="form-control"
                required
              ></input> : <select
                className="form-control"
                onChange={(e) => setIdcliente(e.target.value)}
              >
                <option selected>Seleccione una Cliente</option>
              {
                clientes.map((cliente,index) => (
                  <option value={cliente.id}>{cliente.nombre}</option>
                ))
              }                
              </select>
            }
          </div>
          <button type="submit" className="btn btn-primary">
            Registrar Paquete
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnviarPaquete;
