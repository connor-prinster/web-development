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
	"Bruce Adler", 
	"Charlie Adler", 
	"Jay Adler", 
	"Jerry Adler", 
	"Luther Adler", 
	"Matt Adler", 
	"John G. Adolfi", 
	"Adrian Adonis", 
	"Franklin Adreon", 
	"Scott Adsit", 
	"Ben Affleck", 
	"Casey Affleck", 
	"John Agar", 
	"Robert Agnew", 
	"Philip Ahn", 
	"Charles Aidman", 
	"Danny Aiello", 
	"Liam Aiken", 
	"Spottiswoode Aitken", 
	"Franklyn Ajaye", 
	"Claude Akins", 
	"Marc Alaimo", 
	"Rico Alaniz", 
	"Ed Alberian", 
	"Luis Alberni", 
	"Eddie Albert", 
	"Edward Albert", 
	"Coit Albertson", 
	"Frank Albertson", 
	"Jack Albertson", 
	"J. Grant Albrecht", 
	"Gary Albright", 
	"Hardie Albright", 
	"Wally Albright", 
	"Alejandro Alcondez", 
	"Alan Alda", 
	"Antony Alda", 
	"Robert Alda", 
	"Erville Alderson", 
	"Fred Aldrich", 
	"Aki Aleong", 
	"Frank Aletter", 
	"Jace Alexander", 
	"Jason Alexander", 
	"Ross Alexander", 
	"William Alland", 
	"Corey Allen", 
	"Fred Allen", 
	"Lester Allen", 
	"Phillip R. Allen", 
	"Rex Allen", 
	"Tim Allen", 
	"Woody Allen", 
	"Sheldon Allman", 
	"Christopher Allport", 
	"Murray Alper", 
	"Ike Altgens", 
	"Bobby Alto", 
	"Don Alvarado", 
	"George Alvarez", 
	"Kirk Alyn", 
	"Lyle Alzado", 
	"Ed Amatrudo", 
	"Don Ameche", 
	"Jim Ameche", 
	"John Patrick Amedori", 
	"Philip Amelio", 
	"Tony Amendola", 
	"Paul America", 
	"Ed Ames", 
	"Leon Ames", 
	"John Amos", 
	"Bob Amsberry", 
	"Morey Amsterdam", 
	"Glenn Anders", 
	"Rudolph Anders", 
	"Anthony Anderson", 
	"Broncho Billy Anderson", 
	"Eddie Anderson", 
	"Ernie Anderson", 
	"Gene Anderson", 
	"Harry Anderson", 
	"Haskell V. Anderson III", 
	"Herbert Anderson", 
	"Jeff Anderson", 
	"Lew Anderson", 
	"Louie Anderson", 
	"Richard Dean Anderson", 
	"Sam Anderson", 
	"Warner Anderson", 
	"Keith Andes", 
	"Dino Andrade", 
	"Cooper Andrews", 
	"Dana Andrews", 
	"Edward Andrews", 
	"George Lee Andrews", 
	"Giuseppe Andrews", 
	"Stanley Andrews", 
	"Tige Andrews", 
	"Tod Andrews", 
	"Michael Angarano", 
	"Jack Angel", 
	"John Aniston", 
	"Paul Anka", 
	"Morris Ankrum", 
	"Michael Ansara", 
	"Gerald Anthony", 
	"Joseph Anthony", 
	"Marc Anthony", 
	"Greg Antonacci", 
	"Emile de Antonio", 
	"Lou Antonio", 
	"Harry Antrim", 
	"Hy Anzell", 
	"Perry Anzilotti", 
	"Alfred Apaka", 
	"Judd Apatow", 
	"Apesanahkwat", 
	"Oscar Apfel", 
	"Stephen Apostolina", 
	"Sam Appel", 
	"Royce D. Applegate", 
	"Marshall Applewhite", 
	"Tomas Arana", 
	"Ray Aranha", 
	"Jack Aranson", 
	"Maclyn Arbuckle", 
	"Roscoe Arbuckle", 
	"Sebastian Arcelus", 
	"John Archer (actor)", 
	"Robert Arden", 
	"Lee Arenberg", 
	"Geoffrey Arend", 
	"Maurice Argent", 
	"Carmen Argenziano", 
	"Victor Argo", 
	"Moisés Arias", 
	"Adam Arkin", 
	"Alan Arkin", 
	"David Arkin", 
	"John Arledge", 
	"Richard Arlen", 
	"Pedro Armendáriz", 
	"Henry Armetta", 
	"Fred Armisen", 
	"Brent Armitage", 
	"Russell Arms", 
	"Billie Joe Armstrong", 
	"Curtis Armstrong", 
 	"Louis Armstrong", 
    "Matthew John Armstrong"
];

movieList = [];

let generateValueStatement = (values) => {
    let string = "(";
    let ctr = 0; 

    while(ctr < (values.length - 1)) {
        if(ctr === 0) {
            string += ("'" + values[ctr] + "'");
        }
        else {
            string += values[ctr];
        }
        string += ", ";
        ctr++;
    }
    string += (values[ctr] + ")")
    return string;
}

let generateInsertStatements = () => {
// "INSERT INTO actor VALUES ('Joe', 1234, 'MALE');"

    let final = "";
    let table = "actor";
    for(let i = 0; i < actorList.length; i++) {
        let tempFinal = "INSERT INTO " + table + " VALUES ";
        let name = actorList[i];
        let vals = [name, Math.floor(Math.random() * 100), returnGender()];
        tempFinal += generateValueStatement(vals) + ";\n";
        final += tempFinal;
    }
    console.log(final);
}

let returnGender = () => {
    let val = Math.floor(Math.random() * 20);
    return (val % 2 == 0) ? "'MALE'" : "'FEMALE'";
}

let main = () => {
    generateInsertStatements();
}