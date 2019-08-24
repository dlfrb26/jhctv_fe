/*!
 *
 * WebRTC Lab
 * @author dodortus (dodortus@gmail.com / codejs.co.kr)
 *
 */
const	config = require('./config.json');
const port = process.env.PORT || config.webserver.port;
const	express = require('express');
const	app = express();
const ejs = require('ejs');
const	http = require('http').Server(app);
const root = `${__dirname}/../`;
const path = {
  frontend: `${root}/frontend`
};

var https = require('https'); // ← 追加
var fs = require('fs');       // ← 追加

var options = {
  key: fs.readFileSync('./server.rsa'),
  cert: fs.readFileSync('./server.crt')
};

app.set('views', path.frontend + '/views');
app.engine('ejs', ejs.renderFile);
app.use(express.static(path.frontend + '/contents'));
app.use(express.static(path.frontend + '/views/examples'));

// Routes ======================================================================
require('./controllers/route.js')(app);

// Socket.io ======================================================================
require('./controllers/socket.js')(https);

https.createServer(options, app).listen(port);

// Server listen
// http.listen(port, function() {
//   console.log('WebRTC Lab server running at ' + config.webserver.host + ':' + port);
// });
