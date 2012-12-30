var flatiron = require('flatiron')
	,efs = require('emergence-fs');

module.exports = function(path, done) {
	var app = this;
	
	require('emergence-kernel')(function(kernel) {
		efs.openFs(kernel.config.get('directories:#COREFS'), 'emergence', function(fsError, coreFs) {
			if(fsError) {
				app.log.error('failed to open core-fs: '+fsError.message);
				return done(fsError);
			}

			app.log.info('creating collection', path);
			coreFs.createCollection(null, path, function(error, collectionId) {
				if(error) {
					app.log.error('create failed', error);
				}
				else
				{
					app.log.info('created collection' + collectionId);
				}
				
				coreFs.close(done);
			});
		});
	});

};