let flag = true;
let auxStockM = 0;
let auxStockS = 0;
let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
let dataRemerasM,auxArr;

const fetchRemera = async() => {
  try{
  const resp = await fetch("./JS/remerasM.json");
  const data = await resp.json();
  return data;

}catch(err){
  Swal.fire({
    icon: "warning",
    title: "Ha ocurrido un problema",
    text: "Intente de nuevo mas tarde"
  });
}
};

const mostrarRemeras = document.getElementById("mostrarRemeras");

cargarRemeras();

mostrarRemeras.addEventListener("click", ()=>{
    cargarRemeras();
})

async function cargarRemeras(){

      const data = await fetchRemera();
      dataRemerasM = data;

    if (!mostrarRemeras[0]){
        const container = document.getElementById("container");
        container.innerText = "";

        const remerasMMostrarTrue = dataRemerasM.filter(el => el.mostrar == true);

            remerasMMostrarTrue.forEach(el => {
                const cardRemera = document.createElement("div");
                cardRemera.className = "remeraJS";
            
                const nombreRemera = document.createElement("h3");
                nombreRemera.innerText = el.name;

                const precioRemera = document.createElement("h4");
                precioRemera.innerText = `$${el.precio}`
            
                const botonAgregarCarritoRemera = document.createElement("button");
                botonAgregarCarritoRemera.innerText = "Añadir al Carrito";
                botonAgregarCarritoRemera.className = "botonRemera";

            
                const imgRemera = document.createElement("img");
                imgRemera.className = "remeraImgJS";
                imgRemera.src = el.url;

                imgRemera.addEventListener("mouseover",()=>{
                  if (imgRemera.src !== el.url2){
                    setTimeout(() => {
                      imgRemera.src = el.url2;
                    },100);
                  }
                });
                imgRemera.addEventListener("mouseout",()=>{
                  if (imgRemera.src == el.url2){

                      imgRemera.src = el.url;

                  }
                });

                cardRemera.appendChild(imgRemera);
                cardRemera.appendChild(nombreRemera);
                cardRemera.appendChild(precioRemera);
                cardRemera.appendChild(botonAgregarCarritoRemera);
                
                
            
                container.appendChild(cardRemera);

                botonAgregarCarritoRemera.addEventListener("click",()=>{
                  
                  elegirTalle(el);

                })

            })
        }
}
// });

function elegirTalle(el){
  (async () => {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          "M": "M",
          "S": "S",
        });
      }, 400);
    });
    
    const { value: talle } = await Swal.fire({
      title: "Elige un talle",
      input: "radio",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#2d63c8",
      inputOptions,
      inputValidator: (value) => {

        if (!value) {
          return "Elige un talle por favor";
        }
      }
      
    });

    if (talle == "M"){
      el = dataRemerasM.find(el2 => ((el2.mostrar === false) && (el2.name === el.name) && (el2.talle === "M")));

      auxStockM = el.stock;
    }
      auxStockS = el.stock;
      descontarTalle(el,talle);

  })()
}

function descontarTalle(obj,talle){

  if (talle !== undefined){

    if(obj.stock == 0){

      Swal.fire({
        icon: "error",
        title: "LO SENTIMOS :(",
        text: "Nos quedamos sin este talle, elige otro por favor",
        showConfirmButton: false,
      });

        setTimeout(function(){
          elegirTalle(obj);
        }, 1500);

    }else{

      Swal.fire({ title: `HAZ ELEGIDO TALLE: ${talle}`,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#2d63c8", });

      obj.stock -= 1;
      obj.incrementadorCantidad += 1;
    
       const productoAAgregar = dataRemerasM.find(el => el.id === obj.id);

       if(!productosCarrito.some(el => el.id === obj.id)){
        productosCarrito.push(productoAAgregar);
       };
       const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Agregando Producto al carrito"
      });
      
      localStorage.setItem("carrito",JSON.stringify(productosCarrito));

    }

}

}







