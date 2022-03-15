//------------------------------------------------------
//Variables
//------------------------------------------------------

let datos;
let url =
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json ";

//------------------------------------------------------
//Funciones
//------------------------------------------------------

//Funcion para extrar los datos de la url usando una promesa
function extraerDatos(url, callback) {
    fetch(url)
        .then((response) => response.json())
        .then((json) => callback(json));
}

extraerDatos(url, (data) => {
    datos = data;
    principal();
});

// Funcion para encontrar valores distintos en la lista principal
const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
};

// Funcion que  principal que realiza los diferentes calculos y ademas representa los resultados en la interfaz principal
function principal() {
    //Declaración de Variables
    let fila;


    // Funcion para crear el nav 
    nav = document.getElementById("Textos");
    datos.forEach((element) => {
        fila = document.createElement("li");
        fila.className = "nav-item";
        a = document.createElement("a");
        a.className = "nav-link";
        texto = document.createTextNode(element.name);

        a.append(texto);
        fila.append(a);

        nav.appendChild(fila);

    });

    // Funcion para crear las cards 
    cards = document.getElementById("Cards");
    seleccionado = document.getElementById("Seleccionado");

    datos.forEach((element) => {

        productos = element.products;

        productos.forEach((producto) => {
            card = document.createElement("div");
            card.className = "card";

            img = document.createElement("img");
            img.className = "card-img-top";
            img.src = producto.image;

            card_body = document.createElement("div");
            card_body.className = "card-body";

            h5 = document.createElement("h5");
            h5.className = "card-title";
            texto = document.createTextNode(producto.name);
            h5.append(texto);

            p = document.createElement("p");
            p.className = "card-text";
            texto2 = document.createTextNode(producto.description);
            p.append(texto2);

            a = document.createElement("a");
            texto = document.createTextNode(producto.price);
            a.append(texto);

            cards.append(card);
            cards.append(img);
            cards.append(card_body);
            cards.append(h5);
            cards.append(p);
            cards.append(a);

        });

    });


}