/**
 * RandomController
 *
 * @description :: Server-side logic for managing randoms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var RandBytes = new require('randbytes');

module.exports = {

	index: function(req, res) {
		var randomSource = RandBytes.urandom.getInstance(); 

		randomSource.getRandomBytes(1, function (buff) {
			// Min/Max = 0/255
		    var decimal = buff.readUIntBE(0, 1);

		    var ranSys = Math.floor(((decimal / 255) * 10) + 10) ;
		    var ranJs = Math.floor((Math.random() * 10) + 10);

		    res.json({
		    	ranSys: ranSys,
		    	ranJs: ranJs
		    });
		});
	}
};

