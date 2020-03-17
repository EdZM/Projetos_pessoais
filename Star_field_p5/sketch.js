var speed;
var stars = new Array(800);

function setup() {
  createCanvas(700,400);
  slider = createSlider(0, 100, 1, 0.1);
  
  for (let i = 0; i < stars.length; i++) {
    stars[i] = new star();
    
  }
}

function draw() {
  background(0);
  translate(width/2, height/2);
  speed = slider.value();
  
  for (let i = 0; i < stars.length; i++) {
    stars[i].show();
    stars[i].update(speed);
    
  }

}