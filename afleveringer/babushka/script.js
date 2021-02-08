document.addEventListener("DOMContentLoaded", start);
let menu;


const url = "https://babushka-dd8a.restdb.io/rest/menu";
const medieurl = "https://babushka-dd8a.restdb.io/media/"
const options = {
    headers: {
        'x-apikey': "600ec2fb1346a1524ff12de4"
    }
};


function start() {
    hentData();
}
async function hentData() {
    const resultat = await fetch(url, options);
    menu = await resultat.json();
    visMenu();
}

function visMenu() {
    console.log(menu);
    const main = document.querySelector("main");
    const template = document.querySelector("template").content;
    menu.forEach(menu => {
        const klon = template.cloneNode(true);
        klon.querySelector(".billede").src = medieurl + menu.billede;
        klon.querySelector(".navn").textContent = menu.navn;
        klon.querySelector(".kategori").textContent = menu.kategori;
        klon.querySelector(".kortbeskrivelse").textContent = menu.kortbeskrivelse;
        klon.querySelector(".pris").textContent = `Pris: ${menu.pris}`;
        main.appendChild(klon);
    })
}
