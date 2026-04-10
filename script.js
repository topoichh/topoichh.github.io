/* =========================
   USER SETTINGS
   ========================= */

const SETTINGS = {
  mode: "circles", // "circles" or "matrix"

  circles: {
    count: 120,
    color: "rgba(255,255,255,0.8)",
    maxSize: 2,
    minSize: 1,
    speedY: 0.8,
    speedX: 0.5
  },

  matrix: {
    letters: "01",
    color: "#0f0",
    fontSize: 16,
    fade: "rgba(0,0,0,0.05)"
  }
};

/* =========================
   SETUP
   ========================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* =========================
   CIRCLES PARTICLES
   ========================= */

let particles = [];

function createParticles() {
  particles = [];

  for (let i = 0; i < SETTINGS.circles.count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * SETTINGS.circles.maxSize + SETTINGS.circles.minSize,
      speedY: Math.random() * SETTINGS.circles.speedY + 0.2,
      speedX: Math.random() * SETTINGS.circles.speedX - SETTINGS.circles.speedX / 2
    });
  }
}

createParticles();

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = SETTINGS.circles.color;

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.y += p.speedY;
    p.x += p.speedX;

    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });
}

/* =========================
   MATRIX MODE
   ========================= */

const fontSize = SETTINGS.matrix.fontSize;
const columns = Math.floor(canvas.width / fontSize);
const drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * canvas.height;
}

function drawMatrix() {
  ctx.fillStyle = SETTINGS.matrix.fade;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = SETTINGS.matrix.color;
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text =
      SETTINGS.matrix.letters[
        Math.floor(Math.random() * SETTINGS.matrix.letters.length)
      ];

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

/* =========================
   MAIN LOOP
   ========================= */

function draw() {
  if (SETTINGS.mode === "circles") {
    drawCircles();
  } else {
    drawMatrix();
  }
}

setInterval(draw, 33);

/* =========================
   RESIZE FIX
   ========================= */

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
});
