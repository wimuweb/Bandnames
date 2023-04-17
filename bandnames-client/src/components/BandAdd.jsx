import { useContext, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const [valor, setValor] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (valor.trim().length > 0) {
      // TODO: llamar la funcion para emitir elevento
      socket.emit("crear-banda", valor);
      setValor("");
    }
  };
  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </form>
    </>
  );
};
