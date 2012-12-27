var flatiron = require('flatiron');

module.exports = function(done) {
	var app = this;
	
	require('emergence-kernel')(function(kernel) {
		var mysql = kernel.services.getService('mysql');
		
		if(!mysql) {
			app.log.error('mysql service provider could not be loaded');
			done(new Error('mysql service provider could not be loaded'));
		}
		
		// ensure mysql is available
		mysql.available(function(availableError) {
			if(availableError) {
				app.log.error('mysql service is not available: '+availableError.message);
				return done(availableError);
			}

			// make mysql is ready
			mysql.ready(function(readyError) {
				if(readyError) {
					app.log.error('mysql service could not be made ready: '+readyError.message);
					return done(readyError);
				}
				
				app.log.info('mysql service ready'.green);
				app.log.info('starting mysql...'.yellow);
				
				mysql.start(function(startError) {
					if(startError) {
						app.log.error('mysql service could not be started: '+startError.message);
						return done(startError);
					}
				
					app.log.info('mysql started, awaiting orders...'.yellow);
					done();
				})
			});
		});
	});

};
/*
			flatiron.common.async.series({
				ready: mysql.ready
				,start: mysql.start
			}, function(err, results) {
				app.log.info('Series complete', err, results);
			});
*/

	
	//this.log.info('mysql ready:', this.inspect.inspect(mysql.ready()));
	//this.log.info('mysql start:', this.inspect.inspect(mysql.start()));
	
	
	//this.inspect.putObject(kernel);
	//this.inspect.putObject(this.config);
/*
	console.log('mysql', this.inspect.inspect(kernel.services.getService('mysql')));
	console.log('sql', this.inspect.inspect(kernel.services.getService('sql')));
	console.log('nginx', this.inspect.inspect(kernel.services.getService('nginx')));
	console.log('web', this.inspect.inspect(kernel.services.getService('web')));
*/
	
	
	// check if mysql is configured
	
	
	
	
	
	// save config
	//this.config.save();
