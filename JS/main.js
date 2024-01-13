let flag = true;


const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

const mostrarRemeras = document.getElementById("mostrarRemeras");

mostrarRemeras.addEventListener("click", ()=>{

    
    if (!mostrarRemeras[0]){
        const container = document.getElementById("container");
    if (productosCarrito[0]){
        container.innerText = "";
    }
    

    remeras.forEach(el => {
        const cardRemera = document.createElement("div");
        cardRemera.className = "remeraJS";
    
        const nombreRemera = document.createElement("h3");
        nombreRemera.innerText = el.name;
    
        const botonAgregarCarritoRemera = document.createElement("button");
        botonAgregarCarritoRemera.innerText = "Añadir al Carrito";
        botonAgregarCarritoRemera.className = "botonRemera";
        //botonAgregarCarritoRemera.onclick(console.log("Se añadio al carrito"));
    
        const imgRemera = document.createElement("img");
        imgRemera.className = "remeraImgJS";
        imgRemera.src = el.url;
    
        cardRemera.appendChild(imgRemera);
        cardRemera.appendChild(nombreRemera);
        cardRemera.appendChild(botonAgregarCarritoRemera);
    
    
    
        container.appendChild(cardRemera);

        botonAgregarCarritoRemera.addEventListener("click",()=>{


            productosCarrito.push(el);
            

        })

    })


    }

    
})







const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click",()=>{
    

    container.innerText = "";
    
    productosCarrito.forEach(el => {
        const cardRemera = document.createElement("div");
        cardRemera.className = "remeraJS";
    
        const nombreRemera = document.createElement("h3");
        nombreRemera.innerText = el.name;
    
        const botonAgregarCarritoRemera = document.createElement("button");
        botonAgregarCarritoRemera.innerText = "Quitar del Carrito";
        botonAgregarCarritoRemera.className = "botonRemera";
        //botonAgregarCarritoRemera.onclick(console.log("Se añadio al carrito"));
    
        const imgRemera = document.createElement("img");
        imgRemera.className = "remeraImgJS";
        imgRemera.src = el.url;
    
        cardRemera.appendChild(imgRemera);
        cardRemera.appendChild(nombreRemera);
        cardRemera.appendChild(botonAgregarCarritoRemera);
    
    
    
        container.appendChild(cardRemera);

    })

    localStorage.setItem("carrito",JSON.stringify(productosCarrito));
    
})





