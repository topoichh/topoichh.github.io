/* =========================
   SETTINGS
   ========================= */

// Modes: "matrix", "topoichh", "snow"
const MODE = "snow";

/* =========================
   SETUP
   ========================= */

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* =========================
   MATRIX / LETTERS MODE
   ========================= */

const matrixLetters = MODE === "matrix"
  ? "01"
  : "topoichh";

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * canvas.height;
}

/* =========================
   CIRCLES MODE
   ========================= */

let particles = [];

function createParticles() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,   // small dots
      speedY: Math.random() * 0.8 + 0.2,
      speedX: Math.random() * 0.5 - 0.25 // slight sideways drift
    });
  }
}

createParticles();

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.8)";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    // movement
    p.y += p.speedY;
    p.x += p.speedX;

    // reset
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });
}

createSnowflakes();

/* =========================
   DRAW FUNCTIONS
   ========================= */

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = matrixLetters[Math.floor(Math.random() * matrixLetters.length)];

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";

  snowflakes.forEach(flake => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
    ctx.fill();

    flake.y += flake.speed;

    if (flake.y > canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }
  });
}

/* =========================
   MAIN LOOP
   ========================= */

function draw() {
  if (MODE === "snow") {
    drawSnow();
  } else {
    drawMatrix();
  }
}

setInterval(draw, 33);

/* =========================
   RESPONSIVE
   ========================= */

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createSnowflakes();
});
