const WEBAPP_URL =
"https://script.google.com/macros/s/AKfycbwJ-pCNHCawTtT1xKtFCYzAEavrGXRsHmVYukTmja06hg0WPM9d6CsGH3L45MG2ZbH45w/exec";

const countdown = document.getElementById("countdown");

const weddingDate = new Date("2026-09-06");

setInterval(() => {

const now = new Date();

const diff = weddingDate - now;

const days = Math.floor(diff / (1000*60*60*24));

countdown.innerHTML =
days + " hari lagi";

},1000);

document
.getElementById("rsvpForm")
.addEventListener("submit", async function(e){

e.preventDefault();

await fetch(WEBAPP_URL,{
method:"POST",
body:JSON.stringify({
nama:document.getElementById("nama").value,
pax:document.getElementById("pax").value
})
});

alert("Terima kasih atas RSVP anda!");

this.reset();

});
