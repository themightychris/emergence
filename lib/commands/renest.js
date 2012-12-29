var flatiron = require('flatiron')
	,efs = require('emergence-fs');

module.exports = function(done) {
	var app = this;
	
	require('emergence-kernel')(function(kernel) {
		efs.openFs(kernel.config.get('directories:#COREFS'), 'emergence', function(fsError, coreFs) {
			if(fsError) {
				app.log.error('failed to open core-fs: '+fsError.message);
				return done(fsError);
			}

			app.log.info('renesting core fs...'.yellow);
			coreFs.renestCollections(function(error, resultCount) {
				if(error) {
					app.log.error('renesting failed', error);
				}
				else
				{
					app.log.info('successfully renested ' + resultCount.toString().green + ' collections');
				}
				
				coreFs.close(done);
			});
		});
	});

};