import Route from "./Route.js";
import {allRoutes, websiteName} from "./allRoutes.js";

//création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html");

//fonction pour récupérer la route correspondantes à une URL donnée
const getRouteByURL = (url) => {
    let currentRoute = null;
    //parcours de toutes les routes pour trouver la correspondance
    allRoutes.forEach((element) => { 
        if (element.url == url) {
            currentRoute = element;
        }
    });

    //si aucune correspondances n'est trouvée, on retrouve la route 404
    if (currentRoute != null) {
        return currentRoute;
    } else {
        return route404;
    }
};

//fonction pour charger le contenu de la page
const LoadContentPage = async () => {
    const path = window.location.pathname;
    //récupération de l'url actuelle
    const actualRoute = getRouteByURL(path);
    //récupération du contenu html de la route
    const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
    //ajout du contenu HTML à l'élément avec l'ID "main-page"
    document.getElementById("main-page").innerHTML = html;

    //ajout du contenu JS
    if (actualRoute.pathJS != "") {
        //création d'un balise script
        var scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", actualRoute.pathJS);

        //ajout de la balise script au corps du document
        document.querySelector("body").appendChild(scriptTag);
    }

    //changement du titre de la page
    document.title = actualRoute.title + " - " + websiteName;

    //Afficher et masquer les éléments en fonction du rôle
    showAndHideElementsForRoles();
};

//fonction pour gérerles évènement de routages (click sur un lien)
const routeEvent = (event) => {
    event = event || window.event;
    event.preventDefault();
    
    //mise à jour de L'url dans l'historique de navigation
    window.history.pushState({}, "", event.target.href);
    
    //chargement du contenu de la nouvelle page 
    LoadContentPage();
};

// gestion de l'évènement de retour en arrière dans l'historique de navigation
window.onpopstate = LoadContentPage;

// assignation de la fonction routeEvent à la propriété route de la fenêtre
window.route = routeEvent;

// chargement du contenu de la page au chargement initial
LoadContentPage();
