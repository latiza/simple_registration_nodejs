const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Body-parser beállítás
app.use(bodyParser.urlencoded({ extended: true }));

// Statikus fájlok (pl. HTML)
app.use(express.static(path.join(__dirname, 'public')));

// MySQL adatbázis kapcsolat
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registration'
});
//adatábázis kapcsolat ellenőrzése
db.connect((err) => {
    if (err) {
        console.error('MySQL kapcsolódási hiba: ', err);
    } else {
        console.log('MySQL kapcsolódva!');
    }
});

// Űrlap POST kérés feldolgozása
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
//ha hiányzik valamilyen adat, hibaüzenetet küldünk vissza
    if (!name || !email || !password) {
        return res.send('Minden mezőt ki kell tölteni!');
    }

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            return res.send('Adatbázis hiba: ' + err);
        }
        res.send('Sikeres regisztráció!');
    });
});

// Szerver indítása
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server fut a http://localhost:${PORT} címen`);
});
