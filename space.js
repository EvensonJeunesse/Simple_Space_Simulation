
class Star {

  constructor(star_width, star_height, star_distance=1){
    this.width = star_width;
    this.height = star_height;
    this.x = 0;
    this.y = 0;
    this.z = star_distance; //between 0 and 1
    this.x_speed = 0,
      this.y_speed = 0;
    this.z_speed = 0;

    this.red = 255;
    this.green = 255;
    this.bleu = 255;
    this.img;
    this.opacity = 1;
    this.overflow = false;
  }

  show(new_opacity=1){

    let newWidth = this.width*this.z;
    let newHeight = this.height*this.z;

    if(new_opacity > 1 || new_opacity < 0)
      new_opacity = 1;


    tint(255, 255*new_opacity*this.opacity);

    if(this.img){
      image(this.img,this.x-newWidth/2, this.y-newHeight/2, newWidth, newHeight);
    }else{
      fill(this.red,this.green,this.bleu);
      ellipse(this.x, this.y, (this.width*this.z), (this.height*this.z));
    }



  }

  show_speed()
  {
    this.show();
    var translate_x = this.x - (this.x_speed*1.2) + this.height*this.z ;
    var translate_y = this.y - (this.height*this.z/4);
    rect(translate_x, translate_y, this.x_speed*1.5, this.height*this.z/2);
  }

  location(x, y, z){
    this.x = x;
    this.y = y;

    if(z >= 0 && z <= 1)
      this.z = z;
    else if(z < 0)
      this.z = 0;
    else
      this.z = 1;
  }

  fill(R,G,B){
    this.red = R; this.green = G; this.bleu = B;
  }


  setImage(url){
    this.img = loadImage(url);
  }

  setOpacity(btw_0and1){

    this.opacity = btw_0and1;
     if(this.opacity > 1 || this.opacity < 0)
      this.opacity = 1;
  }


  setMove(x,y,z){
    this.x_speed = x; this.y_speed = y; this.z_speed = z;
  }

  move(force_x=0, force_y=0){

    this.x += this.x_speed + force_x;
    this.y += this.y_speed + force_y;

    if(this.overflow == false){
      if(this.x >= window.innerWidth){
        this.x = 0+random(0,5);
        this.y = random(0,window.innerHeight);
      }
      else if(this.x <= 0){
       this.x =  window.innerWidth - 50*this.x_speed + random(-5,0);
       this.y = random(0,window.innerHeight);
      }

      if(this.y >= window.innerHeight){
        this.y = 0+random(0,5);
        this.x = random(0,window.innerWidth);
      }
      else if(this.y <= 0){
       this.y =  window.innerHeight - 50*this.y_speed + random(-5,0);
       this.x = random(0,window.innerWidth);
      }
    }

  }

 random_reset()
  {
   this.x = random(0,window.innerWidth);
   this.y = random(0,window.innerHeight);
  }


};


var lune = new Star(300, 300);
var terre = new Star(lune.width*5, lune.width*5);
var soleil = new Star(lune.width*3, lune.width*3);
var nebulous = new Array();
var stars = new Array();
var asteroid = new Array();
var starsNb = 2300;
var asteroidNb = 4;
var nebulousNb = 3;

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  //size(640,480);
  lune.location(window.innerWidth/2, window.innerHeight/2, 0.4);
  lune.setImage('lune.png');
  lune.overflow = true;

  terre.location(window.innerWidth+terre.width*0.7, window.innerHeight+terre.width*0.7, 1);
  terre.setImage('earth.png');
  terre.overflow = true;

  soleil.location(-window.innerWidth/2, soleil.width, 1);
  soleil.setImage('light1.png');
  soleil.overflow = true;

for(var i=0; i < nebulousNb; i++){
  nebulous[i] = new Star(random(100,1000),random(100,1000));
  nebulous[i].random_reset();
  nebulous[i].setOpacity(random(0.01,0.03));
}


  nebulous[0].setImage('nebulous1.png');
  nebulous[1].setImage('nebulous2.png');
  nebulous[2].setImage('nebulous3.png');



  for(var i=0; i < starsNb; i++){
    stars[i] = new Star(70, 70);
    stars[i].location(random(0,window.innerWidth),random(0,window.innerHeight),random(0.025,0.045));
    stars[i].fill(random(150,255),random(150,255),random(150,255));
    stars[i].setMove(random(0.05,0.1),random(-0.01,0.001),0);
  }

  for(var i=0; i < asteroidNb; i++){
    asteroid[i] = new Star(70, 40);
    asteroid[i].location(random(0,window.innerWidth),random(0,window.innerHeight),random(0,0.05));
    asteroid[i].fill(random(200,255),random(200,255),random(200,255));
    asteroid[i].setMove(random(-100,100),random(-0.1,0.1),0);
  }





}

function draw(){
  background(0);
  ellipseMode(CENTER);
  imageMode(CENTER);
  smooth();

  UserAction();
  moveAll();



  for(var i=0; i < nebulous.length; i++){
   nebulous[i].show();
  }

  for(var i=0; i < starsNb; i++){
   stars[i].show();
  }

  for(var i=0; i < asteroidNb; i++){
   asteroid[i].show_speed();
    if(random(0,10000) == 999){
      asteroid[i].random_reset();
      asteroid[i].setMove(random(-100,100),random(-0.1,0.1),0);
    }
  }

  show_rotation_stars();//soleil
  lune.show(0.9);
  terre.show();



}


function show_rotation_stars()
{
  rotate(PI / 50);
  soleil.show(random(0.9,1));
}




function UserAction() {
  if (keyIsDown(LEFT_ARROW) || mouseX <= 50) {
    moveAll(5,0);
  } else if (keyIsDown(RIGHT_ARROW) || mouseX >= window.innerWidth - 50) {
     moveAll(-5,0);
  }else if (keyIsDown(UP_ARROW) || mouseY <= 50) {
     moveAll(0,5);
  }else if (keyIsDown(DOWN_ARROW) || mouseY >= window.innerHeight - 50) {
     moveAll(0,-5);
  }
}


function moveAll(x=0,y=0){

  for(var i=0; i < starsNb; i++){
    stars[i].move(x,y);
  }

  for(var i=0; i < asteroidNb; i++){
   asteroid[i].move(x,y);
  }

  for(var i=0; i < nebulous.length; i++){
   nebulous[i].move(x,y);
  }

  lune.move(x,y);
  terre.move(x,y);
  soleil.move(x,y);

}
