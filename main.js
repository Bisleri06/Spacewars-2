var settings = {
  canvas_width: 1920,
  canvas_height:800,
  player_speed: 40,
  obstacle_density: 100,
  min_size: 20,
  max_size: 100,
  min_speed: 7,
  max_speed: 14
}
var boxarr = [];
var player;
var score = 0;




function setup() {
  createCanvas(settings.canvas_width, settings.canvas_height);
  player = new pointer(settings.player_speed);
  for (let i = 0; i < settings.obstacle_density; i++)
    boxarr.push(new obstacle(10, random(1, 5)));
}



function draw() {

  background(0);
  push();
  player.show();
  pop();
  noStroke();

  for (let i = 0; i < boxarr.length; i++) {

    if (boxarr[i].outofcanvas()) {
      score += floor(boxarr[i].size / 10);
      boxarr.splice(i, 1);
      fill(random(0, 250), random(0, 250), random(0, 250));
      boxarr.push(new obstacle(random(settings.min_size, settings.max_size), random(settings.min_speed, settings.max_speed)));
    }
  }


  for (let singlebox of boxarr) {
    singlebox.show();
    if (singlebox.collision(player.x1, player.y1, player.size)) {
      push();
      fill(255);
      text("Score: "+score,10,10);
      pop();
      noLoop();
      print(`Game Over: score is ${score}`);
      return;
    }
    singlebox.move();
  }
}



function keyPressed() {
  switch (key) {
    case "ArrowUp":
      player.shift(0, -player.speed);
      break;

    case "ArrowDown":
      player.shift(0, player.speed);
      break;

    case "ArrowLeft":
      player.shift(1, -player.speed);
      break;

    case "ArrowRight":
      player.shift(1, player.speed);
      break;
  }
}


class obstacle {
  constructor(size, speed) {
    this.x = random(0, width - size);
    this.y = 0;
    this.size = floor(size);
    this.speed = speed;
  }

  show() {
    circle(this.x, this.y, this.size); ///////////////
  }

  move() {
    this.y += this.speed;
  }

  outofcanvas() {
    if (this.y > width - this.size)
      return true;
    return false;
  }

  collision(px, py) {
    let d = dist(this.x, this.y, px, py);
    if (d <= (this.size) / 2)
      return true;

    return false;
  }
}






class pointer {
  constructor(speed) {
    this.speed = speed;
    this.x1 = width / 2;
    this.y1 = height - 50;
    this.x2 = this.x1 + 10;
    this.y2 = this.y1 + 10;
    this.x3 = this.x1 - 10;
    this.y3 = this.y1 + 10;
  }

  show() {
    fill(255);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  shift(direction, amount) {
    if (direction && (this.x1 + amount > 0) && (this.x2 + amount < width)) {
      this.x1 += amount;
      this.x2 += amount;
      this.x3 += amount;
    } else if (!direction && (this.y1 + amount) < height && (this.y2 + amount > 0)) {
      this.y1 += amount;
      this.y2 += amount;
      this.y3 += amount;
    }
  }
}
