const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'my_database',
  password: 'admin',
  port: 5432,
});

const getflats = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM flats ORDER BY id ASC limit 500', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const createflat = (body) => {
  return new Promise(function(resolve, reject) {
    const { title, image, link } = body
    pool.query('INSERT INTO flats (title, image, link) VALUES ($1, $2, $3) RETURNING *', [title, image, link], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new flat has been added added: ${results.rows[0]}`)
    })
  })
}
const deleteflat = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM flats WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`flat deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getflats,
  createflat,
  deleteflat,
}