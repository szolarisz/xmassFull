const http = require('http');
const fs = require('fs');
const port = 4405;

const server = http.createServer((req, res) => {
    //console.log(`${req.url} -> ${req.method}`);

    switch (true) {


        case req.url === "/" && req.method === "GET":
            fs.readFile("./view/index.html", (err, data) => {
                if (err) throw err;
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200);
                res.end(data);
            })
            break;

        case req.url === "/bootstrap.css" && req.method === "GET":
            fs.readFile("./node_modules/bootstrap/dist/css/bootstrap.min.css", (err, data) => {
                if (err) throw err;
                res.setHeader('Content-Type', 'text/css');
                res.writeHead(200);
                res.end(data);
            })
            break;

        case req.url === "/xmass.css" && req.method === "GET":
            fs.readFile("./view/xmass.css", (err, data) => {
                if (err) throw err;
                res.setHeader('Content-Type', 'text/css');
                res.writeHead(200);
                res.end(data);
            })
            break;

        case req.url === "/xmassdata" && req.method === "GET":
            fs.readFile("./data/xmassdata.json", (err, data) => {
                if (err) throw err;
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(data);
            })
            break;

        case req.url === "/munkas.js" && req.method === "GET":
            fs.readFile("./public/munkas.js", (err, data) => {
                if (err) throw err;
                res.setHeader('Content-Type', 'application/javascript');
                res.writeHead(200);
                res.end(data);
            })
            break;

        case req.url === "/xmassdata" && req.method === "POST":
            //console.log("Itt a felvétel helye:");
            let adatom = '';
            req.on('data', (chunk) => {
                adatom += chunk.toString();
            });
            req.on('end', () => {
                const ujFuggo = JSON.parse(adatom);



                fs.readFile('./data/xmassdata.json', (err, data) => {
                    let adatok = JSON.parse(data);
                    adatok.push({
                        "atmero": ujFuggo.atmero,
                        "piros": ujFuggo.piros,
                        "alakzat": ujFuggo.alakzat
                    });
                    fs.writeFile('./data/xmassdata.json', JSON.stringify(adatok), () => {
                        res.end(JSON.stringify(adatok));
                    })
                })
            })

            break;

        default:
            res.end('404-es hiba');
    }
});

server.listen(port);

function sanitizeString(str) {
    str = str.replace(/[^a-z0-9áéíóúñü_-\s\.,]/gim, "");
    return str.trim();
}


