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
    console.log("start");
    const filterKnapper = document.querySelectorAll(".sortering button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerKategori));
    hentData();

    document.querySelector("#burgerKnap").addEventListener("click", toggleMenu);
}

function toggleMenu() {
    console.log("toggleMenu");
    document.querySelector("#burgerMenu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#burgerMenu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#burgerKnap").textContent = "☰";
    } else {
        document.querySelector("#burgerKnap").textContent = "✕";
    }
}


const filtrering = document.querySelector("#filtrering h2");

function filtrerKategori() {
    console.log("filtrerKategori");
    filter = this.dataset.kategori;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    visMenu(); //kalder funktionen visPersoner efter det nye filter er sat
    filtrering.textContent = this.textContent;
    console.log(this);

}
async function hentData() {
    console.log("hentData");
    const resultat = await fetch(url, options);
    menu = await resultat.json();
    console.log("menu", menu);
    visMenu();
}

function visMenu() {
    console.log("visMenu", menu);
    const dest = document.querySelector("#menu_visning");

    const template = document.querySelector("template").content;
    dest.textContent = "";

    menu.forEach(menu => {
        if (filter == menu.kategori || filter == "alle") {
            const klon = template.cloneNode(true);
            klon.querySelector(".billede").src = medieurl + menu.billede;
            klon.querySelector(".navn").textContent = menu.navn;
            //    klon.querySelector(".kategori").textContent = menu.kategori;
            klon.querySelector(".kortbeskrivelse").textContent = menu.kortbeskrivelse;
            klon.querySelector(".pris").textContent = `Pris: ${menu.pris} kr.`;
            klon.querySelector("button").addEventListener("click", () => visSingleView(menu));
            dest.appendChild(klon);
        }
    })
}

function visSingleView(hvilken) {
    location.href = `single_view.html?id=${hvilken._id}`;
}
