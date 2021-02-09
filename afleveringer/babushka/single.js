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
      }

      function visMenu() {
          console.log("visMenu");
          document.querySelector(".billede").src = medieurl + menu.billede;
          document.querySelector(".navn").textContent = menu.navn;
          document.querySelector(".kategori").textContent = menu.kategori;
          document.querySelector(".kortbeskrivelse").textContent = menu.kortbeskrivelse;
          document.querySelector(".pris").textContent = `Pris: ${menu.pris}`;


          //document.querySelector("button").addEventListener("click", tilbageTilMenu);
      }

      // function tilbageTilMenu() {
      //   console.log("tilbageTilMenu");
      //  history.back();
      //}
