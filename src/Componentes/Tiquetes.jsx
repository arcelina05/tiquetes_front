import { useEffect, useState } from "react";
import "../Styles/Tiquetes.css";
import Swal from "sweetalert2";


function Tiquetes() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [paisesOrigen, setPaisesOrigen] = useState([]);
  const [paisesDestino, setPaisesDestino] = useState([]);

  const cargarReservas = async () => {
    let data = await fetch("http://localhost:4000/v1/tiquetes/listar-reservas")
      .then((data) => data.json())
      .then((res) => res);
    console.log(data);
    setReservas(data.reverse())
  };

  const guardarReservas = async (e) => {
    e.preventDefault();
    let datosReservas = {
      origen: origen,
      destino: destino,
      fecha: fecha,
    };

    fetch("http://localhost:4000/v1/tiquetes/guardar-reservas", {
      method: "POST",
      body: JSON.stringify(datosReservas),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) =>      Swal.fire({
        title: "",
        text:`${response.mensaje}`,
        icon: "error"
      }))
      .then((response) => {
        cargarReservas();
       let icon= response.creado == "si"? "success": "warning" ;
        Swal.fire({
          title: "",
          text:`${response.mensaje}`,
          icon: icon
          

        
        });
      
        setOrigen("")
        setDestino("")
        setFecha("")
        setPaisesDestino([])
        setPaisesOrigen([])

      });
  };
  const handleOrigenChange = async (event) => {
    const value = event.target.value;
    setOrigen(value);
    console.log(value);

    // Si el valor del campo de entrada está vacío, no hagas la solicitud
    if (value.trim() === "") {
      setPaisesOrigen([]);
      return;
    }

    console.log(event.target.value);
    fetch("http://localhost:4000/v1/tiquetes/buscar-paises", {
      method: "POST",
      body: JSON.stringify({ buscar: value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setPaisesOrigen(response);
      });
  };

  const handleDestinoChange = (event) => {
    const value = event.target.value;
    setDestino(value);
    console.log(value);

    // Si el valor del campo de entrada está vacío, no hagas la solicitud
    if (value.trim() === "") {
      setPaisesDestino([]);
      return;
    }
    console.log(event.target.value);
    fetch("http://localhost:4000/v1/tiquetes/buscar-paises", {
      method: "POST",
      body: JSON.stringify({ buscar: value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setPaisesDestino(response);
      });
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const paisDestinoSelec = (pais) => {
    setDestino(pais.name);
    setPaisesDestino([]);
  };

  const paisOrigenSelec = (pais) => {
    setOrigen(pais.name);
    setPaisesOrigen([]);
  };

  useEffect(() => {
    cargarReservas();
  }, []);




  return (
    <div className="container">
      <h1 id="txt">Aerolinea LA</h1>
      <div className="container2">
        <form className='row' onSubmit={guardarReservas}>
          <div className="col-4">
            <input
              type="text"
              className="texto"
              placeholder="Pais de origen"
              value={origen}
              onChange={handleOrigenChange}
            />
            <ul>
              {paisesOrigen.length > 0
                ? paisesOrigen.map((paisOrigen) => (
                    <li onClick={() => paisOrigenSelec(paisOrigen)}>
                      {paisOrigen.name}
                    </li>
                  ))
                : ""}
            </ul>
          </div>
          <div className="col-4">
            <input
              type="text"
              className="texto"
              placeholder="Pais de destino"
              value={destino}
              onChange={handleDestinoChange}
            />
            <ul>
              {paisesDestino.length > 0
                ? paisesDestino.map((paisDestino) => (
                    <li onClick={() => paisDestinoSelec(paisDestino)}>
                      {paisDestino.name}
                    </li>
                  ))
                : ""}
            </ul>
          </div>
          <div className="col-4">
          <input
            type="date"
            className="texto"
            placeholder="Fecha del viaje"
            onChange={handleFechaChange}
          />
          <input 
            type="submit"
            className="btnEnviar"
            value="Guardar" 
            />
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-primary table-sm">
            <thead>
              <tr>
                <th scope="col">Origen</th>
                <th scope="col">Destino</th>
                <th scope="col">Fecha del Viaje</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr>
                  <td>{reserva.origen} </td>
                  <td>{reserva.destino} </td>
                  <td> {reserva.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tiquetes;
