// src/utils/num2WordUtils.ts

// Core numbers from 0 to 19
export const coreNumbers: Record<string, string> = {
    '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
    '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine',
    '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen',
    '14': 'fourteen', '15': 'fifteen', '16': 'sixteen', '17': 'seventeen',
    '18': 'eighteen', '19': 'nineteen'
};

// Tens place numbers
export const tens: Record<string, string> = {
    '2': 'twenty', '3': 'thirty', '4': 'forty', '5': 'fifty',
    '6': 'sixty', '7': 'seventy', '8': 'eighty', '9': 'ninety'
};

// Larger number groups (thousands, millions, etc.)
export const larger: Record<string, string> =  {'1': 'thousand', '2': 'million', '3': 'billion', '4': 'trillion', '5': 'quadrillion',
    '6': 'quintillion', '7': 'sextillion', '8': 'septillion', '9': 'octillion', '10': 'nonillion',
    '11': 'decillion', '12': 'undecillion', '13': 'duodecillion', '14': 'tredecillion', '15': 'quattuordecillion',
    '16': 'quindecillion', '17': 'sexdecillion', '18': 'septendecillion', '19': 'octodecillion',
    '20': 'novemdecillion', '21': 'vigintillion', '22': 'unvigintillion', '23': 'duovigintillion',
    '24': 'trevigintillion', '25': 'quattuorvigintillion', '26': 'quinvigintillion', '27': 'sexvigintillion',
    '28': 'septenvigintillion', '29': 'octovigintillion', '30': 'novemvigintillion', '31': 'trigintillion',
    '32': 'untrigintillion', '33': 'duotrigintillion', '34': 'tretrigintillion', '35': 'quattuortrigintillion',
    '36': 'quintrigintillion', '37': 'sextrigintillion', '38': 'septentrigintillion', '39': 'octotrigintillion',
    '40': 'novemtrigintillion', '41': 'quadragintillion', '42': 'unquadragintillion', '43': 'duoquadragintillion',
    '44': 'trequadragintillion', '45': 'quattuorquadragintillion', '46': 'quinquadragintillion',
    '47': 'sexquadragintillion', '48': 'septenquadragintillion', '49': 'octoquadragintillion',
    '50': 'novemquadragintillion', '51': 'quinquagintillion', '52':'unquinquagintillion',
    '53': 'duoquinquagintillion', '54': 'trequinquagintillion', '55': 'quattuorquinquagintillion',
    '56': 'quinquinquagintillion', '57': 'sexquinquagintillion', '58': 'septenquinquagintillion',
    '59': 'octoquinquagintillion', '60': 'novemquinquagintillion', '61': 'sexagintillion',
    '62': 'unsexagintillion', '63': 'duosexagintillion', '64': 'tresexagintillion', '65': 'quattuorsexagintillion',
    '66': 'quinsexagintillion', '67': 'sexsexagintillion', '68': 'septensexagintillion', '69': 'octosexagintillion',
    '70': 'novemsexagintillion', '71': 'septuagintillion', '72': 'unseptuagintillion', '73': 'duoseptuagintillion',
    '74': 'treseptuagintillion', '75': 'quattuorseptuagintillion', '76': 'quinseptuagintillion',
    '77': 'sexseptuagintillion', '78': 'septenseptuagintillion', '79': 'octoseptuagintillion',
    '80': 'novemseptuagintillion', '81': 'octogintillion', '82': 'unoctogintillion', '83': 'duooctogintillion',
    '84': 'treoctogintillion', '85': 'quattuoroctogintillion', '86': 'quinoctogintillion', '87': 'sexoctogintillion',
    '88': 'septoctogintillion', '89': 'octooctogintillion', '90': 'novemoctogintillion', '91': 'nonagintillion',
    '92': 'unnonagintillion', '93': 'duononagintillion', '94': 'trenonagintillion', '95': 'quattuornonagintillion',
    '96': 'quinnonagintillion', '97': 'sexnonagintillion', '98': 'septennonagintillion', '99': 'octononagintillion',
    '100': 'novemnonagintillion', '101': 'centillion'};

// Trimming utility functions
export function trimLeadingNegatives(number: string): string {
    return number.replace(/^-+/, '');
}

export function trimLeadingZeros(number: string): string {
    return number.replace(/^0+/, '') || '0';
}

// Parsing number groups into words
export function getWholeNumber(wholeNumber: string): string {
    if (wholeNumber === '') return 'zero';

    const words: string[] = [];
    let parsedObject;

    while (true) {
        parsedObject = parseLargestNumber(trimLeadingZeros(wholeNumber));
        words.push(parsedObject.largestNumber2Word);
        wholeNumber = parsedObject.subNumber;
        if (!wholeNumber) break;
    }

    if (words.length > 1 && words[words.length - 1] === 'zero') words.pop();
    return words.join(" ");
}

// Handle decimal number conversion
export function getDecimalNumber(decimalNumber: string): string {
    if (!decimalNumber) return '';
    const words: string[] = [];
    for (const char of decimalNumber) {
        words.push(coreNumbers[char] || 'zero');
    }
    return 'point ' + words.join(' ');
}

// Parsing logic for the largest number group
export function parseLargestNumber(wholeNumber: string): { largestNumber2Word: string, subNumber: string } {
    const numberGroup: string[] = splitIntoGroups(wholeNumber);
    let largestNumber2Word = '';
    let multiplier = numberGroup.length;

    for (const group of numberGroup) {
        if (parseInt(group, 10) !== 0) {
            largestNumber2Word += getGroupNumber(group);
            if (multiplier > 1) {
                largestNumber2Word += ' ' + larger[(multiplier - 1).toString()];
            }
            largestNumber2Word += ' ';
        }
        multiplier--;
    }

    return { largestNumber2Word: largestNumber2Word.trim(), subNumber: '' };
}

// Split the number into groups of three digits
export function splitIntoGroups(wholeNumber: string): string[] {
    const groups: string[] = [];
    const length = wholeNumber.length;

    for (let i = length; i > 0; i -= 3) {
        const group = wholeNumber.slice(Math.max(0, i - 3), i);
        groups.unshift(group);
    }

    return groups;
}

// Convert each group of three digits into words
export function getGroupNumber(group: string): string {
    const num = parseInt(group, 10);
    
    if (num === 0) return 'zero';
    if (num < 20) return coreNumbers[num.toString()];
    
    let word = '';
    
    // Handle hundreds
    if (group.length === 3 && group[0] !== '0') {
        word += `${coreNumbers[group[0]]} hundred `;
    }

    // Handle tens and ones
    const lastTwo = group.slice(-2);
    
    if (parseInt(lastTwo, 10) < 20) {
        word += coreNumbers[lastTwo];
    } else {
        word += tens[lastTwo[0]];
        if (lastTwo[1] !== '0') {
            word += `-${coreNumbers[lastTwo[1]]}`;
        }
    }

    return word.trim();
}
