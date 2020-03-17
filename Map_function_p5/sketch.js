var r;
var b;

function setup() {
  createCanvas(600,400);

}

function draw() {

  // A função map realiza o mapeamento de um intervalo para algum outro nesse caso
  r = map(mouseX, 0, 600, 0, 255); // mapeia o range 0-600 do canvas para o range 0-255 da cor
  b = map(mouseX, 0, 600, 255, 0); // maperia o range 0-600 do canvas para o range 255-0 da cor
  
  background(r, 0, b);


}