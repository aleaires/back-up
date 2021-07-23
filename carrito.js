/*alert("bienvenido a la tienda Online");

alert("Este simulador interactivo pretende simular una tienda online mediante el prompt y alert");

let costo = 0;
let carrito = [];
let objetos = [["robertito 1",20],["robertito 2",600],["robertito 3",100],["robertito 4",50],["robertito 5",10]];
let objeto = "";
let respuesta = 0;


while(respuesta != "ESC"){

	//guardo en respuesta la decicion del cliente
	respuesta = prompt("Que desea hacer \n 1-Comprar \n 2-Quitar del carrito \n Costo: " + costo + "\n objetos en carrito: " + carrito);


	//el usuario quiere comprar
	if(respuesta == 1){
		//pregunto que es lo que se quiere comprar
		objeto = prompt("¿Qué deseas comprar?\n 0- Robertito 1: $20 \n 1- Robertito 2: $600 \n 2- Robertito 3: $100 \n 3- Robertito 4: $50 \n 4-  Robertito 5: $10");
		cant = prompt("Cuantos de ese objeto deseas comprar?");
		while(cant <= 0 || cant > 10){
			alert("Ingrese cantidad entre 1 y 9");
			cant = prompt("Cuantos de ese objeto deseas comprar?");
		}
		if(costo >= 20000){
			alert("Ha alcanzado el limite de costo en el carrito");
		}else if(costo >= (objetos[objeto][1] * cant) && carrito.length >= 10){
			alert("ya tiene muchos objetos en el carrito");
		}else {
			compra_realizada(cant,objetos[objeto][1]);
			agregar_objeto(objetos[objeto][0],carrito,cant)
		}


	//el usuario quiere vender
	}else if (respuesta == 2) {
		//pregunto que es lo que se quiere vender
		objeto = prompt("¿Qué deseas quitar del carrito? (ingrese nombre del articulo)\n objetos en carrito: " + carrito);
		let boolean = buscar_objeto(objeto,carrito);
		if(!boolean){
			alert("No existe ese elemento");
		}else{
			alert("Elemento eliminado del carrito con éxito");
			venta_realizada((objetos[indice(objeto,objetos)][1]));
			quitar_objeto(objeto,carrito);
		}
	}
}

//esta función modifica el costo actual
function compra_realizada(cantidad, precio){
	alert("Elemento agregado al carrito con éxito");
	costo = costo + (precio * cantidad);	
}

//esta función modifica el costo actual
function venta_realizada(precio){
	costo = costo - precio;
}

//retira un elemento del array
function quitar_objeto(object,array){
	object = object.toLowerCase();
	let i = 0;
	while(array.length - 1 >= i && array[i] != object){
		i++;
	}
	if(array[i] == object){
		array.splice(i,1);
	}else{
		alert("No se encontro ese objeto en la carrito")
	}
}

//agrega al final del array un elemento
function agregar_objeto(object,array,cantidad){
	for(let i=0; i < cantidad;i++){
		array.push(object);
	}
}

//busca un elemento en un array
function buscar_objeto(object,array){
	object = object.toLowerCase();
	let i = 0;

	while(i <= array.length - 1 && array[i] != object){
		i++;
	}
	if(array[i] == object){
		return true;
	}else{
		return false;
	}
}


//busco el indice del elemento
function indice(elem,array){
	elem = elem.toLowerCase();
	let i = 0;
	while(i-1 <= array.length && array[i][0] != elem){
		i++;
	}
	return i;
}

*/




/////   variables html :: carrito

let pedidos = [];
let costo = 0;
let carrito = [[]];
let objetos = [["btn_1","acostado",330],["btn_2","leyendo 1",420],["btn_3","leyendo 3",480],["btn_4","meditando",370],["btn_5","sabios",450],["btn_6","sentado",330]];
let objeto = "";
let respuesta = 0;
let total = 0;
let din = document.getElementById("dinero");
let chart = document.getElementById("carrito");
let currency = "UYU";


//evento add to chart

function modify_chart(amount,nombre){
	total = total + amount;
	din.textContent = total;
	let i = 0;
	let objetosCarrito = document.getElementById("objetos_carrito");
	while(i <= carrito.length - 1 && carrito[i][0] != nombre){
		console.log(carrito[i][0]);
		i++;
	}
	if (i == carrito.length) {
		carrito.push([document.getElementById(nombre).innerHTML.toLowerCase(),1]);
		let nuevoItem = objetosCarrito.appendChild(document.createElement('li'));
		nuevoItem.setAttribute('id', 'carrito_' + nombre);
		nuevoItem.textContent = nombre + "(" + carrito[i][1] + ")";

	}else{
		carrito[i][1] += 1;
		document.getElementById('carrito_' + nombre).textContent = nombre + "(" + carrito[i][1] + ")";
	}
}

//remover objetos del carrito
function remove_from_chart(nombre){
	let item = document.getElementById("objetos_carrito").getElementById('carrito_' + nombre);
	item.remove();
}

//Conversion de pesos a dolares
function change_currency(amount){
	if(document.getElementById("currency").innerHTML == "UYU"){
		din.textContent = Math.round((amount / 43.88)*100)/100;
		document.getElementById("currency").textContent = "USD";
		document.getElementById("currency_text_btn").textContent = "UYU";
	}else if (document.getElementById("currency").innerHTML == "USD"){
		din.textContent = Math.round((amount * 43.88));
		document.getElementById("currency").textContent = "UYU";
		document.getElementById("currency_text_btn").textContent = "USD";
	}
}


//evento agregar dinero y objetos al carrito al clickear "Agregar al carrito"
document.querySelector("body").addEventListener("click", function (e){
	for (var i = objetos.length - 1; i >= 0; i--) {
		if (objetos[i][0] == e.target.getAttribute("id")) {
			modify_chart(objetos[i][2],objetos[i][1]);
		}
	}

});

//evento agregar dinero y objetos al carrito al clickear "Agregar al carrito"
document.querySelector("body").addEventListener("click", function (e){
	if ('carrito_acostado' == e.target) {
	remove_from_chart(e.target);}
});

//evento cambio de moneda
document.getElementById("currency_btn").addEventListener("click", function (e){
	change_currency(document.getElementById("dinero").innerHTML);
});

console.log("hola");

