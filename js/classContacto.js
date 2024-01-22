export default class Contacto {
  #id;
  #nombre;
  #apellido;
  #email;
  #telefono;

  constructor(id = crypto.randomUUID(), nombre, apellido, email, telefono) {
    this.#id = id;
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#email = email;
    this.#telefono = telefono;
  }

  get id() {
    return this.#id;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(nuevoNombre) {
    this.#nombre = nuevoNombre;
  }

  get apellido() {
    return this.#apellido;
  }

  set apellido(nuevoApellido) {
    this.#apellido = nuevoApellido;
  }

  get email() {
    return this.#email;
  }

  set email(nuevoEmail) {
    this.#email = nuevoEmail;
  }

  get telefono() {
    return this.#telefono;
  }

  set telefono(nuevotelefono) {
    this.#telefono = nuevotelefono;
  }
  //este metodo sirve para el objeto JSON.stringify
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      telefono: this.telefono,
    };
  }
}
