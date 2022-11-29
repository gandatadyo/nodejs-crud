const express = require('express')
const app = express()
const port = 3000

// untuk mengambil nilai dalam method post
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// mendefinikan configurasi database
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sekolah'
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/show', (req, res) => {
  pool.query('SELECT ID,Nama,Umur FROM siswa', function (error, results, fields) {

    try {
      if (error) {
        throw error;
      } else {
        res.send(results)
      }
    } catch (error) {
      res.send(error)
    }

  });
})

// restapi untuk menambahkan data 
app.post('/insert', (req, res) => {
  const nama = req.body.nama
  const umur = req.body.umur
  const query = `INSERT INTO SISWA (Nama,Umur) VALUES ("${nama}","${umur}")`
  pool.query(query, function (error, results, fields) {

    try {
      if (error) {
        throw error;
      } else {
        res.send(results)
      }
    } catch (error) {
      res.send(error)
    }

  });
})

// restapi untuk mengedit data
app.post('/update', (req, res) => {
  const id = req.body.id
  const nama = req.body.nama
  const umur = req.body.umur
  const query = `UPDATE SISWA SET Nama="${nama}", UMUR="${umur}" WHERE ID="${id}"`
  pool.query(query, function (error, results, fields) {

    try {
      if (error) {
        throw error;
      } else {
        res.send(results)
      }
    } catch (error) {
      res.send(error)
    }

  });
})

// restapi untuk menghapus data
app.post('/delete', (req, res) => {
  const id = req.body.id
  const query = `DELETE FROM SISWA WHERE ID="${id}"`
  pool.query(query, function (error, results, fields) {

    try {
      if (error) {
        throw error;
      } else {
        res.send(results)
      }
    } catch (error) {
      res.send(error)
    }

  });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})