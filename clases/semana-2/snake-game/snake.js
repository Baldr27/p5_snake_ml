class Snake {
  
  // Constructor: inicializa la serpiente con un segmento en el centro del campo de juego.
  constructor() {
    this.body = []; // Array para almacenar los segmentos del cuerpo de la serpiente.
    this.body[0] = createVector(floor(w/2), floor(h/2)); // Posición inicial en el centro.
    this.xdir = 0; // Dirección inicial en el eje X.
    this.ydir = 0; // Dirección inicial en el eje Y.
    this.len = 0; // Longitud inicial de la serpiente.
  }
  
  // setDir: Establece la dirección de movimiento de la serpiente.
  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }
  
  // update: Actualiza la posición de la serpiente moviendo el cuerpo.
  update() {
    let head = this.body[this.body.length-1].copy(); // Copia la posición actual de la cabeza.
    this.body.shift(); // Elimina el segmento más antiguo del cuerpo.
    head.x += this.xdir * 20; // Mueve la cabeza en el eje X.
    head.y += this.ydir * 20; // Mueve la cabeza en el eje Y.
    this.body.push(head); // Añade la nueva posición de la cabeza al cuerpo.
  }
  
  // grow: Hace crecer la serpiente añadiendo un segmento al cuerpo.
  grow() {
    let head = this.body[this.body.length-1].copy(); // Copia la última posición de la cabeza.
    this.len++; // Aumenta la longitud de la serpiente.
    this.body.push(head); // Añade el nuevo segmento al cuerpo.
  }
  
  // endGame: Comprueba si la serpiente ha chocado consigo misma o con el borde del campo de juego.
  endGame() {
    let x = this.body[this.body.length-1].x; // Posición X de la cabeza.
    let y = this.body[this.body.length-1].y; // Posición Y de la cabeza.
    // Comprueba colisión con bordes.
    if(x > w-1 || x < 0 || y > h-1 || y < 0) {
       return true;
    }
    // Comprueba colisión consigo misma.
    for(let i = 0; i < this.body.length-1; i++) {
      let part = this.body[i];
      if(part.x == x && part.y == y) {
          return true;
      }
    }
    return false;
  }
  
  // eat: Determina si la serpiente ha comido una fruta.
  eat(pos) {
    let x = this.body[this.body.length-1].x; // Posición X de la cabeza.
    let y = this.body[this.body.length-1].y; // Posición Y de la cabeza.
    // Comprueba si la posición de la cabeza coincide con la fruta.
    if(x == pos.x && y == pos.y) {
      this.grow(); // Hace crecer la serpiente.
      return true;
    }
    return false;
  }
  
  // show: Dibuja la serpiente en el campo de juego.
  show() {
      for(let i = 0; i < this.body.length; i++) {
        fill(0); // Color de relleno para la serpiente.
        noStroke(); // Sin borde para los segmentos.
        rect(this.body[i].x, this.body[i].y, 20, 20); // Dibuja cada segmento del cuerpo.
    }
  }
}
