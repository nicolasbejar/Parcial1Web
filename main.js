//------------------------------------------------------
//Variables
//------------------------------------------------------
let productoscarrito = 0;
let selected = "";
let datos;
let carrito = [];
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

    //Asignarle al carrito de compra el eventlistener
    carritolistener();

    // Funcion para crear el nav 
    crearNav();

    // Funcion para crear las cards 
    crearCards("Burguers");

    //Funcion para incializar el cancel y confirm
    inicializarCancelConfirm();
}

//Funcion para crear el listener del carrito de compras
function carritolistener() {
    let tarjetas = document.getElementById("Cards");
    let carrito = document.getElementById("Carrito");
    let seleccionado = document.getElementById("Seleccionado");
    let order = document.getElementById("Order");
    order.style.display = "none";

    carrito.onclick = function() {
        if (tarjetas.innerHTML !== "") {
            tarjetas.innerHTML = "";
            seleccionado.innerHTML = "ORDER DETAIL";
            order.style.display = "block";
            renderizar();
        } else {
            tarjetas.style.display = "block";
        }
    };
}

//Funcion para crear el nav
function crearNav() {
    nav = document.getElementById("Textos");
    datos.forEach((element) => {
        fila = document.createElement("li");
        fila.className = "nav-item";
        fila.id = element.name;

        fila.addEventListener('click', function() {
            selected = this.id;
            carritolistener();
            cambiarCategoria(selected);
        });

        a = document.createElement("a");
        a.className = "nav-link";

        texto = document.createTextNode(element.name);

        a.append(texto);
        fila.append(a);

        nav.appendChild(fila);

    });
}

// Funcion para crear las cards 
function crearCards(categoria) {

    let cards = document.getElementById("Cards");

    cards.innerHTML = '';
    datos.forEach((element) => {
        if (element.name == categoria) {
            productos = element.products;

            productos.forEach((producto) => {
                column = document.createElement("div");
                column.className = "col-12 col-lg-3 columna-card";

                card = document.createElement("div");
                card.className = "card ";

                img = document.createElement("img");
                img.className = "card-img-top";
                img.src = producto.image;
                img.id = "ImagenCard";

                card_body = document.createElement("div");
                card_body.className = "card-body d-flex flex-column";

                h5 = document.createElement("h5");
                h5.className = "card-title text-center";
                texto = document.createTextNode(producto.name);
                h5.append(texto);

                p = document.createElement("p");
                p.className = "card-text";
                texto2 = document.createTextNode(producto.description);
                p.append(texto2);

                precio = document.createElement("p");
                texto = document.createTextNode("$" + producto.price);
                precio.append(texto);
                precio.id = "Precio";

                boton = document.createElement('a');
                boton.className = 'btn card-button mt-auto';
                boton.innerText = 'Add to cart';
                boton.addEventListener('click', function() {
                    agregarAlCarrito(producto);
                })

                card_body.appendChild(h5);
                card_body.appendChild(p);
                card_body.appendChild(precio);
                card_body.appendChild(boton);

                card.appendChild(img);
                card.appendChild(card_body);

                column.appendChild(card);
                cards.appendChild(column);

            });
        }
    });
}

//Funcion para cambiar de categoria
function cambiarCategoria(categoria) {
    seleccionado = document.getElementById("Seleccionado");
    seleccionado.innerHTML = categoria.toUpperCase();

    crearCards(categoria);

}

//Esta funcion agrega un elemento al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.log(carrito);
    items = document.getElementById("Items");
    productoscarrito = carrito.length;
    items.innerHTML = carrito.length + ' items';

}

//Funcion para poder generar la tabla de Orden
function generarOrden() {
    let products = Array();
    let orden = Array()
    datos.forEach((element) => {
        element.products.forEach((prod) => {
            products.push(prod)
        });
    });
    let item_id = 0
    products.forEach(prod => {
        let qty_item = carrito.filter(x => x == prod).length
        if (qty_item > 0) {
            item_id++;
            orden.push({ item: item_id, prod: prod, qty: qty_item })
        }
    });
    return orden;
}


//Funcion para renderizar el Order Detail
function renderizar() {
    document.getElementById("Order").style.display = "";
    let table_body = document.getElementById("OrderBody")
    table_body.innerHTML = ""

    let total = 0;
    let orden = generarOrden();

    orden.forEach((product) => {

        let text1 = document.createTextNode(product.item)
        let text2 = document.createTextNode(product.qty)
        let text3 = document.createTextNode(product.prod.name)
        let text4 = document.createTextNode(product.prod.price)
        let text5 = document.createTextNode(Math.round(product.prod.price * product.qty * 100) / 100);

        let fila = document.createElement("tr")
        let item = document.createElement("th")
        let qty = document.createElement("td")
        let description = document.createElement("td")
        let unit = document.createElement("td")
        let amount = document.createElement("td")
        let modify = document.createElement("td")
        let agregarbut = document.createElement("button")
        let eliminarbut = document.createElement("button")

        agregarbut.innerHTML = "+"
        eliminarbut.innerHTML = "-"
        agregarbut.className = "checkout-button";
        eliminarbut.className = "checkout-button";

        agregarbut.onclick = () => {
            agregarAlCarrito(product.prod);
            renderizar();
        }

        eliminarbut.onclick = () => {
            let removed = carrito.splice(carrito.indexOf(product), 1)
            if (removed) {
                productoscarrito--;
                if (productoscarrito == 0) {
                    total = 0;
                }
                document.getElementById("Items").innerHTML = productoscarrito + " Items";
            }
            renderizar();
        }

        item.appendChild(text1)
        qty.appendChild(text2)
        description.appendChild(text3)
        unit.appendChild(text4)
        amount.appendChild(text5)
        modify.appendChild(agregarbut)
        modify.appendChild(eliminarbut)

        fila.appendChild(item)
        fila.appendChild(qty)
        fila.appendChild(description)
        fila.appendChild(unit)
        fila.appendChild(amount)
        fila.appendChild(modify)

        table_body.appendChild(fila)

        console.log("tot: ", total);
        total = total + (product.prod.price * product.qty)
        console.log("tot: ", total);



    });
    document.getElementById("TotPrecio").innerHTML = "Total:$" + Math.round(total * 100) / 100

}


//Funcion para Inicializar Cancel y Confirm
function inicializarCancelConfirm() {
    let cancel = document.getElementById("Cancel");
    let confirm = document.getElementById("Confirm");
    let terminar = document.getElementById("Terminar");
    let continuar = document.getElementById("Continuar");

    const popup = document.querySelector('.popup-wrapper');

    continuar.onclick = () => {
        popup.style.display = 'none';
        console.log("continuar")

    };

    cancel.onclick = () => {
        popup.style.display = 'block';
    };

    terminar.onclick = () => {
        console.log("terminar")
        document.getElementById("Items").innerHTML = "";
        carrito = [];
        productoscarrito = 0;
        popup.style.display = 'none';
        renderizar();
    };

    confirm.onclick = () => {
        console.log("confirm")
        let summary = generarOrden();
        let output = Array();
        summary.forEach(element => {
            output.push({ item: element.item, quantity: element.qty, description: element.prod.name, unitPrice: element.prod.price })
        });
        console.log(output);
    }

    popup.addEventListener('click', e => {
        if (e.target.className === 'popup-wrapper') {
            popup.style.display = 'none';
        }
    });

}