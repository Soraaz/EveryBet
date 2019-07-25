"use strict";

const config = require('../config.json');
const FormData = require('form-data');

class HTTPClient {

    static sendGet(url) {
        return new Promise(async (resolve, reject) => {
            await fetch(config.apiServerURL + "api/" + url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + config.apiToken
                }
            })
            .then(data => {
                return data.json();
            }).then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    static sendPost(url, body) {
        return new Promise(async (resolve, reject) => {
            await fetch(config.apiServerURL + "api/" + url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + config.apiToken
                },
                body: JSON.stringify(body)
            })
            .then(data => {
                return data.json();
            }).then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    static sendPut(url, body) {
        return new Promise(async (resolve, reject) => {
            await fetch(config.apiServerURL + "api/" + url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + config.apiToken
                },
                body: JSON.stringify(body)
            })
            .then(data => {
                return data.json();
            }).then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    static sendDelete(url) {
        return new Promise(async (resolve, reject) => {
            await fetch(config.apiServerURL + "api/" + url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + config.apiToken
                }
            })
            .then(data => {
                return data.json();
            }).then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    static uploadImage(url, img) {
        var form = new FormData();

        form.append("image", img);
        return new Promise(async (resolve, reject) => {
            await fetch(config.apiServerURL + "api" + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + config.apiToken
                },
                body: form
            })
            .then(data => {
                return data.json();
            }).then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = HTTPClient;