

class Usuarios {
  constructor() {
    this.personas = [];
  }

  agregarPersona(id, nombre, sala) {
    const persona = {
      id,
      nombre,
      sala,
    };
    this.personas.push(persona);
    return this.personas;
  }

  getPersona(id) {
    return this.personas.filter(per => per.id === id)[0];
  }

  getPersonas() {
    return this.personas;
  }

  getPersonasPorSala(sala) {
    const personaSala = this.personas.filter(per => per.sala == sala);
    return personaSala;
  }

  borrarPersona(id) {
    const personaDelete = this.getPersona(id);
    this.personas = this.personas.filter(per => per.id !== id);
    return personaDelete;
  }
}

module.exports = {
  Usuarios,
};
