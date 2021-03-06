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

movieList = [
    "Babar: The Movie", 
    "Babar: King of the Elephants", 
    "Babe", 
    "Babe: Pig in the City", 
    "Babe, The", 
    "Babylon A.D", 
    "Bachelor Mother", 
    "Bachelorette", 
    "Back to School", 
    "Back to School with Franklin", 
    "Back to the Future", 
    "Back to the Future Part II", 
    "Back to the Future Part III", 
    "Backdraft", 
    "Bad and the Beautiful, The", 
    "Bad Boys II", 
    "Bad Day at Black Rock", 
    "Bad Santa", 
    "Bad Taste", 
    "Badlands", 
    "Balto", 
    "Bambi", 
    "Bambi II", 
    "Bananas", 
    "Barbarella", 
    "Barbecue Brawl", 
    "Barcelona", 
    "Barneys Great Adventure", 
    "Barry Lyndon", 
    "Barton Fink", 
    "BASEketball", 
    "Basic Instinct", 
    "Basic Instinct 2", 
    "Batman Begins", 
    "Batman Forever", 
    "Batman Returns", 
    "Batman and Robin", 
    "Batman v Superman: Dawn of Justice", 
    "Battle: Los Angeles", 
    "Battle of San Pietro, The", 
    "Battle Royale", 
    "Be Kind Rewind", 
    "Beach, The", 
    "Beaches", 
    "Beasts of the Southern Wild", 
    "Beast of Yucca Flats, The", 
    "Beautiful Girls", 
    "Beautiful Mind, A", 
    "Beautiful Thing", 
    "Beavis and Butthead Do America", 
    "Becoming Jane", 
    "Bedknobs and Broomsticks", 
    "Bedtime Stories", 
    "Bee Movie", 
    "Bee Season", 
    "Beerfest", 
    "Beetlejuice", 
    "Before Midnight", 
    "Before Sunrise", 
    "Before Sunset", 
    "Beginners", 
    "Behind Enemy Lines", 
    "Behind the Candelabra", 
    "Being John Malkovich", 
    "Being There", 
    "Believer, The", 
    "Ben 10: Alien Swarm", 
    "Ben 10: Destroy All Aliens", 
    "Ben 10: Race Against Time", 
    "Ben 10: Secret of the Omnitrix", 
    "Bend It Like Beckham", 
    "Benny & Joon", 
    "Beowulf", 
    "Best in Show", 
    "Best Laid Plans", 
    "Best Little Whorehouse in Texas, The", 
    "Best Years of Our Lives, The", 
    "Better Off Dead", 
    "Better Than Chocolate", 
    "Better Tomorrow, A", 
    "Beverly Hills Chihuahua", 
    "Beverly Hills Cop II", 
    "Beverly Hills Cop III", 
    "Beyond the Valley of the Dolls", 
    "Bicentennial Man", 
    "Bicycle Thieves", 
    "Big", 
    "Big Chill, The", 
    "Big Daddy", 
    "Big Easy, The", 
    "Big Fat Liar", 
    "Big Fish", 
    "Big Hero 6", 
    "Big Lebowski, The", 
    "Big Night", 
    "Big Short, The", 
    "Big Time Movie", 
    "Big Top Bunny", 
    "Big Top Pee-wee", 
    "Big Trouble", 
    "Big Trouble in Little China", 
    "Bill and Teds Bogus Journey", 
    "Bill and Teds Excellent Adventure", 
    "Billy & Mandys Big Boogey Adventure", 
    "Billy Madison", 
    "Birdman", 
    "Birds of a Father", 
    "Birds, The", 
    "Black Book", 
    "Black Hawk Down", 
    "Black Hole, The", 
    "BlacKkKlansman", 
    "Black Panther", 
    "Black Rain", 
    "Black Sheep", 
    "Black Swan", 
    "Blade", 
    "Blade II", 
    "Blade Runner", 
    "Blade: Trinity", 
    "Blades of Glory", 
    "Blair Witch Project, The", 
    "Blazing Saddles", 
    "Blood Diamond", 
    "Blood Feast", 
    "Blood on Satans Claw, The", 
    "Blood Simple", 
    "Blow", 
    "Blow Out", 
    "Blue Collar", 
    "Blue Lagoon, The", 
    "Blue Jasmine", 
    "Blue Velvet", 
    "Blues Big Musical Movie", 
    "Blues Brothers, The", 
    "Blues Brothers 2000", 
    "Bohemian Rhapsody", 
    "Body Heat", 
    "Body of Lies", 
    "Boiler Room", 
    "Bold Caballero, The", 
    "Bonnie and Clyde", 
    "Boogeyman", 
    "Book of Life, The", 
    "Book of Pooh: Stories from the Heart, The", 
    "Book of Shadows: Blair Witch 2", 
    "Book Thief, The", 
    "Boondock Saints, The", 
    "Borat: Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan", 
    "Born on the Fourth of July", 
    "Bottle Rocket", 
    "Bound", 
    "Bourne Identity, The", 
    "Bourne Legacy, The", 
    "Bourne Supremacy, The", 
    "Bourne Ultimatum, The", 
    "Bowling for Columbine", 
    "Box-Office Bunny", 
    "Boy Named Charlie Brown, A", 
    "Boyhood", 
    "Boys from Brazil, The", 
    "Boys Next Door, The", 
    "Boys Town", 
    "Boyz n the Hood", 
    "Braindead", 
    "Brassed Off", 
    "Braveheart", 
    "Brave Little Toaster, The", 
    "Brazil", 
    "Breakfast at Tiffanys", 
    "Breakfast Club, The", 
    "Breaking Away", 
    "Breaking Up", 
    "Brians Song", 
    "Bride of Chucky", 
    "Bride Wars", 
    "Bridge of Spies", 
    "Bridge on the River Kwai, The", 
    "Bridget Joness Diary", 
    "Bring It On", 
    "Bring Me the Head of Alfredo Garcia", 
    "Bringing Up Baby", 
    "Broadcast News", 
    "Brokeback Mountain", 
    "Broken Arrow", 
    "Bronx Tale, A", 
    "Brooklyn", 
    "Brother Bear", 
    "Brother Bear 2", 
    "Brothers Grimm, The", 
    "Brothers McMullen, The", 
    "Brothers Solomon, The", 
    "Brubaker", 
    "Bruce Almighty", 
    "Buckaroo Banzai", 
    "Bucket List, The", 
    "Buffalo 66", 
    "Buffy the Vampire Slayer", 
    "Bug", 
    "Bugs Life, A", 
    "Bull Durham", 
    "Bullfighters, The", 
    "Bullitt", 
    "Burn After Reading", 
    "But Im a Cheerleader", 
    "Butch Cassidy and the Sundance Kid", 
    "Butterfly Effect, The", 
    "By Da"
]