const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click",()=>{
    
    container.innerText = "";
    
    productosCarrito.forEach(el => {
        const cardRemera = document.createElement("div");
        cardRemera.className = "remeraJS";
        
        const nombreRemera = document.createElement("h3");
        nombreRemera.innerText = el.name;
        
    

        const cardTalle = document.createElement("h3");
        cardTalle.innerText = `Talle: ${el.talle}`;

        const precioRemera = document.createElement("h4");
        precioRemera.innerText = `$${el.precio}`;

        const botonQuitarCarritoRemera = document.createElement("button");
        botonQuitarCarritoRemera.innerText = "Quitar del Carrito";
        botonQuitarCarritoRemera.style = "display: block;margin:auto";

    
        const imgRemera = document.createElement("img");
        imgRemera.className = "remeraImgJS";
        imgRemera.src = el.url;
    

        const textCantidadRemera = document.createElement("h4");
        textCantidadRemera.innerText = `Cantidad: ${el.incrementadorCantidad}`;
        textCantidadRemera.className = "contadorRemeras";

        

        
        const sumarOtraRemera = document.createElement("button");
        sumarOtraRemera.innerText = "+";
        sumarOtraRemera.className = "botonSumarOtraRemera";
        const restarOtraRemera = document.createElement("button");
        restarOtraRemera.innerText = "-";
        restarOtraRemera.className = "botonRestarOtraRemera";



        cardRemera.appendChild(imgRemera);
        cardRemera.appendChild(nombreRemera);

        cardRemera.appendChild(cardTalle);
        
        cardRemera.appendChild(precioRemera);

        cardRemera.appendChild(textCantidadRemera);

        cardRemera.appendChild(sumarOtraRemera);
        cardRemera.appendChild(restarOtraRemera);

        cardRemera.appendChild(botonQuitarCarritoRemera);
    
        
        container.appendChild(cardRemera);

        
        botonQuitarCarritoRemera.addEventListener("click",()=>{

          
          if (productosCarrito.length == 0){
            footer.removeChild(finalizarCompra);
          }

          if (el.mostrar == true){
            el.stock = auxStockS;

          }else{
            el.stock = auxStockM;

          }
            
            el.incrementadorCantidad = 0;
            const el2 = el;
            
            const found = el => el.id == el2.id;
            
            const index = productosCarrito.findIndex(found);
             productosCarrito.splice(index, 1);

             container.removeChild(cardRemera);
      
             localStorage.setItem("carrito",JSON.stringify(productosCarrito));

             if (productosCarrito.length == 0){
              footer.removeChild(finalizarCompra);
            }
        })

        sumarOtraRemera.addEventListener("click",()=>{

          if (el.stock >0) {
            el.incrementadorCantidad += 1;
            el.stock -= 1;
            textCantidadRemera.innerText = `Cantidad: ${el.incrementadorCantidad}`;
          }

        })

        restarOtraRemera.addEventListener("click",()=>{

          if (el.incrementadorCantidad > 1) {     
            el.incrementadorCantidad -= 1;
            el.stock += 1;
            textCantidadRemera.innerText = `Cantidad: ${el.incrementadorCantidad}`;
          }

        })


    })

    const finalizarCompra = document.createElement("button");
    finalizarCompra.innerText = "Finalizar Compra";
    finalizarCompra.className = "footer-container";
    finalizarCompra.id = "finalizar";

      if (productosCarrito.length !== 0 && document.getElementById("finalizar") == null){
        footer.appendChild(finalizarCompra);

      let totalPrecio = 0;
        finalizarCompra.addEventListener("click",()=>{

        productosCarrito.forEach(el => {
          totalPrecio = totalPrecio + parseFloat(el.precio*el.incrementadorCantidad);
        });
            
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "ESTAS POR FINALIZAR LA COMPRA",
        text: `TOTAL A PAGAR: $${totalPrecio}`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "CONFIRMAR",
        cancelButtonText: "Salir",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Compra Exitosa!",
            text: "Esperamos volver a verte",
            icon: "success"
          });
          productosCarrito = [];
          localStorage.setItem("carrito",JSON.stringify(productosCarrito));
            const element = document.getElementById("container");
            while (element.firstChild) {
              element.removeChild(element.firstChild);
            };
            footer.removeChild(finalizarCompra);
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Todavia puedes comprar!",
            text: "Mantendremos tus productos en tu carrito!",
            icon: "warning"
          });
        }
      });
      totalPrecio = 0;
    })
    }
})

