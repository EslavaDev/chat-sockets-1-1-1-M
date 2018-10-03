const param = new URLSearchParams(window.location.search);
const usuarios = {
  nombre: param.get('nombre'),
  sala: param.get('sala'),
};

// Referencias de JQuery
const divUsuarios = $('#divUsuarios');
const formEnviar = $('#formEnviar');
const txtMensaje = $('#txtMensaje');
const divChatbox = $('#divChatbox');
// funciones para renderizar usuarios
function renderizarUsuarios(personas) { // [{}, {}, {}]
  console.log(personas);
  let html = '';


  html += '<li>';
  html += `<a href="javascript:void(0)" className="active">Chat de<span> ${param.get('sala')} </span></a>`;
  html += '</li>';

  for (let i = 0; i < personas.length; i += 1) {
    console.log(personas[i].id);
    html += '<li>';
    html += `   <a data-id="${personas[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${personas[i].nombre}<small class="text-success">online</small></span></a>`;
    html += '</li>';
  }
  divUsuarios.html(html);
}

function renderizarMensajesExterna(data) {
  const fecha = new Date(data.fecha);
  const hora = `${fecha.getHours()}:${fecha.getMinutes()}`;
  let html = '';
  let adminClass = 'info';
  if (data.nombre === 'Administrador') {
    adminClass = 'danger';
  }
  html += '<li class="animated fadeIn">';
  if (data.nombre !== 'Administrador') {
    html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
  }
  html += '    <div class="chat-content">';
  html += `        <h5>${data.nombre}</h5>`;
  html += `        <div class="box bg-light-${adminClass}">${data.mensaje}</div>`;
  html += '    </div>';
  html += `    <div class="chat-time">${hora}</div>`;
  html += '</li>';

  divChatbox.append(html);
}

function renderizarMensajesInterna(data) {
  const fecha = new Date(data.fecha);
  const hora = `${fecha.getHours()}:${fecha.getMinutes()}`;
  let html = '';
  html += '<li class="reverse">';
  html += '<div class="chat-content">';
  html += `    <h5>${data.nombre}</h5>`;
  html += `    <div class="box bg-light-inverse">${data.mensaje}</div>`;
  html += '</div>';
  html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
  html += `    <div class="chat-time">${hora}</div>`;
  html += '</li>';

  divChatbox.append(html);
}

// Listeners

divUsuarios.on('click', 'a', function () {
  const id = $(this).data('id');
  if (id) {
    console.log(id);
  }
});

formEnviar.on('submit', (e) => {
  e.preventDefault();
  if (txtMensaje.val().trim().length === 0) {
    return '';
  }
  // Enviar información
  socket.emit('crearMensaje', {
    nombre: usuarios.nombre,
    message: txtMensaje.val(),
  }, (resp) => {
    console.log('respuesta server: ', resp);
    renderizarMensajesInterna(resp);
    txtMensaje.val('').focus();
  });
});
