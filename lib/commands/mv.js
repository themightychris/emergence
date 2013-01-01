var flatiron = require('flatiron')
	,efs = require('emergence-fs');

module.exports = function(srcPath, destPath, done) {
	var app = this;
	
	require('emergence-kernel')(function(kernel) {
		efs.openFs(kernel.config.get('directories:#COREFS'), 'emergence', function(fsError, coreFs) {
			if(fsError) {
				app.log.error('failed to open core-fs: '+fsError.message);
				return done(fsError);
			}

			app.log.info('moving paths', srcPath, '->', destPath);
			coreFs.movePath(srcPath, destPath, function(error, result) {
				if(error) {
					app.log.error('move failed', error);
				}
				else
				{
					app.log.info('moved collections', result);
				}
				
				coreFs.close(done);
			});
		});
	});

};