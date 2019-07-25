"use strict";

class CategoriesService {
    static getAllCategories = jest.fn(() => {
        return new Promise(async (resolve) => {
            let res = [{
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
            }];
            resolve(res);
        });
    });
}

module.exports = CategoriesService;
