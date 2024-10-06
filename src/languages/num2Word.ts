// core numbers from 0 to 19
const coreNumbers: Record<string, string> = {
    '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
    '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine',
    '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen',
    '14': 'fourteen', '15': 'fifteen', '16': 'sixteen', '17': 'seventeen',
    '18': 'eighteen', '19': 'nineteen'
};

// Tens place numbers
const irty: Record<string, string> = {
    '2': 'twenty', '3': 'thirty', '4': 'forty', '5': 'fifty',
    '6': 'sixty', '7': 'seventy', '8': 'eighty', '9': 'ninety'
};

// Larger numbers mapping
const larger: Record<string, string> = {
    '1': 'thousand', '2': 'million', '3': 'billion', '4': 'trillion',
    '5': 'quadrillion', '6': 'quintillion', '7': 'sextillion',
    '8': 'septillion', '9': 'octillion', '10': 'nonillion',
    '11': 'decillion', '12': 'undecillion', '13': 'duodecillion',
    '14': 'tredecillion', '15': 'quattuordecillion', '16': 'quindecillion',
    '17': 'sexdecillion', '18': 'septendecillion', '19': 'octodecillion',
    '20': 'novemdecillion', '21': 'vigintillion', '22': 'unvigintillion',
    '23': 'duovigintillion', '24': 'trevigintillion', '25': 'quattuorvigintillion',
    '26': 'quinvigintillion', '27': 'sexvigintillion', '28': 'septenvigintillion',
    '29': 'octovigintillion', '30': 'novemvigintillion', '31': 'trigintillion',
    '32': 'untrigintillion', '33': 'duotrigintillion', '34': 'tretrigintillion',
    '35': 'quattuortrigintillion', '36': 'quintrigintillion', '37': 'sextrigintillion',
    '38': 'septentrigintillion', '39': 'octotrigintillion', '40': 'novemtrigintillion',
    '41': 'quadragintillion', '42': 'unquadragintillion', '43': 'duoquadragintillion',
    '44': 'trequadragintillion', '45': 'quattuorquadragintillion', '46': 'quinquadragintillion',
    '47': 'sexquadragintillion', '48': 'septenquadragintillion', '49': 'octoquadragintillion',
    '50': 'novemquadragintillion', '51': 'quinquagintillion', '52': 'unquinquagintillion',
    '53': 'duoquinquagintillion', '54': 'trequinquagintillion', '55': 'quattuorquinquagintillion',
    '56': 'quinquinquagintillion', '57': 'sexquinquagintillion', '58': 'septenquinquagintillion',
    '59': 'octoquinquagintillion', '60': 'novemquinquagintillion', '61': 'sexagintillion',
    '62': 'unsexagintillion', '63': 'duosexagintillion', '64': 'tresexagintillion',
    '65': 'quattuorsexagintillion', '66': 'quinsexagintillion', '67': 'sexsexagintillion',
    '68': 'septensexagintillion', '69': 'octosexagintillion', '70': 'novemsexagintillion',
    '71': 'septuagintillion', '72': 'unseptuagintillion', '73': 'duoseptuagintillion',
    '74': 'treseptuagintillion', '75': 'quattuorseptuagintillion', '76': 'quinseptuagintillion',
    '77': 'sexseptuagintillion', '78': 'septenseptuagintillion', '79': 'octoseptuagintillion',
    '80': 'novemseptuagintillion', '81': 'octogintillion', '82': 'unoctogintillion',
    '83': 'duooctogintillion', '84': 'treoctogintillion', '85': 'quattuoroctogintillion',
    '86': 'quinoctogintillion', '87': 'sexoctogintillion', '88': 'septoctogintillion',
    '89': 'octooctogintillion', '90': 'novemoctogintillion', '91': 'nonagintillion',
    '92': 'unnonagintillion', '93': 'duononagintillion', '94': 'trenonagintillion',
    '95': 'quattuornonagintillion', '96': 'quinnonagintillion', '97': 'sexnonagintillion',
    '98': 'septennonagintillion', '99': 'octononagintillion', '100': 'novemnonagintillion',
    '101': 'centillion'
};

export default num2Word;

/**
 * Takes a number and converts it to an equivalent English word form
 *
 * @param {number | string} number - Number or string representation of number to be converted to a word
 * @returns {string} Number as an English word
 */
