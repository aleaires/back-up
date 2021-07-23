///////////////////////////////////////////////////////////
//////             variables globales              ////////
///////////////////////////////////////////////////////////

var moneda = "UYU";
var dolar = 44;
var usuarios = [];
let productos = [];
let respuesta = 0;
let ingreso = false;
let carritos = [];
let persona; 


///////////////////////////////////////////////////////////
//////             clases y objetos                ////////
///////////////////////////////////////////////////////////

//////             carrito                ////////

function carrito(articulos,cantidades){
	this.articulos = articulos;
	this.cantidades = cantidades;
}

//////             clases usuario                ////////

class usuario{
	constructor(nombre,apellido,usuario,contrasena){
		this.nombre = nombre;
		this.apellido = apellido;
		this.usuario = usuario;
		this.contrasena = contrasena;
	}
}

class cliente extends usuario{

	constructor(nombre,apellido,usuario,contrasena,carrito,total){
		super(nombre,apellido,usuario,contrasena);
		this.carrito = carrito;
		this.total = total;
	}

	aumentar_total(monto){
		this.total = this.total + monto;
	}

	disminuir_total(monto){
		this.total = this.total + monto;
	}

	agregar_al_carrito(articulo){
		let i = 0;
		while(i <= this.carrito.articulos.length - 1 && this.carrito.articulos[i] != articulo){
			i++;
		}
		if (i == this.carrito.articulos.length) {
			this.carrito.articulos.push(articulo);
			this.carrito.cantidades.push(1);
		}else{
			this.carrito.cantidades[i] += 1;
		}
	}

	quitar_del_carrito(articulo){
		let i = 0;
		while(i <= this.carrito.articulos.length - 1 && this.carrito.articulos[i] != articulo){
			i++;
		}
		if(this.carrito.articulos[i] == articulo){
			this.carrito.articulos.splice(i,1);
			this.carrito.cantidades[i] -= 1;
			if(this.carrito.cantidades[i] == 0){
				this.carrito.cantidades.splice(i,1);
			}
		}else{
			console.log("El articulo no se encontro en el carrito");
		}
	}

}

class administrador extends usuario{
	constructor(){
		super();
	}
}


/////             clases productos                ////////


class producto{
	constructor(nombre,precio){
		this.nombre = nombre;
		this.precio = precio;
	}
}



///////////////////////////////////////////////////////////
//////             funciones globales                 /////
///////////////////////////////////////////////////////////

function buscar_usuario_existente(user){
	let i = 0;
	while(i <= usuarios.length - 1 && usuarios[i].usuario != user){
		i++;
	}if(usuarios[i] == user){
		return true;
	}else{
		return false;
	}
}

function posicion_usuario(user){
	let i = 0;
	while(i <= usuarios.length - 1 && usuarios[i].usuario != user){
		i++;
	}
	if(usuarios[i].usuario == user){
		return i;
	}
}


function registrarse(){
	let nombre = prompt("Ingrese su nombre:");
	nombre = nombre.toLowerCase();
	let apellido = prompt("Ingrese su apellido:");
	apellido = apellido.toLowerCase();
	let user = prompt("Ingrese su usuario:");
	user = user.toLowerCase();
	while(buscar_usuario_existente(user)){
		alert("Usuario ya existente, ingrese uno diferente");
	}
	let contrasena = prompt("Ingrese su contrasena:");
	let valid_contrasena = prompt("Ingrese nuevamente su contrasena:");
	if(contrasena != valid_contrasena){
		alert("las contraseñas ingresadas no coinciden, intente nuevamente.");
	}else{
		carritos[carritos.length] = new carrito([],[]);
		usuarios[usuarios.length] = new cliente(nombre,apellido,user,contrasena,carritos[carritos.length-1], 0);
		alert("Registrado con exito!");
		ingreso = true;
	}
}

function ingresar(){
	if(!ingreso){
		let user = prompt("ingrese nombre de usuario:");
		if(!buscar_usuario_existente(user)){
			let contra = prompt("ingrese contraseña:");
			if(usuarios[posicion_usuario(user)].contrasena == contra.toLowerCase()){
				ingreso = true;
				alert("Ha ingresado con exito");
				return usuarios[posicion_usuario(user)];
			}else{
				alert("Contraseña o usuario incorrecto");
			}
		}else{
			let contra = prompt("ingrese contraseña:");
			alert("Contraseña o usuario incorrecto");
		}
	}else{
		alert("ya ingreso");
	}
}


function cambiar_moneda(amount){
	if(moneda == "UYU"){
		amount = Math.round((amount / dolar)*100)/100;
		moneda == "USD";
	}else if (moneda == "USD"){
		amount = Math.round((amount * dolar));
		moneda == "USD";
	}
}


///////////////////////////////////////////////////////////
//////             Programa principal                 /////
///////////////////////////////////////////////////////////

/*
usuarios[0] = new usuario("pepito","gonzales","pepito1", "123");
usuarios[2] = registrarse();*/


////inicializo un usuario
carritos[0] = new carrito([],[]);

usuarios[0] = new cliente("Jose", "Gonzales", "jose.123", "123", carrito[0], 0);

//////Inicializo 3 productos que van a actuar como base de dato
productos[0] = new producto("Robert leyendo 1",80);
productos[1] = new producto("Robert leyendo 3",100);
productos[2] = new producto("Robert sentado",150);

alert("Bienvenidos a la tienda Online");

function main(){
	do{
	if(!ingreso){
		alert("Bienvenido!");
		respuesta = prompt("En que lo podemos ayudar? \n 1- Ingresar con cuenta de usuario \n 2- Registrarme \n 3- Realizar una consulta \n 4- salir");
	}else{
		alert("Bienvenido de nuevo!");
		respuesta = prompt("En que lo podemos ayudar " + persona.nombre + " " + persona.apellido + "? \n 1- Agregar producto a carrito \n 2- Quitar producto del carrito\n 3- ver carrito de compras\n 4- Log out");
	}
	switch(respuesta) {
  	case "1":
  		if(!ingreso){
  			persona = ingresar();
  		}else{
			respuesta = prompt("Que producto desea agregar al carrito? \n 1- Robert leyendo 1 \n 2- Robert leyendo 3 \n 3- Robert sentado");
			switch(respuesta){
				case 1:
					agregar_al_carrito(productos[0]);
					alert("elemento agregado con exito!");
				break;
				case 2:
					agregar_al_carrito(productos[1]);
					alert("elemento agregado con exito!");
				break;
				case 3:
					agregar_al_carrito(productos[2]);
					alert("elemento agregado con exito!");
				break;
				default:
					alert("no existe esa opcion");
			}
  		}
    	
    	break;
  	case "2":
  		if(!ingreso){	
    		registrarse();
    		persona = usuarios[usuarios.length - 1];
  		}else{
  			respuesta = prompt("Que producto desea quitar al carrito? \n" );
  		}
    	break;
    case "3":
    	if(!ingreso){
    		dejar_nota();
    	}else{
    		mostrar_carrito();
    	}
    	break;
    case "4":
    	if(!ingreso){
    		return 0;
    	}else{
    		ingreso = false;
    	}
    	break;
    default:
		break;
    }
	}while(respuesta != 1 && respuesta != 2 && respuesta != 3 && respuesta != 4 )
	
}

while(respuesta != "n"){
	main();
	respuesta = prompt("Quieres continuar? s/n")
}
