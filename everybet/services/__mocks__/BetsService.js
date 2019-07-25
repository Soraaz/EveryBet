"use strict";

class BetsService {
    static getBetsByUserId = jest.fn(() => {
        return new Promise(async (resolve) => {
            let res = [{
                "answers": [
                    {
                        "answer": "Et harum quidem rerum",
                        "betId": 1,
                        "id": 1,
                    }, {
                        "answer": "Sint modo partes vitae beatae",
                        "betId": 1,
                        "id": 2,
                    }, {
                        "answer": "Itaque rursus eadem ratione",
                        "betId": 1,
                        "id": 3,
                    }
                ],
                "categories": [{
                    "icon": "art.png",
                    "id": 1,
                    "name": "Art",
                }, {
                    "icon": "finance.png",
                    "id": 2,
                    "name": "Finance",
                }, {
                    "icon": "fun.png",
                    "id": 3,
                    "name": "Fun",
                }, {
                    "icon": "literature.png",
                    "id": 4,
                    "name": "Littérature",
                }, {
                    "icon": "news.png",
                    "id": 5,
                    "name": "News",
                }, {
                    "icon": "numeric.png",
                    "id": 6,
                    "name": "Numérique",
                }, {
                    "icon": "people.png",
                    "id": 7,
                    "name": "People",
                }, {
                    "icon": "politics.png",
                    "id": 8,
                    "name": "Politique",
                }, {
                    "icon": "science.png",
                    "id": 9,
                    "name": "Sciences",
                }, {
                    "icon": "space.png",
                    "id": 10,
                    "name": "Espace",
                }, {
                    "icon": "sport.png",
                    "id": 11,
                    "name": "Sport",
                }, {
                    "icon": "video_games.png",
                    "id": 12,
                    "name": "Jeux Vidéos",
                }],
                "coins": 1,
                "coinsRedistributed": 0,
                "correctAnswerId": null,
                "deadline": 1893452400,
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si verbum sequimur, primum longius verbum praepositum quam bonum. Dolor ergo, id est summum malum, metuetur semper, etiamsi non aderit; Peccata paria.",
                "finished": 0,
                "id": 1,
                "name": "Loripsum",
                "reported": 0,
                "response": "Et harum quidem rerum",
                "validate": 1,
            }];
            resolve(res);
        });
    });

    static getAllBets = jest.fn(() => {
        return new Promise(async (resolve) => {
            let res = [];
            resolve(res);
        });
    });
}

module.exports = BetsService;
