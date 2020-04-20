const request = require("request");
const cheerio = require("cheerio");

function searchByLimit(search, page, limit) {
	let searResult = [];
	return new Promise(async function(resolve, reject){
		request(`https://lista.mercadolivre.com.br/${search}_Desde_${page}`, function(err, res, body) {
			const $ = cheerio.load(body);
			// Quando não retornar resultado não pesquisar registros
			if($(".search-icon").length == 0) {
				$("#searchResults .results-item").each(function() {	
					let name = $(this).find('.item__info-title').text();
					let store = $(this).find('.item__brand-title-tos').text();
					let price = $(this).find('.price__fraction').text();

					if($(this).find('.price__decimals').text()) {
						price += `.${$(this).find('.price__decimals').text()}`
					};

					let link = $(this).find('.item__info-title').attr("href");
					let state = $(this).find('.item__condition').text();
					if(Object.keys(searResult).length < limit) {
						searResult.push(new Search(name, store, parseFloat(price), link, state));
					}
					else {
						return false;
					};
				});
			};
			resolve(searResult);
		});		
	});
};

class Search {

	constructor(name, store, price, link, state) {
		this.name = name;
		this.store = store;
		this.price = price;
		this.link = link;
		this.state = state;
	};


	async searchInPage(body) {
		let resultLimit = [];
		let page = 1;
		return new Promise(async function(resolve, reject){
			try {
				while(Object.keys(resultLimit).length < body.limit) {
					let limit = body.limit - Object.keys(resultLimit).length;
					const result = await searchByLimit(body.search, page, limit);
					resultLimit = resultLimit.concat(result);
					page += 50;

					//não está retornando mais resultados
					if(Object.keys(result).length == 0) {
						break;
					}
				}
				resolve(resultLimit);
			}
			catch {
				reject("failed");
			}
		})
	};

};


module.exports = Search;
