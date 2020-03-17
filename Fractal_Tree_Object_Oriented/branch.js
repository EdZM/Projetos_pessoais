function Branch(begin, end) { // construtor do objeto Branch que recebe dois parametros: o ponto onde comeca e o ponto onde termina o ramo da arvore
    this.begin = begin;
    this.end = end;
    this.angle = random(PI/6, PI/4);
    this.finished = false;
    
    this.jitter = function (){
        this.end.x += random(-1, 1);
        this.end.y += random(-1, 1);


    }

    this.show = function() {
        stroke(255);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);

    }


    this.branchA = function(){
    
        // Basicamente o que foi feito abaixo foi montar a direção de um ramo , rotacioná-la em 45º e adicionar o ponto final anterior com o final atual.
        // Isso constroi um novo ramo em uma direção que no caso é o da direita
        var direction = p5.Vector.sub(this.end, this.begin); // pegar a direção significa subtrair o ponto final do inicial
        direction.rotate(this.angle); 
        direction.mult(0.67); // reduz o tamanho do ramo em 67
        var newEnd = p5.Vector.add(this.end, direction);
        var right = new Branch(this.end, newEnd);
        right.angle = this.angle;
        
        return right;
    };

    this.branchB = function() {
        var direction = p5.Vector.sub(this.end, this.begin); // pegar a direção significa subtrair o ponto final do inicial
        direction.rotate(-this.angle);
        direction.mult(0.67); // reduz o tamanho do ramo em 67
        var newEnd = p5.Vector.add(this.end, direction);
        var left = new Branch(this.end, newEnd);
        left.angle = this.angle;
        return left;


    };








}