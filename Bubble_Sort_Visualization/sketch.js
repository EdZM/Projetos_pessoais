var list;


function setup() {
  createCanvas(1200, 400);
  list = new sample();

  for (var i = 0; i < 200; i++) {
    list.values[i] = random(height);
    list.bar_x = i;
  }

  list.bar_width = width/list.values.length;
  

}

var i = 0;


function draw() {
  background(51);
  //frameRate(120);
  //list.highlight(i); 
  for (var k = 0; k < list.values.length; k++) {
    stroke(0);
    // line(k, height, k, height - list.values[k]);
    fill(255);
    rect(k * list.bar_width, height - list.values[k], list.bar_width, list.values[k]);
    
    
  
  }
  
  // versão mais rápida(mas sem o highlight)
  if(i < list.values.length){
    
    for (var j = 0; j < list.values.length - i - 1; j++) {
      if(list.values[j] > list.values [j + 1]){
        list.swap(j, j+1);
        
      }      
    }

  } else {
    
    console.log("finished");
    noLoop();
  }
  i++;


  //1 comparação por chamada da função draw(versao mais lenta)
  // if(list.values[j] > list.values[j+1]){
  //   list.highlight(j);
  //   list.swap(j, j + 1);
    
  // }
  
  // if (i < list.values.length) { 
  //   j++;
  //   if( j >= list.values.length - i - 1){
  //     j = 0;
  //     i++;

  //   } 

  // } else {
  //   console.log("finished");
  //   noLoop();

  // }



  




}

