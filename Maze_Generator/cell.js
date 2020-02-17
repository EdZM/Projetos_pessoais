/*
    Referencia de cada celula da grade para o desenho das linhas (que irão representar as paredes do labirinto)

            (x,y)   *______*  (x + w, y)
                    |      |
                    |      |
       (x, y + w)   *______*  (x + w, y + w)

*/


function isValid(i, j) {
    if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1) {
        return false;
    } else {
        return true;
    }

}


function cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; // 0 == top, 1 == right, 2 == bottom, 3 == left
    this.visited = false;


    this.checkNeighbors = function () {
        var neighbors = []; // array que guardará um dos vizinhos que será aleatoriamente escolhido

        if( isValid(i - 1, j) ){ // se a posição acima da celula atual for valida a atribuição é feita
            
            var top = grid[i - 1][j];
            if (!top.visited) {
                neighbors.push(top);
            }

        }
        
        if (isValid(i, j + 1)) { // se a posição a direita da celula atual for valida a atribuição é feita

            var right = grid[i][j + 1];
            if (!right.visited) {
                neighbors.push(right);
            }

        }
        
        if (isValid(i + 1, j)) { // se a posição abaixo da celula atual for valida a atribuição é feita
            
            var bottom = grid[i + 1][j];
            if (!bottom.visited) {
                neighbors.push(bottom);
            }
        }

        if (isValid(i, j - 1)) { // se a posição esquerda da celula atual for valida a atribuição é feita
            
            var left = grid[i][j - 1];            
            if (!left.visited) {
                neighbors.push(left);
            }
            
        }
    

        if(neighbors.length > 0){ // se a celula atual tiver vizinhos escolhe-se aleatoriamente um deles    
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        
        } else {
            return undefined;

        }


        
    }

    this.highlight = function (){
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(30, 215, 89);
        rect(x, y, w, w);

    }


    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;

        stroke(255);

        if (this.walls[0]) { // Se existe a celula tem a parede de cima, entao desenhe-a
            line(x, y, x + w, y); // linha que vai de ( x, y ) para (x + w, y) de cada celula da grade (top)
        }

        if (this.walls[1]) {
            line(x + w, y, x + w, y + w); // linha que vai de (x + w, y) para (x + w, y + w) (right)
        }

        if (this.walls[2]) {
            line(x + w, y + w, x, y + w); // linha que vai de (x + w, y + w) para (x, y + w) (bottom)
        }

        if (this.walls[3]) {
            line(x, y + w, x, y); // linha que vai de (x, y + w) para (x, y) (left)
        }

        if(this.visited){ // pinta a celula que foi visitada
            noStroke(); // sem isso, a aplicação desenhará as bordas das celulas nao importa o que tenha sido feito antes
            fill(35,35,35);
            rect(x, y, w, w);

        }

    }

}


function removeWalls(a, b) {
    var x = a.i - b.i;
    var y = a.j - b.j;

    if (x === 1) { // se x der 1, é porque andei para a esquerda e assim é preciso remover a parede esquerda de a e a direita de b
        a.walls[3] = false;
        b.walls[1] = false
        
        // impondo uma convenção de que toda vez que se caminhar para a esquerda as paredes da proxima celula sao apagadas
        // Essa alteração aumenta o numero de possiveis caminhos de uma origem ate um destino
        b.walls[0] = false;
        b.walls[3] = false;
        b.walls[2] = false;

    } else if (x === -1) { // se x der -1, é porque andei para a direita e assim é preciso remover a parede direita de a e a esquerda de b
        a.walls[1] = false;
        b.walls[3] = false

    } else if (y === 1) { // se y der 1, é porque andei para cima e assim é preciso remover a parede do topo de a e de baixo de b
        a.walls[0] = false;
        b.walls[2] = false


    } else if (y === -1) { // se y der -1, é porque andei para a baixo e assim é preciso remover a parede de baixo de a e a de cima de b
        a.walls[2] = false;
        b.walls[0] = false

    }

}