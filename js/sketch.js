// Author: Yuanjing and chargpt
// 2023.11.01
// generate random gluon bubbles

let particles = [];

function setup() {
  const cancas =  createCanvas(windowWidth, windowHeight);
  cancas.parent("bkgd");

  // for (let i = 0; i < 100; i++) { // 100: particle numbers on the screen
  for (let i = 0; i < 150; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  // background(23, 34, 45); //background color
  background(240, 240, 240); // light grey 
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.update();
    particle.edges();
    particle.show();
    for (let j = i + 1; j < particles.length; j++) {
      let other = particles[j];
      let d = dist(particle.x, particle.y, other.x, other.y);
      if (d < 100) { // if closer than 80, then draw a line
        // stroke(255, 255 - d * 2.55); // lines color white
        stroke(200, 200, 200, 255 - d * 2.55); // lines color gray 
        line(particle.x, particle.y, other.x, other.y);
      }
    }
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vel = p5.Vector.random2D(); // Assign a random velocity
    this.vel.mult(random(0.5, 2)); // Randomize the velocity magnitude
    this.acc = createVector(0, 0);
    this.maxSpeed = 0.8; //reduce particle drifting speed 
    this.maxForce = 0.08; //reduce particle drifting speed 

    // random color
    this.color = random([
      // 'rgba(255, 0, 0, 0.6)',  // 红色
      // 'rgba(0, 255, 0, 0.6)',  // 绿色
      // 'rgba(0, 0, 255, 0.6)'   // 蓝色
      'rgba(255, 128, 128, 0.2)',  // 浅红色
      'rgba(128, 255, 128, 0.2)',  // 浅绿色
      'rgba(128, 128, 255, 0.2)'   // 浅蓝色
    ]);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    // Apply a random force for the random movement
    this.applyForce(p5.Vector.random2D().mult(this.maxForce));

    // Check for mouse position and apply a force towards it if close enough
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, createVector(this.x, this.y));
    let d = dir.mag();
    if (d < 50) {
      dir.normalize();
      dir.mult(this.maxSpeed);
      this.applyForce(dir);
    }

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.acc.mult(0);
  }

  edges() {
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  }

  show() {
    // 绘制泡泡主体
    noStroke();
    // fill(255, 255, 255, 100); // 半透明的白色
    fill(this.color); // particle color 
    ellipse(this.x, this.y, 24, 24); // 可以根据需要调整泡泡的大小

    // 绘制反光效果
    let highlight = {
      x: this.x + 4,
      y: this.y - 4,
      diameter: 8
    };
    // fill(255, 255, 255, 180); // 较不透明的白色，用于反光
    fill(255, 255, 255, 180); // 反光的颜色和透明度
    ellipse(highlight.x, highlight.y, highlight.diameter);
  }

  // Check if the particle is near the mouse
  isNearMouse(mouseX, mouseY) {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    return distance < 10; // 10 pixels proximity to the mouse
  }
}

