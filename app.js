var express = require( 'express' );
var path = require( 'path' );
var fs = require( 'fs' );

var app = express();

var apiVersion = '1.0';

function render(req, res) {

    var fileName = req.path + '/' + req.method.toLowerCase() + '.json';

    fileName = fileName.replace('/' + apiVersion + '/', '/');

    var filePath = path.join(__dirname, fileName);

    console.log(req.method, filePath);

    if (fs.existsSync(filePath)) {
        res.setHeader('content-type', 'application/json');

        fs.createReadStream(filePath).pipe(res);
    }
    else {
        console.log('no such file', filePath);

        res
            .status(404)
            .json([
                {
                    "info": {
                        "success": false,
                        "code": 12345
                    }
                }
            ])
            .end();
    }
}

app.get('/', function (req, res) {

    res.send('Hello World!');
});

app.get('/test/', function (req, res) {
    res.send('<html><body><h1>Hello test</h1></body></html>');
});
//
//app.get('/api/1.0/users', function (req, res) {
//    res.send(users);
//});
//
//app.get('/api/1.0/users/:userId', function (req, res) {
//
//    console.log(req.query);
//
//    res.send(user);
//});


app.all('/api/' + apiVersion + '/*', function (req, res) {
    console.log(req);

    render(req, res);
});

var server = app.listen( '8080', function () {
    var host = server.address().adress;
    var port = server.address().port;
    console.log( 'Listening %s:%s', host, port );
} );




