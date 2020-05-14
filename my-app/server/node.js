const http = require("http");
const fs = require('fs');

const hostname = "127.0.0.1";
const port = 3000;


function appendCalculations(data) {
   data = JSON.parse(data); //data - array
   console.log(data);
   let sumTickets = 0;
   let sumBackups = 0;

   for (let i = 0; i < data.length; i++) {
       sumTickets = sumTickets + data[i].ticketsCreated.length;
       sumBackups = sumBackups + data[i].backups.length;
    }

   let avBackups = sumBackups/data.length;
   let avTickets = sumTickets/data.length;

   let newData = {
       "users": data,
       "calculations": {
           "averageTicketCreated": avBackups.toFixed(2),
           "averageBackupsCreated": avTickets.toFixed(2)
       }
   }

   return JSON.stringify(newData);

}


const server = http.createServer((req,res) => {

    res.writeHead(200, {'Content-Type': 'application/json'});
    if (req.url === '/users') {
        let data = fs.readFileSync('users.json', {encoding: "UTF-8"});
        res.writeHead(200, {'Content-Type': 'application/json'});
        let newData = appendCalculations(data);
        res.write(newData);
        return res.end();
    } else {
        res.statusCode = 404;
        res.write('PAGE NOT FOUND!');
        return res.end();
    }
});



server.listen(port, hostname, () => {
    console.log("Server running at http://${hostname}:${port}/");
});


