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

// javascript: (function () %7B
//     let main %3D event %3D> %7B
//         document.removeEventListener("copy"%2C main%2C true)%3B
//         event.preventDefault()%3B
//         let clipboardData %3D 
//         event.clipboardData%3B
//         const el %3D document.createElement('textarea')%3B
//         el.value %3D ""%3B
//         const cookie %3D document.cookie.split('%3B')%3B
//         let goneOnce %3D false%3B
//         for (let i %3D 0%3B i < cookie.length%3B i%2B%2B) %7B
//             let splitString %3D cookie%5Bi%5D.split("%3D")%3B
//             const key %3D splitString%5B0%5D.trim()%3B
//             const value %3D splitString%5B1%5D.trim()%3B
//             if ((key %3D%3D%3D "fssessionid") && (goneOnce %3D%3D%3D false)) %7B
//                 clipboardData.clearData()%3B
//                 clipboardData.setData("text/plain"%2C value)%3B
//                 document.body.appendChild(el)%3B
//                 el.select()%3B 
//                 document.body.removeChild(el)%3B
//                 alert("Copied fssessionid to clipboard")%3B
//                 goneOnce %3D true%3B
//             %7D
//         %7D
//         if (goneOnce %3D%3D%3D false) %7B
//             alert("No fssessionid. Haelp")
//         %7D
//     %7D%3B
//     document.addEventListener("copy"%2C main%2C true)%3B
//     document.execCommand("copy")%7D
// )()