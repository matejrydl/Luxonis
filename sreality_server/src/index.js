const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()
const port = 5000

const realities_model = require('./realities_model')

app.use(cors());
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  console.log("something")
  realities_model.getflats()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/flats', (req, res) => {
  realities_model.createflat(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/flats/:id', (req, res) => {
  realities_model.deleteflat(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('*', function(req, res){
  res.status(404).send(req.url);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
  //realities_model.getflats()
  //.then(response => {
  //  console.log(response);
  //})
})