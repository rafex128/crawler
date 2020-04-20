const Search = new (require('../models/Search'));

exports.search = async (req, res) => {
	if(req.body.limit == undefined || req.body.search == undefined) {
		res.status(400).json({});
	}
	else {
		await Search.searchInPage(req.body).then(function(data) {
    		res.status(200).json(data);
		}, function() {
			res.status(404).json({});
		});
	}
};