function num2Word(number: number | string): string {
    // check valid argument
    if (number === '' || (typeof number !== 'number' && typeof number !== 'string')) {
        throw Error('Must supply a number or non-empty string argument.');
    }

    // allow multiple leading negatives and allow commas
    const stringNumber = trimLeadingNegatives(number.toString()).replace(/,/g, '');
    let wordedNumber = '';
    let parts: string[] = [];
    let wholeNumber = '';
    let decimalNumber = '';

    // not a number check
    if (isNaN(Number(stringNumber))) {
        throw Error(`${number} is not a number.`);
    }

    parts = stringNumber.split('.');
    wholeNumber = parts[0] || '0';
    decimalNumber = parts[1] || '';

    // check if whole number is too large as a number or string
    if (typeof number === 'number' && parseInt(wholeNumber, 10) >= Number.MAX_SAFE_INTEGER) {
        return `${number} is too large to be passed as a number. Pass number in as a string.`;
    } else if (wholeNumber.length > 306) {
        throw Error(`${number} exceeds num2Word's maximum number conversion.`);
    }

    // check if decimal number is too small
    if (decimalNumber && parseFloat("." + decimalNumber) <= Number.MIN_VALUE) {
        decimalNumber = '0';
    }

    // negative number check
    if (wholeNumber[0] === "-") {
        wordedNumber = "negative " + getWholeNumber(wholeNumber.substring(1)) + " " + getDecimalNumber(decimalNumber);
    } else {
        wordedNumber = getWholeNumber(wholeNumber) + " " + getDecimalNumber(decimalNumber);
    }

    // remove trailing space when there is no decimal number, e.g only whole numbers
    return wordedNumber.trim();
}

function getWholeNumber(wholeNumber: string): string {
    if (wholeNumber === '') {
        return 'zero'; //or '' but tests would currently break
    }

    const words: string[] = [];
    let parsedObject;
    let wordedNumber = '';

    // iterate through whole number parsing the largest unit
    while (true) {
        parsedObject = parseLargestNumber(trimLeadingZeros(wholeNumber));
        words.push(parsedObject.largestNumber2Word);
        wholeNumber = parsedObject.subNumber;
        if (!wholeNumber) {
            break;
        }
    }

    // determines if the last word can be zero
    if (words.length > 1 && words[words.length - 1] === 'zero') {
        words.pop();
    }

    // join the words
    wordedNumber = words.join(" ");

    return wordedNumber;
}

function getDecimalNumber(decimalNumber: string): string {
    if (!decimalNumber) {
        return ''; // no decimal number found
    }

    const words: string[] = [];
    for (const char of decimalNumber) {
        words.push(coreNumbers[char]) || 'zero';
    }

    return 'point ' + words.join(' ');
}

function parseLargestNumber(wholeNumber: string): { largestNumber2Word: string, subNumber: string } {
    const numberGroup: string[] = splitIntoGroups(wholeNumber);

    let largestNumber2Word = '';
    let largestGroup: string;
    let multiplier = numberGroup.length;

    for (const group of numberGroup) {
        largestGroup = group;

        // add word for the group if it's not 0
        if (parseInt(largestGroup, 10) !== 0) {
            largestNumber2Word += getGroupNumber(largestGroup);
            // add the word for the place value
            if (multiplier > 1) {
                largestNumber2Word += ' ' + larger[multiplier.toString()];
            }
            largestNumber2Word += ' ';
        }
        multiplier--;
    }

    return { largestNumber2Word: largestNumber2Word.trim(), subNumber: '' };
}

function splitIntoGroups(wholeNumber: string): string[] {
    const groups: string[] = [];
    const length = wholeNumber.length;

    for (let i = length; i > 0; i -= 3) {
        const group = wholeNumber.slice(Math.max(0, i - 3), i);
        groups.unshift(group);
    }

    return groups;
}

function getGroupNumber(group: string): string {
    if (parseInt(group, 10) >= 100) {
        return `${coreNumbers[group[0]]} hundred`;
    }

    let groupNumber = '';
    const tensPlace = parseInt(group[1], 10) ;
    const onesPlace = parseInt(group[2], 10);

    // if the group is a double digit number
    if (group.length === 2) {
        if (tensPlace === 1) {
            return coreNumbers[group];
        } else if (tensPlace > 1) {
            groupNumber += irty[tensPlace.toString()];
            if (onesPlace > 0) {
                groupNumber += ' ' + coreNumbers[onesPlace.toString()];
            }
            return groupNumber;
        }
    }

    // if the group is a single digit number
    if (group.length === 1) {
        return coreNumbers[onesPlace.toString()] || 'zero';
    }

    return groupNumber; // for safety
}

/**
 * Remove leading zeros from a string
 *
 * @param {string} number - Input string
 * @returns {string} String without leading zeros
 */
function trimLeadingZeros(number: string): string {
    return number.replace(/^0+/, '') || '0';
}

/**
 * Remove leading negatives from a string
 *
 * @param {string} number - Input string
 * @returns {string} String without leading negatives
 */
function trimLeadingNegatives(number: string): string {
    return number.replace(/^-+/, '');
}
