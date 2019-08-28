
sbText = (input) => {
    let sb = "";
    for(let i = 0; i < input.length; i++) {
        sb += swapCase(input[i]);
    }
    console.log(sb);
}

swapCase = (character) => {
    let rand = Math.round((Math.random() * 1000));
    if(rand % 2 === 0) {
        return character.toUpperCase();
    }
    return character.toLowerCase()
}