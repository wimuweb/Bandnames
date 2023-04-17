const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");

      // Emitir al cliente conectado, todas la bandas actuales
      socket.emit("bandList", this.bandList.getBands());

      // Votar por la banda
      socket.on("votar-banda", (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit("bandList", this.bandList.getBands());
      });

      //   Borrar banda
      socket.on("borrar-banda", (id) => {
        this.bandList.removeBand(id);
        this.io.emit("bandList", this.bandList.getBands());
      });

      // Cambiar nombre banda
      socket.on("cambiar-nombre-banda", ({ id, nombre }) => {
        this.bandList.changeName(id, nombre);
        this.io.emit("bandList", this.bandList.getBands());
      });

      // Agregar banda
      socket.on("crear-banda", (nombre) => {
        this.bandList.addband(nombre);
        this.io.emit("bandList", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
