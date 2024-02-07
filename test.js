function testNama(nama) {
  return `Hello nama saya ${nama}`;
}

const PI = 0.27;

const mahasiswa = {
  nama: "Dhea",
  umur: 20,
  cetakMhs() {
    return `Halo nama saya ${this.nama} dan umur saya ${this.umur}`;
  },
};

class Human {
  constructor() {
    console.log("Hello Human");
  }
}

module.exports = { testNama, PI, mahasiswa, Human };
