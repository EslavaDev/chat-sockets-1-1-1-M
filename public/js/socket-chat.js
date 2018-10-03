const socket = io();

//const params = new URLSearchParams(window.location.search);

if (!param.has('nombre') || !param.has('sala')) {
  window.location = 'index.html';
  throw new Error('El nombre y sala son necesarios');
}

const usuario = {
  nombre: param.get('nombre'),
  sala: param.get('sala'),
};


socket.on('connect', () => {
  console.log('Conectado al servidor');

  socket.emit('entrarChat', usuarios, (data) => {
    renderizarUsuarios(data);
  });
});

// escuchar
socket.on('disconnect', () => {
  console.log('Perdimos conexión con el servidor');
});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
  console.log('Servidor:', mensaje);
  renderizarMensajesExterna(mensaje)
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersonas', (data) => {
  renderizarUsuarios(data)
});

// Mensajes privados
socket.on('mensajePrivado', (mensaje) => {
  console.log('Mensaje Privado:', mensaje);
});
