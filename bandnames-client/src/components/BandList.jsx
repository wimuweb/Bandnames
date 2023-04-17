import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const [bandas, setBandas] = useState([]);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on("bandList", (bands) => {
      setBandas(bands);
    });
    return () => socket.off("bandList");
  }, [socket]);

  const cambioNombre = (e, id) => {
    const nuevoNombre = e.target.value;
    setBandas((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }
        return band;
      })
    );
  };

  const onPerdioFoco = (id, nombre) => {
    socket.emit("cambiar-nombre-banda", { id, nombre });
  };

  const votar = (id) => {
    socket.emit("votar-banda", id);
  };

  const borrar = (id) => {
    socket.emit("borrar-banda", id);
  };

  const crearRows = () => {
    return bandas.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => votar(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={band.name}
            onChange={(e) => cambioNombre(e, band.id)}
            onBlur={() => onPerdioFoco(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => borrar(band.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};
