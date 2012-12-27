var flatiron = require('flatiron')
    ,path = require('path')
    ,app = flatiron.app;


// load CLI router
app.use(flatiron.plugins.cli, {
	source: path.join(__dirname, 'lib', 'commands')
	,usage: 'emergence [init/start]'
});




//app.use(flatiron.plugins.log);

//app.use(flatiron.plugins.inspect);

//app.use(require('flatiron-cli-config'));
//app.use(require('flatiron-cli-users'));

//console.dir(flatiron);

app.start();