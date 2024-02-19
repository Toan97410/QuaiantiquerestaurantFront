export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
        this.url = url;
        this.title = title;
        this.pathHtml = pathHtml;
        this.pathJS = pathJS;
        this.authorize = authorize;
    }
}

/*
[] -> Tout le monde peut y accéder
["disconnected"] -> réserver aux utilisateurs deconnecté
["client"] -> réserver aux utilisateurs avec le rôle client
["admin"] -> réserver aux utilisateurs avec le rôle admin
["admin", "client"] -> réserver aux utilisateurs avec le rôle client ou admin
*/