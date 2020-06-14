//Importando a dependência do sqlite3
const sqlite3 = require("sqlite3");
sqlite3.verbose();

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

//Utilizando o objeto de banco de dados para as operações
db.serialize(() => {

/*

CRIANDO TABELA

    db.run(`
        CREATE TABLE IF NOT EXISTS local (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          image TEXT,
          name TEXT,
          address TEXT,
          address2 TEXT,
          state TEXT,
          city TEXT,
          items TEXT

        );

    `);

*/


/*

INSERINDO DADOS NA TABELA

    const query = `
    INSERT INTO local (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `

  const values = [
    "https:images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "Papersider",
    "Guilherme Gemballa, Jardim América",
    "Número 260",
    "Santa Catarina",
    "Rio do Sul",
    "Resíduos Eletrônicos, Lâmpadas"
  ]

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }
    console.log("Cadastrado com sucesso");
    console.log(this);
  }

  db.run(query, values, afterInsertData);
    
*/



/*

CONSULTANDO TABELA
  db.all(`SELECT * FROM local`, function(err, rows) {
    if (err) {
      return console.log(err);
    }

    console.log("Aqui estão seus registros");
    console.log(rows);
  });

*/



/*

DELETAR DADOS DA TABELA

 db.run(`DELETE FROM local WHERE id = ?`, [5], function(err) {
   if (err) {
     return console.log(err);
   }

   console.log("Registro deletado com sucesso");

   });

*/


/*

DELETAR UMA TABELA

db.run(`DROP TABLE local`, [], function(err) {
if (err) {
    return console.log(err);
    }

    console.log("TABELA DELETADA COM SUCESSO");
    
});


*/


});


