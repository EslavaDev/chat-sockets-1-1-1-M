
const socket = io();
const params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
  window.location = 'index.html';
  throw new Error('Ingrese un usuario');
}

const usuario = {
  nombre: params.get('nombre'),
  sala: params.get('sala'),
};
// Escuchar informacion
socket.on('connect', () => {
  console.log('conectado al servidor');
  socket.emit('entrarChat', usuario, (res) => {
    console.log('usuarios conectados: ', res);
  });
});

socket.on('disconnect', () => {
  console.log('Perdimos la conexion al servidor');
});

// Enviar informacion
// socket.emit('crearMensaje', {
//   message: 'Hello world',
// });
// Escuchar informacion
socket.on('crearMensaje', (message) => {
  console.log(message);
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersonas', (message) => {
  console.log('Servidor: ', message);
});

// Mensajes privados
socket.on('mensajePrivado', (mensaje) => {
  console.log('Mensaje privado: ', mensaje);
})
