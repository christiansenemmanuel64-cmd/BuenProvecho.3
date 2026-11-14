const FOTO_VACIA = 'https://placehold.co/300x400?text=Sin+Foto';
const USER_EMAIL = 'alumno@escuela.edu.ar'; // hasta el TP6, que usa el usuario logueado
const formRestaurante = document.getElementById('form-restaurante');
const mensaje = document.getElementById('mensaje');
const btnSubmit = document.getElementById('btn-submit');
const valor = (id) => document.getElementById(id).value.trim();

function avisar(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = 'mensaje ' + tipo;
}

async function subirFoto(archivo) {
  const ext = archivo.name.split('.').pop();
  const ruta = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('fotos').upload(ruta, archivo);
  if (error) throw new Error('No se pudo subir la foto: ' + error.message);
  return supabase.storage.from('fotos').getPublicUrl(ruta).data.publicUrl;
}

formRestaurante.addEventListener('submit', async (e) => {
  e.preventDefault();
  btnSubmit.disabled = true;
  try {
    const archivo = document.getElementById('imagen-file').files[0];
    const nuevaRestaurante = {
      nombre: valor('nombre'),
      cocina: valor('cocina'),
      puntuacion: parseFloat(valor('puntuacion')),
      resena: valor('resena'),
      imagen_url: archivo ? await subirFoto(archivo) : FOTO_VACIA,
      user_email: USER_EMAIL
    };
    const { error } = await supabase.from('restaurantes').insert([nuevaRestaurante]);
    if (error) throw new Error('No se pudo guardar: ' + error.message);
    avisar('¡Restaurante guardado con éxito!', 'ok');
    formRestaurante.reset();
    
  } catch (err) {
    avisar(err.message, 'error');
  } finally {
    btnSubmit.disabled = false;
  }
});
