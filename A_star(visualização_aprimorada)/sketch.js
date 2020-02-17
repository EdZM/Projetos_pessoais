// Versao mais ineficiente do Algoritmo A*

// possiveis melhorias/mudancas: 
// - fazer uma busca linear nas listas openSet e closedSet (usando binary search ou talvez algo baseado em bite tree)
// - evidenciar o custo de andar na diagonal ou linha reta (nesse caso estou usando custo 1 para qualquer direção, logo o valor g sempre incrementa de 1)
// - quando existir um caminho entre dois ou mais obstaculos considerar esse caminho como invalido
// - gerar labirintos aleatorios

// possiveis aplicações/ideias:
// - pegue uma imagem e aplique esse algoritmo para pegar o contorno da imagem;


function removeFromArray(arr, elt){
  for (var i = arr.length - 1; i >= 0; i--) {
    if(arr[i] == elt){
      arr.splice(i, 1); // splice altera o array, removendo os valores dentro dele e substituindo por outros valores caso seja solicitado isso ao mesmo.
                        // i é onde deve-se iniciar a operação e o 1 indica a quantidade de itens removidos do array
                        // se o 1 nao for fornecido todos os itens a partir de i serão removidos.
                        // splice != slice    
    }    
  }
}

// heuristica usada para estimar o custo entre um nó e o nó de destino
function heuristic(a,b) {
  // var d = dist(a.i, a.j, b.i, b.j); // calcula a distancia euclidiana por padrao
  var d = abs(a.i - b.i ) + abs(a.j - b.j); // distancia manhattan 
  
  return d;
}


var cols = 50;
var rows = 50;
var grid = new Array(cols);

// o algoritmo termina de duas formas:
// - Caso a lista esteja vazia, indicando que não há solução.
// - Caso tenha chegado no destino final.

var openSet = []; // lista de nós a serem visitados. 
var closedSet = []; // lista de nós já visitados.
var start; // vai receber um objeto da matriz grid
var end; // vai receber um objeto da matriz grid
var w, h;
var path = [];
// var nosolution = false; // ao inves de usar essa variavel posso usar o  return

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0; // f(n) = g(n) + h(n);
  this.g = 0; // custo para chegar ao nó atual
  this.h = 0; // custo estimado para chegar a destino(heuristica usada)
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  if(random(1) < 0.4){ //adiciona obstaculos aleatoriamente
    this.wall = true;
  }

  this.show = function (col) {
    //fill(col);
    if(this.wall){
      fill(0);
      noStroke(); // desabilita o desenho do outline
      ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2); 
    }
    
    //noStroke(); // desabilita o desenho do outline
    //ellipse(this.i * w + w / 2, this.j * h + h / 2, w/2, h/2); 
    //rect(this.i * w, this.j * h, w - 1, h - 1 ); 
  }

  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;

    // Avaliando as 4 posições adjacentes (poderia olhar as 8 tambem)
    if(i < cols - 1 ){
      this.neighbors.push(grid[i + 1][j]);
    }
    if(i > 0){
      this.neighbors.push(grid[i - 1][j]);
    }
    if(j < rows - 1){
      this.neighbors.push(grid[i][j + 1]);
    }
    if(j > 0){
      this.neighbors.push(grid[i][j - 1]);
    }
    
    // Incluindo as diagonais
    if(i > 0 && j > 0){
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }



  }


}


function setup() {
  createCanvas(400,400);
  console.log('A*');

  // nesse caso abaixo cada posição de grid tem 80 pixels de altura por 80 pixels de largura
  w = width / cols; 
  h = height / rows;


  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    
  }
  

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j); // cada posição armazena tres informações
    }
  }
  
  console.log(grid);

  // gerando os vizinhos de cada posição da grade
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid); // cada posição armazena tres informações
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  openSet.push(start);

  // put setup code here


}

function draw() {
  
  // como vou desenhar cada iteração do algoritmo passei os ifs abaixo pra função draw
  if(openSet.length > 0){
    
    // podemos continuar
    var winner = 0; // representa que tem o menor valor f
    for (var i = 0; i < openSet.length; i++) {
      if(openSet[i].f < openSet[winner].f){ // encontra o menor f
        winner = i;
        //console.log(winner);
      }
    }
    var current = openSet[winner];

    if (current === end){
      noLoop();
      console.log("DONE!");
    }

    // openSet.remove(current) --> isso NAO existe em JS
    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors; // vizinhos da posição atual da grade
    
    for (var i = 0; i < neighbors.length; i++) { // avaliando cada vizinho da posição atual da grade
      var neighbor = neighbors[i];
      
      if(!closedSet.includes(neighbor) && !neighbor.wall) { //avalia se dentro do closedSet existe o neighbor atual
        var tempG = current.g + 1; // custo G temporario. O valor adicionado ao g refere-se ao custo de andar em linha reta ou na diagonal(nesse caso é igual para ambas as situações)
        
        var newPath = false; 
        if(openSet.includes(neighbor)){
          if(tempG < neighbor.g){
            neighbor.g = tempG; // achei um g melhor
            newPath = true;
          }
        
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        
        if(newPath){  // os calculos sobre as variaveis f, g e h só podem ser feitos se realmente houver um novo caminho. 
                      // Caso essa checagem nao fosse feita eu poderia acabar calculando os custos para vizinhos que estivesse em openSet, mas que nao tivessem um custo g melhor que o no atual(current)
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current; // salvando o nó atual como sendo anterior ao vizinho atual

        }
        
      }


      
    }



  } else {
    // sem solução
    console.log('No solution');
    //nosolution = true;
    noLoop();
    return;
  }
  
  
  //background(255, 0, 200); // cor preta
  background(255); // cor preta

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    //closedSet[i].show(color(255, 0, 0)); // vermelho para os nos já visitados
  }

  for (var i = 0; i < openSet.length; i++) {
    //openSet[i].show(color(0, 255, 0)); // verde para os nos que ainda serão processados
  }



  
  // Geracao do caminho percorrido
  path = [];
  var temp = current;
  path.push(temp);

  while (temp.previous) { // enquanto houver um no anterior...
    path.push(temp.previous);
    temp = temp.previous;
  }
  

  for (var i = 0; i < path.length; i++) {
    //path[i].show(color(0, 0, 255)); // verde para os nos que ainda serão processados
  }

  // Melhorias na visualização
  noFill();
  stroke(0, 255, 0);
  strokeWeight(w/2);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w/2, path[i].j * h + h/2); // w/2 e h/2 serve para alinhar a linha desenhada com o centro de cada posicao de grid
  }
  
  endShape();



}