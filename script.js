const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbwJ-pCNHCawTtT1xKtFCYzAEavrGXRsHmVYukTmja06hg0WPM9d6CsGH3L45MG2ZbH45w/exec";

// =================================================
// COUNTDOWN
// =================================================

const weddingDate = new Date("2026-09-06T11:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById("cdays").textContent = "0";
    document.getElementById("chours").textContent = "0";
    document.getElementById("cmins").textContent = "0";
    document.getElementById("csecs").textContent = "0";

    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  const mins = Math.floor((diff / (1000 * 60)) % 60);

  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById("cdays").textContent = days;
  document.getElementById("chours").textContent = hours;
  document.getElementById("cmins").textContent = mins;
  document.getElementById("csecs").textContent = secs;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// =================================================
// NAVIGATION SCROLL
// =================================================

function navScrollTo(id) {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

window.navScrollTo = navScrollTo;

const envelope = document.getElementById("envelope");

const envOpenBtn = document.getElementById("envOpenBtn");

const envelopeScreen = document.getElementById("envelopeScreen");

const mainInvitation = document.getElementById("mainInvitation");

let invitationOpened = false;

function openInvitation() {
  if (invitationOpened) return;

  invitationOpened = true;

  envelope.classList.add("opened");

  setTimeout(() => {
    envelopeScreen.classList.add("fade-out");

    setTimeout(() => {
      envelopeScreen.style.display = "none";

      mainInvitation.classList.remove("hidden");

      try {
        music.play();

        updateMusicUI(true);
      } catch (err) {}
    }, 1000);
  }, 1800);
}

envOpenBtn?.addEventListener("click", openInvitation);

envelope?.addEventListener("click", openInvitation);

// =================================================
// ACTIVE NAV HIGHLIGHT
// =================================================

const navButtons = document.querySelectorAll(".nav-item");

const sections = document.querySelectorAll(".inv-section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navButtons.forEach((btn) => {
    btn.classList.remove("active");

    if (btn.dataset.sec === current) {
      btn.classList.add("active");
    }
  });
});

// =================================================
// MUSIC
// =================================================

const music = document.getElementById("bgMusic");

const musicToggle = document.getElementById("musicToggle");

const musicLabel = document.getElementById("musicLabel");

const musicFab = document.getElementById("musicFab");

const musicIcon = document.getElementById("musicIcon");

const fabIcon = document.getElementById("fabIcon");

function updateMusicUI(isPlaying) {
  if (isPlaying) {
    musicLabel.textContent = "Pause Lagu";

    musicIcon.classList.add("spin");
    fabIcon.classList.add("spin");
  } else {
    musicLabel.textContent = "Mainkan Lagu";

    musicIcon.classList.remove("spin");
    fabIcon.classList.remove("spin");
  }
}

async function toggleMusic() {
  try {
    if (music.paused) {
      await music.play();

      updateMusicUI(true);
    } else {
      music.pause();

      updateMusicUI(false);
    }
  } catch (err) {
    console.error(err);
  }
}

musicToggle.addEventListener("click", toggleMusic);

musicFab.addEventListener("click", toggleMusic);

