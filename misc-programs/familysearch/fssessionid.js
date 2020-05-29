javascript: (
  function () {
      let main = event => {
          document.removeEventListener("copy", main, true);
          event.preventDefault();
          let clipboardData = event.clipboardData;
          const el = document.createElement('textarea');
          el.value = "";
          const cookie = document.cookie.split(';');
          let goneOnce = false
          for (let i = 0; i < cookie.length; i++) {
              let splitString = cookie[i].split("=");
              const key = splitString[0].trim();
              const value = splitString[1].trim();
              if ((key === "fssessionid") && (goneOnce === false)) {
                  clipboardData.clearData();
                  clipboardData.setData("text/plain", value)
                  document.body.appendChild(el);
                  el.select(); 
                  document.body.removeChild(el);
                  alert("Copied fssessionid to clipboard");
                  goneOnce = true;
              }
          }
          if (goneOnce === false) {
              alert("No fssessionid. Haelp")
          }
      };
      document.addEventListener("copy", main, true);
      document.execCommand("copy")
  }
)()

// javascript: (function () %7Blet main %3D event %3D> %7Bdocument.removeEventListener("copy"%2C main%2C true)%3Bevent.preventDefault()%3Blet clipboardData %3D event.clipboardData%3Bconst el %3D document.createElement('textarea')%3Bel.value %3D ""%3Bconst cookie %3D document.cookie.split('%3B')%3Blet goneOnce %3D false%3Bfor (let i %3D 0%3B i < cookie.length%3B i%2B%2B) %7Blet splitString %3D cookie%5Bi%5D.split("%3D")%3Bconst key %3D splitString%5B0%5D.trim()%3Bconst value %3D splitString%5B1%5D.trim()%3Bif ((key %3D%3D%3D "fssessionid") && (goneOnce %3D%3D%3D false)) %7BclipboardData.clearData()%3BclipboardData.setData("text/plain"%2C value)%3Bdocument.body.appendChild(el)%3Bel.select()%3B document.body.removeChild(el)%3Balert("Copied fssessionid to clipboard")%3BgoneOnce %3D true%3B%7D%7Dif (goneOnce %3D%3D%3D false) %7Balert("No fssessionid. Haelp")%7D%7D%3Bdocument.addEventListener("copy"%2C main%2C true)%3Bdocument.execCommand("copy")%7D)()