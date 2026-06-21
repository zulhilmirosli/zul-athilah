const WEBAPP_URL =
"https://script.google.com/macros/s/AKfycbwJ-pCNHCawTtT1xKtFCYzAEavrGXRsHmVYukTmja06hg0WPM9d6CsGH3L45MG2ZbH45w/exec";

// ====================
// COUNTDOWN
// ====================

const weddingDate = new Date("2026-09-06T11:00:00");

function updateCountdown() {

    const now = new Date();

    const diff = weddingDate - now;

    if (diff <= 0) {
        return;
    }

    const days =
        Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor((diff / (1000 * 60 * 60)) % 24);

    const minutes =
        Math.floor((diff / (1000 * 60)) % 60);

    const seconds =
        Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ====================
// MUSIC
// ====================

const music =
document.getElementById("bgMusic");

const musicBtn =
document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicBtn.innerHTML =
        "⏸ Pause Lagu";

    } else {

        music.pause();

        musicBtn.innerHTML =
        "🎵 Mainkan Lagu";
    }
});


// ====================
// OPEN INVITATION
// ====================

const openInvitation =
document.getElementById("openInvitation");

openInvitation.addEventListener("click", () => {

    document
        .getElementById("countdown-section")
        .scrollIntoView({
            behavior: "smooth"
        });

    if (music.paused) {

        music.play();

        musicBtn.innerHTML =
        "⏸ Pause Lagu";
    }
});


// ====================
// RSVP MODAL
// ====================

const modal =
document.getElementById("rsvpModal");

const openRSVP =
document.getElementById("openRSVP");

const closeModal =
document.getElementById("closeModal");

openRSVP.addEventListener("click", () => {

    modal.style.display = "flex";

});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";
    }

});


// ====================
// RSVP SUBMIT
// ====================

const rsvpForm =
document.getElementById("rsvpForm");

rsvpForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        await fetch(
            WEBAPP_URL,
            {
                method: "POST",
                body: JSON.stringify({

                    nama:
                    document.getElementById("nama").value,
                
                    hadir:
                    document.getElementById("hadir").value,
                
                    pax:
                    document.getElementById("pax").value,
                
                    ucapan:
                    document.getElementById("ucapan").value
                
                })
            }
        );

        alert(
            "Terima kasih atas RSVP anda!"
        );

        this.reset();

        modal.style.display = "none";
    }
);