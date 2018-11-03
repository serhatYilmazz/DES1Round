initialPermutationMatrix = [58, 50, 42, 34, 26, 18, 10, 2,
                            60, 52, 44, 36, 28, 20, 12, 4,
                            62, 54, 46, 38, 30, 22, 14, 6,
                            64, 56, 48, 40, 32, 24, 16, 8,
                            57, 49, 41, 33, 25, 17, 9, 1,
                            59, 51, 43, 35, 27, 19, 11, 3,
                            61, 53, 45, 37, 29, 21, 13, 5,
                            63, 55, 47, 39, 31, 23, 15, 7];

permutedChoiceOneMatrix = [57, 49, 41, 33, 25, 17, 9,
                         1, 58, 50, 42, 34, 26, 18,
                        10,  2, 59, 51, 43, 35, 27,
                        19, 11,  3, 60, 52, 44, 36,
                        63, 55, 47, 39, 31, 23, 15,
                         7, 62, 54, 46, 38, 30, 22,
                        14,  6, 61, 53, 45, 37, 29,
                        21, 13,  5, 28, 20, 12,  4];

givenInput = "";

/**
 * Inputted string will be converted to binary format. 
 */
function onConvertToCharCode () {
    var input = document.getElementById('inputName').value;
    let result = [];
    input.split('')
        .forEach((character) => { //  For each splitted character:
            let bin = character.charCodeAt(0).toString(2); // first convert it to ASCII and then binary of it
            let padding = 8 - bin.length; // For example ASCII 115, it converts like '1110011'. İt needs to be 8 digits to be compatible to algorithm.
            let paddingVariable = "";
            for(let i = 0; i < padding; i++) {
                paddingVariable += '0'; // Missing 0s are added as most significant digit.
            }
            result.push(paddingVariable.concat(bin)); // Concatenating result of the character conversion.
        });

    result = result.join('');
    result = result.split('');
    return result;
}

function initialPermutation(input) {
    binaryValue = input;
    let permutatedString = [];
    let counter = 0;
    initialPermutationMatrix.forEach(index => {
        permutatedString[counter] = binaryValue[index - 1];
        counter++;
    });
    document.getElementById('output').value = permutatedString.join('');
}


/**
 * 
 * Just for testing
 */
function fromBinaryToDecimal(value) {
    
    binString = '';
    value.map(each => {
        binString += String.fromCharCode(parseInt(each, 2));
        return binString;
    });

    console.log(binString);
}

function permutedChoiceOne(key) {
    let permutedString = [];
    let counter = 0;

    // 8 16 24 32 40 48 56 64 indexes are deleted to obtain 56 bit key.
    for(let i = 1; i <= 8; i++) {
        key.splice(i * 7, 1);
    }


    permutedChoiceOneMatrix.forEach(index => {
        permutedString[counter] = key[index - 1];
        counter++;
    })
}

function encrypt() {
    let input = "0001011010111101010000001001010010110100010100111000101001111011";
    let key = "1110000110100100101110111001101111000010111000110010010010111011";
    // initialPermutation(input.split(''));
    permutedChoiceOne(key.split(''));
}