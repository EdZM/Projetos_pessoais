// aplicação que desenha uma arvore fractal simples partindo de um ramo e gerando novos recursivamente
var angle = 0;
var stroke_weight_cnt = 0;
var slider;


function setup() {
  createCanvas(400,400);
  slider = createSlider(0, TWO_PI, PI/4, 0.01); // cria uma barra de slide na tela setando o intervalo de 0 a 2pi usando o value pi/4 e o step size de 0.01(variação do slider) 
                                                // por consequencia gera um valor de angulo dependendendo da posição do slider para usar na função rotate()

}

function draw() {
  background(51);
  angle = slider.value();
  
  stroke_weight_cnt = 60; // largura da linha a ser desenhada em pixels
  stroke(255);
  translate(width/2, height); // leva um ponto da origem(0, 0) para a posição (200, height)
  branch(100, stroke_weight_cnt);
  
}

function branch(len, stroke_weight_cnt){
  if(stroke_weight_cnt >= 1) stroke_weight_cnt /= 2; // a cada nivel da arvore a largura dos ramos diminui em 2 vezes até que a largura seja menor que 1(pixel)
  
  strokeWeight(stroke_weight_cnt);
  line(0, 0, 0, - len); // linha que vai do ponto (0, 0) até (0, -len), porem ela será desenhada no ponto onde a função translate foi aplicada
  translate(0, - len); // translada o que seria o ponto(200, height) para o ponto (200, height - len) que agora é (0, -len)
  
  if(len > 4){ //condição de parada da função recursiva
    
    // ramificando para a direita
    push(); // salva o estado da função antes de ramificar para a direita
    rotate(angle); // rotaciona em 45º e depois desenha a linha rotacionada caso len seja > 4
    branch(len * 0.67, stroke_weight_cnt);
    pop(); // retoma o estado de antes de ramificar para a direita


    // ramificando para a esquerda
    push(); // salva o estado da função antes de ramificar para a esquerda
    rotate(-angle);
    branch(len * 0.67, stroke_weight_cnt);
    pop();  // retoma o estado de antes de ramificar para a esquerda
  }
  


}
// OBS.:
// o uso das funções pop e push é para que a ramificação em arvore seja feita corretamente 
// o nao uso delas provoca um desenho de uma linha onde todos os ramos estao conectados(fazer o teste)

