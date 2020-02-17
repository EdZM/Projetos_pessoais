// Aplicação que gera um labirinto baseado em DFS e que usa backtracking
// baseado no algoritmo contido Recursive backtracker em https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker

var rows;
var cols;
var grid = new Array(rows);
var w = 20;

var current; //celula atual


var stack = []; // armazena o caminho percorrido. Caso não use a pilha e faça usando recursão, poderá haver estouro de pilha de recursão,
                // caso o tamanho do problema aumente muito.

                
function setup() {
  createCanvas(400, 400);
  //frameRate(10); 

  // geração do numero de linhas e colunas em função de w 
  cols = floor(width / w);
  rows = floor(height / w);
  
  // Geração da grade, cujas posições são celulas com algumas informações atreladas
  for (var i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    
  }

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j] = new cell(i,j);
    }
  }

  // setando a celula atual como sendo o ponto de inicio da geração do labirinto; 
  current = grid[0][0];
  
}

// a função draw acontece segundo uma taxa de frames, que pode ser definida usando frameRate(<numero_de_frames>)
// Executa continuamente as linhas de código contidas nela até o programa parar ou quando a função noLoop() for chamada.
// NUNCA é chamada explicitamente
function draw() {
  
  background(51);

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show(color(255));
    }
  }

  current.visited = true;
  current.highlight();

  // Etapa 1 do algoritmo da wiki
  var next = current.checkNeighbors();
  if(next) { // se houver uma celula disponivel, é possível ir para ela
    next.visited = true;
    
    // Etapa 2 do algoritmo da wiki
    stack.push(current);

    // Etapa 3 do algoritmo da wiki
    removeWalls(current, next);
    
    // Etapa 4 do algoritmo da wiki
    current = next;

  } else if (stack.length > 0){ // caso nao haja um next e a pilha que armazenou o caminho ate aqui nao esta vazia, 
                                // é necesario ir voltando ate achar uma celula com algum vizinho nao visitado
    current = stack.pop();
  
  } else {
    
    if (current === grid[0][0]) {
      console.log('DONE!');
      noLoop();
      
    }
  }
 
}