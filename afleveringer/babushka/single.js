      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");

      const medieurl = "https://babushka-dd8a.restdb.io/media/"
      let menu;
      const myHeaders = {
          "x-apikey": "600ec2fb1346a1524ff12de4"
      }
      console.log("ID", id);

      document.addEventListener("DOMContentLoaded", hentData);

      async function hentData() {
          console.log("hentData");
          const JSONData = await fetch(`https://babushka-dd8a.restdb.io/rest/menu/${id}`, {
              headers: myHeaders
          });
          menu = await JSONData.json();
          console.log("menu", menu);
          visMenu(menu);

          // HER LAVES EN FUNKTION TIL BURGERMENUEN SOM SØRGER FOR AT MENUEN KOMMER FREM NÅR DER KLIKKES PÅ BURGER IKON
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
      //HER INDSÆTTES DEN TESKT DER SKAL VISES I SINGLE VIEW
      function visMenu() {
          console.log("visMenu");
          document.querySelector(".navn").textContent = menu.navn;
          document.querySelector(".billede").src = medieurl + menu.billede;
          document.querySelector(".kategori").textContent = menu.kategori;
          document.querySelector(".langbeskrivelse").textContent = menu.langbeskrivelse;
          document.querySelector(".pris").textContent = `Pris: ${menu.pris} kr.`;

          //LAVER EN KLIK FUNKTION PÅ TILBAGE KNAP FOR AT KOMME TILBAGE TIL LOOP VIEW
          document.querySelector("button").addEventListener("click", tilbageTilMenu);
      }

      function tilbageTilMenu() {
          console.log("tilbageTilMenu");
          history.back();
      }
