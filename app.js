const express = require('express')
const app = express()
const pool = require('./db');
require('dotenv').config()
app.use(express.json());

app.get('/hello', (req, res) => {
  res.json({'mensaje' : 'Hello World!'})
})

app.get('/usuarios', async (req, res) => {
  try{
    const allUsers = await pool.query("SELECT * FROM usuario");
    res.json(allUsers.rows);
  } catch(err){
    console.error(err.message);
  }
});
app.post("/usuarios", async (req, res) => {
  try {
      console.log(req.body);
     const { nombre, apellido, nickname, contraseña } = req.body;
      const newUsuario = await pool.query(
          "INSERT INTO usuario (nombre,apellido,nickname,contraseña) VALUES ($1,$2,$3,$4) RETURNING *",
          [nombre,apellido,nickname,contraseña]
      );
      res.json(newUsuario.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})