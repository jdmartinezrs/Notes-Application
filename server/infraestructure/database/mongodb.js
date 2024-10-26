const mongoose = require("mongoose");

class ConnectToDatabase {
  static instanceConnect;
  user;
  #password;

  constructor({ user = process.env.MONGO_USER, pwd = process.env.MONGO_PWD } = {}) {
    if (ConnectToDatabase.instanceConnect) {
      return ConnectToDatabase.instanceConnect;
    }
    this.user = user;
    this.setPassword = pwd;
    ConnectToDatabase.instanceConnect = this;
  }

  async connectOpen() {
    if (mongoose.connection.readyState === 1) {
      return; // Ya está conectado
    }

    const uri = `mongodb://${this.user}:${encodeURIComponent(this.getPassword)}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;

    try {
      await mongoose.connect(uri, {
      });
      console.log("Conexión a MongoDB exitosa");
    } catch (error) {
      console.error("Error al conectar a MongoDB:", error);
      throw new Error("Error al conectar a MongoDB");
    }
  }

  async connectClose() {
    await mongoose.connection.close();
  }

  get getPassword() {
    return this.#password;
  }

  set setPassword(pwd) {
    this.#password = pwd;
  }
}

module.exports = ConnectToDatabase;
