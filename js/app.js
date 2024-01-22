import Contacto from "./classContacto.js";
//Create - Read - Update - Delete contactos
// const contacto = new Contacto(1, 'Juan', 'Pérez', 'juan.perez@email.com', '555-123-4567');

const modalAdminContacto = new bootstrap.Modal(
  document.getElementById("administrarContacto")
);
const btnAgregarContacto = document.getElementById("btnNuevoContacto");
const btnModificarContacto = document.getElementById("btnModificarContacto");
const btnAgregarModContacto = document.getElementById("agregarMod");
// const btnBorrarContacto = document.getElementById("btnBorrarContacto");
const formularioContacto = document.querySelector("form");
const nombre = document.getElementById("nombre"),
  apellido = document.getElementById("apellido"),
  telefono = document.getElementById("telefono"),
  email = document.getElementById("email");
const agenda = JSON.parse(localStorage.getItem('agendaKey')) || [];
let crearModificar = true
let idContacto2 = null;
//funciones

const guardarContacto = (e) => {
  e.preventDefault();

  if (crearModificar) {
    crearContacto();
  } else {
    actualizarDatos();
  }
};


const mostrarModal = () => {
  btnAgregarModContacto.innerHTML = "Agregar";
  modalAdminContacto.show();
}


const crearContacto = () => {
  
  console.log("aqui debo crear el contacto nuevo");
  //verificar que los datos sean validos

  //crearia el contacto
  const nuevoContacto = new Contacto(
    undefined,
    nombre.value,
    apellido.value,
    email.value,
    telefono.value
  );
  console.log(nuevoContacto);
  //agrego el contacto nuevo al array
  agenda.push(nuevoContacto);
  console.log(agenda);
  //resetear el formulario
  limpiarFormulario();
  //guardar el array en localstorage
  guardarEnLocalstorage();
  crearFila(nuevoContacto, agenda.length -1)
  modalAdminContacto.hide();
  Swal.fire( {
    title: 'Contacto creado',
    text: `${nuevoContacto.nombre} agregado`,
    icon: 'success',
  })
};

window.modificarContacto = (idContacto) => {
  idContacto2 = idContacto;
  crearModificar = false
  console.log('prueba')
  modalAdminContacto.show();
  btnAgregarModContacto.innerHTML = "Modificar";
  const posicionContacto = agenda.findIndex((item) => item.id === idContacto);
  nombre.placeholder = agenda[posicionContacto].nombre;
  apellido.placeholder = agenda[posicionContacto].apellido;
  telefono.placeholder = agenda[posicionContacto].telefono;
  email.placeholder = agenda[posicionContacto].email;
  
}
const actualizarDatos = () => {
  const posicionContacto = agenda.findIndex((item) => item.id === idContacto2);

  agenda[posicionContacto].nombre = nombre.value;
  
  guardarEnLocalstorage();
  //borrar fila
  const tablaContactos = document.querySelector('tbody');

  tablaContactos.removeChild(tablaContactos.children[posicionContacto]);
  //crear fila;
  crearFila(
    agenda[posicionContacto],
    posicionContacto + 1
  );

  modalAdminContacto.hide();

  recargarPagina();
};

const recargarPagina = () => {
  location.reload();
};

function limpiarFormulario() {
  formularioContacto.reset();
}

function guardarEnLocalstorage(){
    localStorage.setItem('agendaKey', JSON.stringify(agenda))
}

function crearFila(contacto, fila){
    const tablaContactos = document.querySelector('tbody');
    tablaContactos.innerHTML += `<tr>
    <th scope="row">${fila}</th>
    <td>${contacto.nombre}</td>
    <td>${contacto.apellido}</td>
    <td>${contacto.email}</td>
    <td>${contacto.telefono}</td>
    <td>
      <button class="btn btn-primary" onclick="verDetalleContacto('${contacto.id}')">Detalle</button>
      <button class="btn btn-warning" onclick="modificarContacto('${contacto.id}')">Editar</button
      ><button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
    </td>
  </tr>`
}

function cargaInicial (){
    if(agenda.length > 0){
        agenda.map((contacto, posicion)=> crearFila(contacto, posicion + 1))
    }
}

window.borrarContacto = (idContacto) => {
  Swal.fire({
    title: "Estas seguro?",
    text: "No puedes revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borralo!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const posicionContacto = agenda.findIndex((item) => item.id === idContacto);
      agenda.splice(posicionContacto,1);
      guardarEnLocalstorage();
      tablaContactos.removeChild(tablaContactos.children[posicionContacto]);
      Swal.fire({
        title: "Borrado!",
        text: "Tu contacto fue borrado.",
        icon: "success"
      });
      recargarPagina();
    }
  });
 
}

//logica extra


btnAgregarContacto.addEventListener("click", mostrarModal);
formularioContacto.addEventListener("submit", guardarContacto);

cargaInicial();