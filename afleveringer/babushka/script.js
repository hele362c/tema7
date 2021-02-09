const url = "https://babushka-dd8a.restdb.io/rest/menu";
const medieurl = "https://babushka-dd8a.restdb.io/media/"
const options = {
    headers: {
        'x-apikey': "600ec2fb1346a1524ff12de4"
    }
};

document.addEventListener("DOMContentLoaded", start);
let menu;
let filter = "alle";

function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerKategori));
    hentData();
}
const header = document.querySelector("header h2");

function filtrerKategori() {
    filter = this.dataset.kategori;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    visMenu(); //kalder funktionen visPersoner efter det nye filter er sat
    header.textContent = this.textContent;
    console.log(this);

}
async function hentData() {
    const resultat = await fetch(url, options);
    menu = await resultat.json();
    console.log("menu", menu);
    visMenu();
}

function visMenu() {
    console.log(menu);
    const dest = document.querySelector("main");
    // const main = document.querySelector("main");
    const template = document.querySelector("template").content;
    dest.textContent = "";

    menu.forEach(menu => {
        if (filter == menu.kategori || filter == "alle") {
            const klon = template.cloneNode(true);
            klon.querySelector(".billede").src = medieurl + menu.billede;
            klon.querySelector(".navn").textContent = menu.navn;
            klon.querySelector(".kategori").textContent = menu.kategori;
            klon.querySelector(".kortbeskrivelse").textContent = menu.kortbeskrivelse;
            klon.querySelector(".pris").textContent = `Pris: ${menu.pris}`;
            dest.appendChild(klon);
        }
    })
}
