document.getElementById('diszlista').onclick = diszekListaja;

async function diszekListaja() {
    const response = await fetch("/xmassdata.json");
    const diszlista = await response.json();

    var diszHTML = "<h1>Az eddigi díszek listája:</h1>";
    diszHTML += `<table id="disztabla"><tr><th>Átmérő (mm)</th><th>Szín</th><th>Alakzat</th></tr>`;
    for (const egyDisz of diszlista) {
        var sorClass = "arany";
        const terfogat= Math.round(4*Math.PI*Math.pow(egyDisz.atmero/2,3)/3*100)/100;
        if (egyDisz.piros ==="igaz")
            sorClass = "piros";
        diszHTML += `<tr class=${sorClass}><td>${egyDisz.atmero} (V=${terfogat})</td>
    <td class=>${sorClass}</td>
    <td>${egyDisz.alakzat}</td>
    </tr>
    `;


    }
    diszHTML += `</table>`;

    document.getElementById("diszeredmeny").innerHTML = diszHTML;
}

document.getElementById("ujDisz").onsubmit = async function (event) {
    event.preventDefault();
    const atmero = event.target.elements.code.value;
    const piros = event.target.elements.name.value;
    const alakzat = event.target.element.alakzat.value;

    const res = await fetch("/xmassdata", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            atmero,
            piros,
            alakzat
        }),
    });

    if (res.ok) {
        diszekListaja()();
    } else {
        alert("Server error");
    }
};