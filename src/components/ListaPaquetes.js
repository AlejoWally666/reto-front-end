import React, { useEffect,useState} from "react";
import Navigation from "./Navigation";


const MostrarPaquetes = () => {
  const apiUrl = "http://127.0.0.1:8000/api/paquetes"
  const [paquetes, setPaquetes]=useState()
  
  const fetchApi = async ()=> {
    const response = await fetch(apiUrl)
    const responseJson = await response.json()
    setPaquetes(responseJson)
  }
  useEffect(() => {
    fetchApi()
  },[])
  
  return (
    <div>
      <Navigation/>
      <div className="mt-4">
        {
          !paquetes ? 'Cargando Paquetes ...':
          <table className="table table-striped">
          <thead className="bg-success text-white">
            <tr>
              <th>Id</th>              
              <th>Descripción</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Cliente</th>
              <th>Fecha de Registro</th>
            </tr>
          </thead>
          <tbody>
          {
          !paquetes ?<tr key="">
          <td>""</td>
          <td>""</td>
          <td>""</td>
          <td>""</td>
          <td>""</td>
          <td>""</td>
        </tr> :
            paquetes.map((paquete,index) => (
              <tr key={paquete.id}>
                <td>{paquete.id}</td>
                <td>{paquete.descripcion}</td>
                <td>{paquete.salida}</td>
                <td>{paquete.llegada}</td>
                <td>{paquete.cliente}</td>
                <td>{paquete.created_at.split("T")[0]}</td>
              </tr>
            ))
}
          </tbody>
        </table>
        }
      </div>
    </div>
  );
};
export default MostrarPaquetes;
