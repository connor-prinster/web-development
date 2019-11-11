let stdMap = (val) => {
    let myMap = new Map();
    myMap.set('a', 1)
    myMap.set('b', 2)
    myMap.set('c', 3)
    myMap.set('d', 4)
    myMap.set('e', 5)
    myMap.set('f', 6)
    myMap.set('g', 7)
    myMap.set('h', 8)
    myMap.set('i', 9)
    myMap.set('j', 10)
    myMap.set('k', 11)
    myMap.set('l', 12)
    myMap.set('m', 13)
    myMap.set('n', 14)
    myMap.set('o', 15)
    myMap.set('p', 16)
    myMap.set('q', 17)
    myMap.set('r', 18)
    myMap.set('s', 19)
    myMap.set('t', 20)
    myMap.set('u', 21)
    myMap.set('v', 22)
    myMap.set('w', 23)
    myMap.set('x', 24)
    myMap.set('y', 25)
    myMap.set('z', 26)  
    console.log(myMap.get(val));
}

let revMap = (val) => {
    let myMap = new Map();
    myMap.set(1, 'a')
    myMap.set(2, 'b')
    myMap.set(3, 'c')
    myMap.set(4, 'd')
    myMap.set(5, 'e')
    myMap.set(6, 'f')
    myMap.set(7, 'g')
    myMap.set(8, 'h')
    myMap.set(9, 'i')
    myMap.set(10, 'j')
    myMap.set(11, 'k')
    myMap.set(12, 'l')
    myMap.set(13, 'm')
    myMap.set(14, 'n')
    myMap.set(15, 'o')
    myMap.set(16, 'p')
    myMap.set(17, 'q')
    myMap.set(18, 'r')
    myMap.set(19, 's')
    myMap.set(20, 't')
    myMap.set(21, 'u')
    myMap.set(22, 'v')
    myMap.set(23, 'w')
    myMap.set(24, 'x')
    myMap.set(25, 'y')
    myMap.set(26, 'z')  
    console.log(myMap.get(val));
}

let returnRevMap = () => {
    let myMap = new Map();
    myMap.set(1, 'a')
    myMap.set(2, 'b')
    myMap.set(3, 'c')
    myMap.set(4, 'd')
    myMap.set(5, 'e')
    myMap.set(6, 'f')
    myMap.set(7, 'g')
    myMap.set(8, 'h')
    myMap.set(9, 'i')
    myMap.set(10, 'j')
    myMap.set(11, 'k')
    myMap.set(12, 'l')
    myMap.set(13, 'm')
    myMap.set(14, 'n')
    myMap.set(15, 'o')
    myMap.set(16, 'p')
    myMap.set(17, 'q')
    myMap.set(18, 'r')
    myMap.set(19, 's')
    myMap.set(20, 't')
    myMap.set(21, 'u')
    myMap.set(22, 'v')
    myMap.set(23, 'w')
    myMap.set(24, 'x')
    myMap.set(25, 'y')
    myMap.set(26, 'z')  
    return myMap;
}

let primes = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541];
let letters = "abcdefghijklmnopqrstuvwxyz";

let primeLetters = () => {

    let str = "";
    let chars = "";
    let revMap = returnRevMap();

    let map = {};
    for(let i = 0; i < primes.length; i++) {
        let prime = primes[i] - 1;
        let primeVal = letter[prime];
        chars += primeVal + " "
        
        console.log(prime, primeVal);
        if(map[primeVal] != null) {
            let temp = map[primeVal];
            temp++;
            map[primeVal] = temp;
        }
        else {
            map[primeVal] = 1;
        }
    }
    for(let i = 0; i < letters.length; i++) {
        if(map[letters[i]] != null) {
            let frequency = map[letters[i]];
            str += revMap.get(frequency);
        }
    }
    
    console.log(str);
    console.log(chars);
}

let nightLord = "nightlordabcefjkmpqsuvwxyz";
let drolThgin = "drolthginabcefjkmpqsuvwxyz";
let drolThginBackwards = "drolthginzyxwvusqpmkjfecba";
let revNightLord = nightLord.split("").reverse().join("")
let revDrolThgin = drolThgin.split("").reverse().join("")
let primeLettersStr = "knytnvhruxhvtftpedvktpendklupdvmkpjgkduvmetedxxknytenktphttsmtgjptvupkritluptonkrtpdvolupgtmkuspugtth";
nightLordReplacement = () => {
    let map = new Map();
    for(let i = 0; i < letters.length; i++) {
        map.set(drolThginBackwards[i], letters[i])
    }

    let str = "";
    for(let i = 0; i < primeLettersStr.length; i++) {
        let tmp = primeLettersStr[i];
        str += map.get(tmp);
    }

    str.replace(/i/g, "a");
    str.replace(/a/, "i");

    console.log(map);
    console.log(str);
    return str;
}


let numLetter = (val) => {
    let myMap = new Map();

    for(let i = 0; i < val.length; i++) {
        myMap.set(i+1, val[i]);
    }

    return myMap;
}

let countLetters = (val) => {
    let count = 0;
    for(let i = 0; i < letter.length; i++) {
        if(letter[i] === val) {
            count++;
        }
    }
    return val;
    console.log(val, "appears", count, "times")
}

let letterCounts = () => {
    let letters = "abcdefghijklmnopqrstuvwxyz";
}

let letter = "knyhtknyhdvphzftrpuktixpeorbhkvcvkfstgjmfstrtapjlduxemansjdcvqhdovkgsxtapfdaaiexwxnjkwtudmxbxdqbkcnmlmujjdpqdjuavzeyhlvttwfqammrkbkdjganpxjpyybmubfugzkuvkildvoarxuugbvhxnwhmjxhmueotoofupazmkeodzmzxpxqvzownuystakjcugmbbzvpjnvucywtynmectmyjnmkzfdbkazlitpojjwpuxqthhkbrwotntwncifsbgommttdkspyxtwgyrjnimzugqucojidoprtafkvwmzhqegsesmkjuieygfpgictoinzokprzdbicxaxytrezbhqilglffauvifgupmzfthdlusobzgeoopnypckawwxftgrksluslrcbtrpeqdvnaebedtvihqsrowsklkxfbsuhcqwcvhpgntgatfwwmvowywlykpvjkoxaagxoutplszrnjgvdpkdgubvqekgnvybcauoajjtftibrprdnualmidnyvxh";