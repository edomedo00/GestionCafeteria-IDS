const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/cafeteria')
  .then(()=>console.log('Conectado a MongoDB'))
  .catch(err => console.log(`No se pudo conectar con MongoDB, ${err}`));

const usuarioSchema = new mongoose.Schema({
  usuario     : String,
  contrasena  : String
});

const pedidoSchema = new mongoose.Schema({
  producto    : String,
  precio      : Number,
  descripcion : String,
  fecha       : String,
  completado  : Boolean
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
const Pedido = mongoose.model('Pedido', pedidoSchema);

async function crearUsuario(usuario, contrasena){
  const nuevo_usuario = new Usuario({
    usuario   : usuario,
    contrasena: contrasena
  })
  await nuevo_usuario.save();
  //console.log(resultado);
}

async function crearPedido(producto, precio,  desc = null){
  var hoy = new Date().toISOString().split('T')[0];
  const nuevo_pedido = new Pedido({
    producto    : producto,
    precio      : precio,
    descripcion : desc,
    fecha       : hoy,
    completado  : false
  })
  await nuevo_pedido.save();
}


// Consultar usuarios 
async function leerUsuarios(){
  const usuarios = await Usuario.find();
  console.log(usuarios);
}

// Consultar pedidos de hoy
async function leerPedidos(){
  var hoy = new Date().toISOString().split('T')[0]
  console.log(hoy);
  const pedidos = await Pedido.find({fecha:hoy});
  console.log(pedidos);
}

crearUsuario('cocina','cocina');
crearPedido('Comida del día', 60);
crearPedido('Torta mexicana', 50, 'Sin cebolla');

leerUsuarios();
leerPedidos();
