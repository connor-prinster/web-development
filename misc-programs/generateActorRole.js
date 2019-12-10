const actorList = [
	"Buck Adams", 
	"Don Adams", 
	"Granville Adams", 
	"J. B. Adams", 
	"Jimmie Adams", 
	"Mason Adams", 
	"Victor Adamson", 
	"Thom Adcox-Hernandez", 
	"Anthony Addabbo", 
	"Wesley Addy", 
	"Debo Adegbile", 
	"Paul Adelstein", 
	"Lawrence Adisal", 
    "Seth Adkins",
    "Ben Affleck"
];

const roles = [
    "actor",
    "producer",
    "stuntman",
    "staffer",
    "director",
    "boom",
    "caterer"
]

// INSERT INTO part VALUES (7, 'Wing');
let generateActor = () => {
    let string = "";
    for(let i = 0; i < 15; i++) {
        string += ("INSERT INTO actor VALUES ('" + actorList[i] + "', " + i + ");\n");
    }
    return string;
}

let generateRole = () => {
    let string = "";
    for(let i = 0; i < 100; i++) {
        let randomActor = generateRandom(actorList.length);
        let randomRole = generateRandom(roles.length);
        string += ("INSERT INTO role VALUES (" + randomActor + ", '" + roles[randomRole] + "', " + generateRandom(1000) + ");\n");
    }
    return string;
}

let generateRandom = (rand) => {
    return Math.floor(Math.random() * 100) % rand;
}


let main = () => {
    console.log(generateActor() + "\n" + generateRole());
}