let main = () => {
  const el = document.createElement('textarea');
  el.value = ""

  const cookie = document.cookie.split(';');
  for(let i = 0; i < cookie.length; i++) {
    let splitString = cookie[i].split("=");
    const key = splitString[0].trim();
    const value = splitString[1].trim();
    if(key == "fssessionid") {
      el.value = value;
    }
  }

  if(el.value === "") {
    return false;
  }

  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  
  return true;
};

main();