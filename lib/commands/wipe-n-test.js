var flatiron = require('flatiron')
	,efs = require('emergence-fs');

module.exports = function(path, done) {
	var app = this;
	
	require('emergence-kernel')(function(kernel) {
		kernel.services.getService('mysql').connect({database: 'emergence'}, function(error, dbConnection) {
			if(error) {
				return done(error);
			}
			
			flatiron.common.async.series({
				dropTemporaries: function(next) {
					dbConnection.query('DROP TABLE IF EXISTS _cm', next);
				}
				,truncateCollections: function(next) {
					dbConnection.query('TRUNCATE TABLE collections', next);
				}
				,truncateFiles: function(next) {
					dbConnection.query('TRUNCATE TABLE files', next);
				}
				,insertTestData: function(next) {
					dbConnection.query(
						"INSERT INTO collections (id, lft, rgt, handle, status, parentId, created, creatorId) VALUES"
						+[
							"(1, 1, 16, 'root1', 'local', NULL, '2012-12-30 22:13:36', NULL)"
							,"(2, 2, 5, 'branch1.1', 'local', 1, '2012-12-30 22:13:36', NULL)"
							,"(3, 3, 4, 'leaf1.1.1', 'local', 2, '2012-12-30 22:13:36', NULL)"
							,"(4, 6, 9, 'branch1.2', 'local', 1, '2012-12-30 22:13:50', NULL)"
							,"(5, 7, 8, 'leaf1.2.1', 'local', 4, '2012-12-30 22:13:50', NULL)"
							,"(6, 17, 26, 'root2', 'local', NULL, '2012-12-30 22:14:01', NULL)"
							,"(7, 18, 21, 'branch2.1', 'local', 6, '2012-12-30 22:14:01', NULL)"
							,"(8, 19, 20, 'leaf2.1.1', 'local', 7, '2012-12-30 22:14:01', NULL)"
							,"(9, 10, 15, 'shared', 'local', 1, '2012-12-30 22:14:44', NULL)"
							,"(10, 22, 25, 'shared', 'local', 6, '2012-12-30 22:14:47', NULL)"
							,"(11, 11, 12, 'shared-leaf', 'local', 9, '2012-12-30 22:15:14', NULL)"
							,"(12, 23, 24, 'shared-leaf', 'local', 10, '2012-12-30 22:15:19', NULL)"
							,"(13, 13, 14, 'new-shared-leaf', 'local', 9, '2012-12-30 22:15:28', NULL)"
						].join(',')
						
						,next
					);
				}
			}, function(error, results) {
				if(error) {
					app.log.error('wipe failed', error);
				}
				else {
					app.log.info('wipe-n-test complete', results);
				}
				
				dbConnection.end(done);
			});
		});
	});

};