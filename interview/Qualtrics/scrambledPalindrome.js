// Is Scrambled Palindrome
// Write a function that, given a string of letters, returns 
// true or false for whether the letters in the string
// could be arranged to form a palindrome.

// E.g. For “torro”, the answer is True, because the 
// letters can be rearranged to spell “rotor”.

function isPalindrome(input) {
    const map = {}

    for(let i = 0; i < input.length; i++) {
        const letter = input[i]
        if(map[letter]) {
            map[letter] = map[letter] + 1
        }
        else {
            map[letter] = 1
        }
    }
    
    let singleLetter = false
    for(let i = 0; i < input.length; i++) {
        const letter = input[i]
        const count = map[letter]

        if(count % 2 != 0) {
            if(singleLetter) {
                return false
            }
            else {
                singleLetter = true
            }
        }
    }
    return true
}