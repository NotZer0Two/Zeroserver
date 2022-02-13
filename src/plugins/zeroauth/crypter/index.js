let mctranslate = {
    "A": "**",
    "B": "=Ê",
    "C": "EFWU",
    "D": "Ʈ",
    "E": "UWUWUUWUW",
    "F": "QDI",
    "G": "OFEOPW",
    "H": "**°§§",
    "I": "çC:DçS",
    "J": "§§§//)£",
    "K": "1%&)%)",
    "L": "DSEUWHDOE",
    "M": "DIDPRFEB",
    "N": "WO$$$TFF",
    "O": "dasucofdh",
    "P": "54ywushuzeg",
    "Q": "dsvon--é§°ç",
    "R": "éç§*çç§",
    "S": "ééçE*",
    "T": "̴?££^???!",
    "U": "!$&((%)$==(%",
    "V": "^?=£/£FUE",
    "W": "§§::ç*//^?!",
    "X": "̇SAWYQ(DGSIFCéççDQ*",
    "Y": "FEUHFWF",
    "Z": "OVVOIAORWUVB",
    "1": "uag<h9ug",
    "2": "uag<h9ugww",
    "3": "uag<h9ugwwwwq",
    "4": "uag<h9ugwwwwww",
    "5": "uag<h9ugwwwwwwwqw",
    "6": "uag<h9ugwwwwwwwwwwq",
    "7": "uag<h9ugwwwwwwwwww2Qw",
    "8": "wdeg<rh<rhbfh<rhhrth<",
    "9": "23q<WGR<R4Y<<FG<R<",
    ".": "Ga<iugria<g<gia<bai"
}
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

module.exports = {
    crypt(string) {
        let returnString = '';
        string.split('').forEach(letter => {
            if(mctranslate[letter.toUpperCase()]) {
                returnString = returnString + mctranslate[letter.toUpperCase()];
            } else {
                returnString = returnString + letter;
            }
        })
        return returnString;
    },
    
    decrypt(string) {
        let returnString = '';
        string.split('').forEach(letter => {
            if(getKeyByValue(mctranslate, letter)) {
                returnString = returnString + getKeyByValue(mctranslate, letter)
            } else {
                returnString = returnString + letter
            }
        });
        return returnString;
    },

    //compare the decrypt string to the string
    compare(string, decryptString) {
        if(string === decryptString) {
            return true;
        } else {
            return false;
        }
    }
}