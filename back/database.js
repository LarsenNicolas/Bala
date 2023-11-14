import mysql from 'mysql2';

// Configuración de la conexión a la base de datos
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '3010',
  database: 'SapeTickets',
  port: 3307
});

// Conectar a la base de datos
con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

// Obtener listado de eventos
export const getEventos = (callback) => {
  const query = 'SELECT * FROM Evento';

  con.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching events from MySQL:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });

};

export const getEvento = (callback, id) => {
  const query = 'SELECT * FROM Evento WHERE id = ' + id;

  con.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching events from MySQL:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });

};

