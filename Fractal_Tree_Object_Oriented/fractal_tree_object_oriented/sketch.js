// aplicação que desenha uma arvore fractal simples partindo de um ramo e gerando novos usando objetos
// o fato de usar objetos permite a criação de efeitos e dinamicas que interferem com objetos especificos, como por exemplo
// ao inves do uso da recursao foram usados objetos com posições de vetores para a geração dos ramos
// o cair das folhas da arvore(só interfiro com o objeto que guarda informações das folhas)


var angle = 0;
var len = 100;
var tree = []; //salva cada ramo da arvore(representados pelos vetores) e garante que as branches estarão todas interligadas
var leaves = [];
var count = 0;
//var slider;

function setup() {
  createCanvas(400,400);
  var a = createVector(width / 2, height); 
  var b = createVector(width / 2, height - len);
  //slider = createSlider(0, TWO_PI, PI/4, 0.01);

  // a posição 0 sempre guardará as informações da raiz da árvore
  tree[0] = new Branch(a, b); // a raiz da arvore é um objeto que guarda um "vetor" no sentido matematico: formado por dois pontos e que tem um sentido e uma direção a ser determinada
  
  
}

function keyPressed(){ //toda vez que apertar a tecla enter, um par de ramos será desenhado na tela

  if(keyCode === ENTER) {
    // caso a iteração seja feita de forma crescente o array deverá crescer indefinidamente
    for (var i = tree.length - 1; i >= 0 ; i--) { // a cada iteração um ramo se ramifica em dois novos
      if(!tree[i].finished){
        // adições ao vetor tree
        tree.push(tree[i].branchA());    
        tree.push(tree[i].branchB());
      
      }
      tree[i].finished = true;
    }
    count++;
    
    if(count === 7) {
      for (var i = 0; i < tree.length; i++) {
        if (!tree[i].finished) {
          var leaf = tree[i].end.copy(); // copia o ponto final do ramo gerado na 5ª geração
          leaves.push(leaf);
        }
      }
    }

  }

}


function draw() {
  background(51);
  //angle = slider.value();

  for (var i = 0; i < tree.length; i++) { // a impressao inversa dos ramos garante que o tamanho do vetor tree nao seja violado
    tree[i].show();  
    //if(i > 3)tree[i].jitter();
    
  }
  

  for (var i = 0; i < leaves.length; i++) { // a impressao inversa dos ramos garante que o tamanho do vetor tree nao seja violado
    fill(255,0,100,100);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 8, 8 );
    leaves[i].y += random(0, 1); // isso faz com que as folhas caiam, cada uma de forma, "aleatoria"
    //leaves[i].x += random(0, 1);

  }


}

