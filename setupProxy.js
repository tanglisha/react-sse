var proxy = require('http-proxy-middleware');

app.use(function(app){
    app.use(proxy('/stream', {target: 'http://localhost:5555'}))
})

