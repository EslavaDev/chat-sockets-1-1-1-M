const { io } = require('../');

const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils');

const usuarios = new Usuarios();


io.on('connection', (client) => {
  console.log('Usuario conectado: ', client.id);

  client.on('entrarChat', (data, callback) => {

    if (!data.nombre || !data.sala) {
      return callback({
        err: true,
        message: 'El nombre/sala es necesario',
      });
    }
    client.join(data.sala);
    usuarios.agregarPersona(client.id, data.nombre, data.sala);
    client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));
    return callback(usuarios.getPersonasPorSala(data.sala));
  });

  client.on('crearMensaje', (data) => {
    const persona = usuarios.getPersona(client.id);
    const mensaje = crearMensaje(persona.nombre, data.message);
    client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
  });

  client.on('disconnect', () => {
    const usuario = usuarios.borrarPersona(client.id);
    client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje('Administrador', `${usuario.nombre} Abandono el chat`));
    client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonasPorSala(usuario.sala));
  });

  // Mensajes privados
  client.on('mensajePrivado', (data) => {
    const persona = usuarios.getPersona(client.id);
    const mensaje = crearMensaje(persona.nombre, data.message);
    client.broadcast.to(data.para).emit('mensajePrivado', mensaje);
  });
});
