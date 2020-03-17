function setup() {
  createCanvas(400,400);
  background(0); // o fundo preto só será desenhado uma vez
}

function draw() {
  
  translate(width/2, height/2); //os vetores serão desenhados a partir do centro 

  //let v = createVector(random(-100,100), random(-100,100));

  v = p5.Vector.random2D(); // cria um vetor unitario 2D 
  v.mult(random(50, 100)); // multiplicação escalar do vetor v por um valor que varia entre 50 e 100 (forma de escalar o vetor para um tamanho qualquer)

  strokeWeight(4);
  stroke(255, 50);
  line(0, 0, v.x, v.y);

}