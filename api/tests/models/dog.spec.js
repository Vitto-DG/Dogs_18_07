const { Dog, Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Imposible conectarse a la base de datos:", err);
    })
  );
});
describe("Validaciones", () => {
  beforeEach(() => Dog.sync({ force: true }));
  describe("name", () => {
    it("deberá arrojar un error si name es null", (done) => {
      Dog.create({ name: null })
        .then(() => done(new Error("Requiere un nombre válido")))
        .catch(() => done());
    });
    it("debería funcionar si es un nombre válido", () => {
      Dog.create({ name: "Pug" });
    });
    it("No debería crearse si alguno de los campos está vacio", (done) => {
      Dog.create({ height: "4-25", weight: "4-23", image: "xd" })
        .then(() => done("Error, algunos campos están incompletos!"))
        .catch(() => done());
    });
  });
});
describe("Temperament model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Imposible conectarse a la base de datos:", err);
    })
  );
});
describe("Validaciones", () => {
  beforeEach(() => Temperament.sync({ force: true }));
  describe("name", () => {
    it("Temperamento debe tener una unica ID", (done) => {
      Temperament.create({ id: "1" })
        .then(() => done(new Error("El ID debe ser válido")))
        .catch(() => done());
    });
    it("deberá funcionar cuando sea un nombre válido", () => {
      expect(typeof Temperament.name).equal("string");
    });
  });
});
