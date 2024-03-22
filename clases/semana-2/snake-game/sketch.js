// Variables globales para la serpiente, resolución de la cuadrícula, comida, y dimensiones de la cuadrícula.
let snake;
let rez = 1; // Factor de resolución para escalar todo el juego.
let food;
let w; // Ancho del campo de juego en "unidades" de juego, no en píxeles.
let h; // Altura del campo de juego en "unidades" de juego, no en píxeles.
let video;
let classifier;
let model = "https://teachablemachine.withgoogle.com/models/-wjKXpgHp/";

function preload(){
  classifier = ml5.imageClassifier(model);
}

// Función de configuración inicial para p5.js, se llama una vez al inicio.
function setup() {
  createCanvas(720, 480); // Crea un lienzo de 400x400 píxeles.
  w = floor(width / rez); // Calcula el ancho del campo de juego en unidades de juego.
  h = floor(height / rez); // Calcula la altura del campo de juego en unidades de juego.
  frameRate(5); // Establece la velocidad del juego a 5 cuadros por segundo.
  snake = new Snake(); // Crea una nueva instancia de la serpiente.
  foodLocation(); // Coloca la comida en una ubicación inicial aleatoria.

  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function classifyVideo(){
  classifier.classify(video, gotResults);
}

function gotResults(error, results){
  if(error){
    console.error(error);
    return;
  }
  console.log(results);

  if(results[0].label === "Up"){
    snake.setDir(0, -1); // Mueve hacia arriba.
  }else if(results[0].label === "Down"){
    snake.setDir(0, 1); // Mueve hacia abajo.
  }else if(results[0].label === "Left"){
    snake.setDir(-1, 0); // Mueve hacia la izquierda.
  }else if(results[0].label === "Right"){
    snake.setDir(1, 0); // Mueve hacia la derecha.
  }

  classifyVideo();
}

// Genera una nueva ubicación para la comida en el campo de juego.
function foodLocation() {
  let x = floor(random(w)); // Posición aleatoria en el eje X.
  let y = floor(random(h)); // Posición aleatoria en el eje Y.
  food = createVector(x, y); // Crea un vector para la posición de la comida.
}

// Función que se llama cada vez que se presiona una tecla.
function keyPressed() {
  // Cambia la dirección de la serpiente basándose en la tecla presionada.
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0); // Mueve hacia la izquierda.
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0); // Mueve hacia la derecha.
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1); // Mueve hacia abajo.
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1); // Mueve hacia arriba.
  } else if (key == ' ') {
    snake.grow(); // Hace crecer la serpiente al presionar la barra espaciadora.
  }
}

// Función de dibujo que p5.js llama en bucle para animar el juego.
function draw() {
  scale(rez); // Escala todo el dibujo por el factor de resolución.
  background(0); // Establece el color de fondo del lienzo.
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  if (snake.eat(food)) {
    foodLocation(); // Si la serpiente come la comida, genera una nueva ubicación para la comida.
  }
  snake.update(); // Actualiza la posición de la serpiente.
  snake.show(); // Dibuja la serpiente en el lienzo.

  // Comprueba si el juego ha terminado (la serpiente choca consigo misma o con el borde).
  if (snake.endGame()) {
    print("END GAME"); // Imprime un mensaje en la consola.
    background(255, 0, 0); // Cambia el color de fondo a rojo para indicar el fin del juego.
    noLoop(); // Detiene el bucle de dibujo, finalizando el juego.
  }

  // Dibuja la comida en el campo de juego.
  noStroke(); // No dibuja bordes para la comida.
  fill(255, 0, 0); // Establece el color de la comida a rojo.
  rect(food.x, food.y, 20, 20); // Dibuja la comida como un cuadrado.
}
