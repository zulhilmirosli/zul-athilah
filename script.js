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

    const hours =
        Math.floor((diff / (1000 * 60 * 60)) % 24);

    const mins =
        Math.floor((diff / (1000 * 60)) % 60);

    const secs =
        Math.floor((diff / 1000) % 60);

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
            block: "start"
        });
    }
}

window.navScrollTo = navScrollTo;


// =================================================
// ACTIVE NAV HIGHLIGHT
// =================================================

const navButtons =
document.querySelectorAll(".nav-item");

const sections =
document.querySelectorAll(".inv-section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.id;
        }
    });

    navButtons.forEach(btn => {

        btn.classList.remove("active");

        if (
            btn.dataset.sec === current
        ) {
            btn.classList.add("active");
        }
    });
});


// =================================================
// MUSIC
// =================================================

const music =
document.getElementById("bgMusic");

const musicToggle =
document.getElementById("musicToggle");

const musicLabel =
document.getElementById("musicLabel");

const musicFab =
document.getElementById("musicFab");

const musicIcon =
document.getElementById("musicIcon");

const fabIcon =
document.getElementById("fabIcon");

function updateMusicUI(isPlaying) {

    if (isPlaying) {

        musicLabel.textContent =
        "Pause Lagu";

        musicIcon.classList.add("spin");
        fabIcon.classList.add("spin");

    } else {

        musicLabel.textContent =
        "Mainkan Lagu";

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

musicToggle.addEventListener(
    "click",
    toggleMusic
);

musicFab.addEventListener(
    "click",
    toggleMusic
);


// =================================================
// RSVP
// =================================================

let selectedPax = 1;

function selectPax(button, pax) {

    selectedPax = pax;

    document
        .querySelectorAll(".pax-btn")
        .forEach(btn => {

            btn.classList.remove(
                "selected"
            );
        });

    button.classList.add(
        "selected"
    );
}

window.selectPax = selectPax;

let musicStarted = false;

window.addEventListener(
    "scroll",
    async () => {

        if(
            !musicStarted &&
            window.scrollY > 100
        ){

            try{

                await music.play();

                updateMusicUI(true);

                musicStarted = true;

            }catch(err){}
        }
    }
);


// =================================================
// SUBMIT RSVP
// =================================================

async function submitRSVP() {

    const nama =
        document
        .getElementById("rNama")
        .value
        .trim();
    const nameRegex = /^[A-Za-zÀ-ÿ\s'@.-]+$/;

    if (!nameRegex.test(nama)) {
      alert("Nama hanya boleh mengandungi huruf.");

      return;
    }
    const hadir =
        document.querySelector(
            'input[name="hadir"]:checked'
        );

    const ucapan =
        document
        .getElementById("rUcapan")
        .value
        .trim();

    if (!nama) {

        alert("Sila masukkan nama.");
        return;
    }

    if (!hadir) {

        alert(
            "Sila pilih status kehadiran."
        );

        return;
    }

    const submitBtn =
        document.getElementById(
            "submitBtn"
        );

    submitBtn.disabled = true;
    submitBtn.textContent =
        "Menghantar...";

    try {

        const pax =
    hadir.value === "Ya"
    ? selectedPax
    : 0;
        await fetch(WEBAPP_URL, {
          method: "POST",
          body: JSON.stringify({
            nama,
            hadir: hadir.value,
            pax,
            ucapan,
          }),
        });

        document
            .getElementById(
                "rsvpFormWrap"
            )
            .style.display = "none";

        document
            .getElementById(
                "rsvpSuccess"
            )
            .style.display = "flex";

    } catch (error) {

        console.error(error);

        alert(
            "Gagal menghantar RSVP. Sila cuba semula."
        );

        submitBtn.disabled = false;
        submitBtn.textContent =
            "Hantar RSVP";
    }
}

window.submitRSVP = submitRSVP;