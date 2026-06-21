const WEBAPP_URL =
"https://script.google.com/macros/s/AKfycbwJ-pCNHCawTtT1xKtFCYzAEavrGXRsHmVYukTmja06hg0WPM9d6CsGH3L45MG2ZbH45w/exec";

document
.getElementById("rsvpForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {
        nama: document.getElementById("nama").value,
        pax: document.getElementById("pax").value
    };

    await fetch(WEBAPP_URL,{
        method:"POST",
        body:JSON.stringify(data)
    });

    alert("Terima kasih kerana RSVP!");

    this.reset();

});