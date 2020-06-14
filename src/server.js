const express = require("express");
const server = express();

//CATCHING THE DATABASE 
const bancoDeDados = require("../src/database/db");

//CONFIGURATION OF FOLDER PUBLIC
server.use(express.static("public"));

//ANABLE USE OF req.body
server.use(express.urlencoded({ extended: true }));


// USING TEMPLATE ENGINE (nunjucks)
const nunjucks = require("nunjucks");
const db = require("../src/database/db");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});


//MAIN PAGE
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um titulo" });
});

//CREATE POINT OF COLLECT
server.get("/createpoint", (req, res) => {

  return res.render("createpoint.html");
});

// PERSISTING DATA REGISTERED
server.post("/savepoint", (req, res) => {
    const query = `
    INSERT INTO local (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`

  const values = [
    req.body.image, req.body.name, req.body.address, req.body.address2, req.body.state, req.body.city, req.body.items
  ];

  function afterInsertData(err) {
    if (err) {
        return console.log(err);
    }
    console.log("Cadastrado com sucesso");
    console.log(this);

    return res.render("createpoint.html", { saved: true });
  }

  db.run(query, values, afterInsertData);

});

//SEARCH RESULTS BY CITY
server.get("/search", (req, res) => {

  const search = req.query.search;

  if(search == "") {
        //mostrando pesquisa vazia
        return res.render("search-results.html", { total: 0 });
  }


  //Pegar os dados do banco de dados
  db.all(`SELECT * FROM local WHERE city LIKE '%${search}%'`, function(err, rows) {
    if(err) {
      return console.log(err)
    }
    const total = rows.length;
    //mostrando a pagina com os dados do banco de dados
    return res.render("search-results.html", { localidades: rows, total });

  });
});

// ONLINE SERVER
server.listen(3000);