function createPetalAnimation(canvasId) {
  const canvas = document.getElementById(canvasId);

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;
  }

  resize();

  window.addEventListener("resize", resize);

  const petals = [];

  for (let i = 0; i < 45; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 3,
      speed: Math.random() * 1 + 0.5,
      drift: (Math.random() - 0.5) * 1.5,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    petals.forEach((p) => {
      ctx.fillStyle = "rgba(255,235,240,0.55)";

      ctx.beginPath();

      ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, Math.PI / 4, 0, Math.PI * 2);

      ctx.fill();

      p.y += p.speed;
      p.x += p.drift;

      if (p.y > canvas.height) {
        p.y = -20;

        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

createPetalAnimation("petalCanvas");

createPetalAnimation("heroPetalCanvas");

// =================================================
// RSVP
// =================================================

let selectedPax = 0;

function selectPax(button, pax) {
  selectedPax = pax;
  clearErrors();

  document.querySelectorAll(".pax-btn").forEach((btn) => {
    btn.classList.remove("selected");
  });

  button.classList.add("selected");
}

window.selectPax = selectPax;

// let musicStarted = false;

// window.addEventListener(
//     "scroll",
//     async () => {

//         if(
//             !musicStarted &&
//             window.scrollY > 100
//         ){

//             try{

//                 await music.play();

//                 updateMusicUI(true);

//                 musicStarted = true;

//             }catch(err){}
//         }
//     }
// );

// =================================================
// SUBMIT RSVP
// =================================================
function clearErrors() {
  document.querySelectorAll(".form-error").forEach((el) => {
    el.style.display = "none";

    el.textContent = "";
  });

  document.querySelectorAll(".input-error").forEach((el) => {
    el.classList.remove("input-error");
  });
}

function showError(id, message, target) {
  const error = document.getElementById(id);

  error.textContent = message;

  error.style.display = "block";

  if (target) {
    target.classList.add("input-error");
  }
}
async function submitRSVP() {
  clearErrors();
  const nama = document.getElementById("rNama").value.trim();

  const nameRegex = /^[A-Za-zÀ-ÿ\s'@.-]+$/;

  if (!nama) {
    showError(
      "namaError",
      "Sila masukkan nama anda.",
      document.getElementById("rNama"),
    );

    return;
  }

  if (!nameRegex.test(nama)) {
    showError(
      "namaError",
      "Nama hanya boleh mengandungi huruf.",
      document.getElementById("rNama"),
    );

    return;
  }
  const hadir = document.querySelector('input[name="hadir"]:checked');

  const ucapan = document.getElementById("rUcapan").value.trim();

  if (!hadir) {
    showError("hadirError", "Sila pilih status kehadiran.");

    return;
  }

  if (hadir.value === "Ya" && selectedPax === 0) {
    showError("paxError", "Sila pilih bilangan tetamu.");

    return;
  }

  const submitBtn = document.getElementById("submitBtn");

  submitBtn.disabled = true;
  submitBtn.textContent = "Menghantar...";

  try {
    const pax = hadir.value === "Ya" ? selectedPax : 0;
    await fetch(WEBAPP_URL, {
      method: "POST",
      body: JSON.stringify({
        nama,
        hadir: hadir.value,
        pax,
        ucapan,
      }),
    });

    document.getElementById("rsvpFormWrap").style.display = "none";

    document.getElementById("rsvpSuccess").style.display = "flex";
  } catch (error) {
    console.error(error);

    showError(
      "hadirError",
      "Maaf, RSVP gagal dihantar. Sila cuba sebentar lagi.",
    );

    submitBtn.disabled = false;
    submitBtn.textContent = "Hantar RSVP";
  }
}
const hadirRadios = document.querySelectorAll("input[name='hadir']");
const paxSection = document.getElementById("paxSection");

hadirRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "Ya") {
      paxSection.style.display = "block";

      selectedPax = 0;

      document
        .querySelectorAll(".pax-btn")
        .forEach((btn) => btn.classList.remove("selected"));
    } else {
      paxSection.style.display = "none";

      selectedPax = 0;

      document
        .querySelectorAll(".pax-btn")
        .forEach((btn) => btn.classList.remove("selected"));
    }
  });
});
window.submitRSVP = submitRSVP;
function spawnButterflies() {
  const container = document.getElementById("butterflyContainer");

  if (!container) return;

  for (let i = 0; i < 8; i++) {
    const butterfly = document.createElement("div");

    butterfly.className = "butterfly";

    butterfly.innerHTML = `
    <svg width="30"
         height="30"
         viewBox="0 0 30 30">

        <path
        fill="rgba(238, 181, 200, 0.9)"
        d="
        M15 15
        C5 0 0 10 8 18
        C0 25 8 30 15 20
        C22 30 30 25 22 18
        C30 10 25 0 15 15Z"/>
    </svg>
    `;

    butterfly.style.left = Math.random() * 100 + "vw";

    butterfly.style.top = Math.random() * 100 + "vh";

    const endX = Math.random() * 600 - 300;

    const endY = -500 - Math.random() * 200;

    butterfly.style.setProperty("--fly-end", `translate(${endX}px,${endY}px)`);

    butterfly.style.animationDuration = 3 + Math.random() * 2 + "s";

    container.appendChild(butterfly);

    setTimeout(() => {
      butterfly.remove();
    }, 5000);
  }
}

document.querySelectorAll(".nav-item").forEach((btn) => {
  btn.addEventListener("click", spawnButterflies);
});

function copyAccount() {
  const account = "7632833177";

  navigator.clipboard.writeText(account);

  const btn = document.querySelector(".copy-account-btn");

  btn.innerHTML = `
        <i class="ti ti-check"></i>
        Disalin
    `;

  setTimeout(() => {
    btn.innerHTML = `
            <i class="ti ti-copy"></i>
            Salin Nombor Akaun
        `;
  }, 2000);
}

document.getElementById("rNama").addEventListener("input", () => {
  clearErrors();
});
hadirRadios.forEach((r) => {
  r.addEventListener("change", () => {
    clearErrors();
  });
});
