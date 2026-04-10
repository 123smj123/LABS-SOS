import dataStore from 'nedb';
let BASE_URL_API = "/api/v1";

let db = new dataStore();

function loadBackend(app) {

    let contacts = [
        {
            name: "John Doe",
            phone: "123456789"
        },
        {
            name: "Jane Smith",
            phone: "987654321"
        }
    ];

    db.insert(contacts);
    console.log("Base de datos inicializada con contactos de ejemplo.");

    app.get(BASE_URL_API + "/contacts", (req, res) => {
        db.find({}, (err, contacts) => {
            let jsonData = JSON.stringify(contacts.map((c) => {
                delete c._id;
                return c;
            }), null, 2);
            console.log(`Datos: ${jsonData}`);
            res.send(jsonData);
        });
    });

    app.get(BASE_URL_API + "/contacts/:name", (req, res) => {
        db.find({ name: req.params.name }, (err, contacts) => {
            let jsonData = JSON.stringify(contacts.map((c) => {
                delete c._id;
                return c;
            }), null, 2);
            if (contacts.length === 0) {
                return res.status(404).send("NOT FOUND");
            }
            console.log(`Datos: ${jsonData}`);
            res.send(contacts[0]);
        });
    });

    app.post(`${BASE_URL_API}/contacts`, (req, res) => {
        let newContat = req.body;
        db.find({ name: newContat.name }, (err, existing) => {
            if (existing.length > 0) {
                console.log(`Contacto existente: ${JSON.stringify(existing[0], null, 2)}`);
                return res.status(409).send("CONFLICT");
            } else {
                db.insert(newContat);
                res.status(201).send("CREATED");
            }
        });
        //contacts.push(newContat);
        //console.log(`Nuevo contacto: ${JSON.stringify(newContat, null, 2)}`);
    });

    app.put(`${BASE_URL_API}/contacts/:name`, (req, res) => {
        let nameToUpdate = req.params.name;
        let updatedContact = req.body;
        db.update({ name: nameToUpdate }, updatedContact, {}, (err, numReplaced) => {
            if (err) {
                console.error(`Error al actualizar contacto: ${err}`);
                return res.status(500).send("INTERNAL SERVER ERROR");
            }
            if (numReplaced === 0) {
                return res.status(404).send("NOT FOUND");
            }
            res.status(200).send("UPDATED");
        });
    });

    app.delete(`${BASE_URL_API}/contacts/:name`, (req, res) => {
        let nameToDelete = req.params.name;
        db.remove({ name: nameToDelete }, {}, (err, numRemoved) => {
            if (err) {
                console.error(`Error al eliminar contacto: ${err}`);
                return res.status(500).send("INTERNAL SERVER ERROR");
            }
            if (numRemoved === 0) {
                return res.status(404).send("NOT FOUND");
            }
            res.status(200).send("DELETED");
        });
    });

    app.get(BASE_URL_API + "/data", (req, res) => {
        console.log("Generating random data");
        function getRandomInt(min, max) {
            return Math.floor(Math.random()*(max-min)+min);
        }
        let data = [];

        for (let i = 0; i<10; i++)
            data.push(getRandomInt(1, 10))
        
        res.json(data);
    });
}

export { loadBackend };