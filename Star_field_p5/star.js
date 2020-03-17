function star(){
    // essas randomizações consideram a translação para o centro feita na função draw
    let x = random(-width, width); 
    let y = random(-height, height);
    let z = random(width); // z dará a noção de movimento no espaço 2D
    let pz = z; // salva o valor anterior de z 


    this.update = function(speed) {
        z = z - speed;
        
        if(z < 1){ // evitará divisão por 0 e dará continuidade ao movimento
            x = random(-width, width);
            y = random(-height, height);
            z = width; // z dará a noção de movimento e profundidade no espaço 2D
            pz = z; 

        }
    }

    this.show = function () {
        fill(255);
        noStroke();

        // mapeamento de x/z e y/z para o canvas
        let sx = map(x / z, 0, 1, 0, width);
        let sy = map(y / z, 0, 1, 0, height);

        let r = map(z, 0, width, 16, 0); // criará a sensação de proximidade ou distanciamento, já que definirá o tamanho da elipse com base na distancia
        //ellipse(sx, sy, r, r);

        // valores anteriores de x e y 
        let px = map(x / pz, 0, 1, 0, width );
        let py = map(y / pz, 0, 1, 0, height );

        pz = z;

        stroke(255);
        line(px, py, sx, sy); // desenha o raio de luz (quando se esta a uma velocidade mais alta)

    }

}