let generateActorValueStatement = (values) => {
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

let generateActorStatements = () => {
    let final = "";
    let table = "actor";
    for(let i = 0; i < actorList.length; i++) {
        let tempFinal = "INSERT INTO " + table + " VALUES ";
        let name = actorList[i];
        let vals = [name, Math.floor(Math.random() * 100), returnGender()];
        tempFinal += generateActorValueStatement(vals) + ";\n";
        final += tempFinal;
    }
    return final;
}

let generateMovieValueStatement = (values) => {
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

let generateMovieStatements = () => {
    let final = "";
    let table = "movie";
    for(let i = 0; i < movieList.length; i++) {
        let tempFinal = "INSERT INTO " + table + " VALUES ";
        let movie = movieList[i];
        let vals = [movie, Math.floor(Math.random() * 100)];
        tempFinal += generateMovieValueStatement(vals) + ";\n";
        final += tempFinal;
    }
    return final;
}

let generateCastInValueStatement = (values) => {
    let string = "(";
    let ctr = 0; 

    while(ctr < (values.length - 1)) {
        if(ctr < 2) {
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

let generateCastInStatements = () => {  
    let movieShuffle = arrShuffle(movieList);
    let actorShuffle = arrShuffle(actorList);

    let final = "";
    let table = "castIn";
    let maxLength = decideSmallerList(movieList, actorList);
    for(let i = 0; i < maxLength; i++) {
        let tempFinal = "INSERT INTO " + table + " VALUES ";
        let randomIdx = Math.floor(Math.random() * Math.floor(maxLength - 1))
        let vals = [actorShuffle[randomIdx], movieShuffle[randomIdx], Math.floor(Math.random() * 1000)];
        tempFinal += generateCastInValueStatement(vals) + ";\n";
        final += tempFinal
    }
    return final;
}

let decideSmallerList = (list1, list2) => {
    return ((list1.length > list2.length) ? list2.length : list1.length);
}

let returnGender = () => {
    let val = Math.floor(Math.random() * 20);
    return (val % 2 == 0) ? "'MALE'" : "'FEMALE'";
}

let arrShuffle = (array) => {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array;
}

let main = () => {
    let complete = 
        generateActorStatements() + "\n" + 
        generateMovieStatements() + "\n" + 
        generateCastInStatements();

    console.log(complete);
}