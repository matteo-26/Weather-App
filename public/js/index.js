function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';

    h = h % 12 || 12; // Converte le 24 ore in formato 12 ore
    m = checkTime(m);
    s = checkTime(s);
    
    document.querySelector(".time h1").innerHTML = h + ":" + m + ":" + s + " " + ampm;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    } // aggiunge uno zero davanti ai numeri < 10
    return i;
}