// src/utils/num2WordUtils.ts
// Core numbers from 0 to 19
export const coreNumbers: Record<string, string> = {
    '0': 'zero', '1': 'um', '2': 'dois', '3': 'três', '4': 'quatro',
    '5': 'cinco', '6': 'seis', '7': 'sete', '8': 'oito', '9': 'nove',
    '10': 'dez', '11': 'onze', '12': 'doze', '13': 'treze',
    '14': 'quatorze', '15': 'quinze', '16': 'dezesseis', '17': 'dezessete',
    '18': 'dezoito', '19': 'dezenove'
};

// Tens place numbers
export const tens: Record<string, string> = {
    '2': 'vinte', '3': 'trinta', '4': 'quarenta', '5': 'cinquenta',
    '6': 'sessenta', '7': 'setenta', '8': 'oitenta', '9': 'noventa'
};

// Larger number groups (thousands, millions, etc.)
export const larger: Record<string, string> = {
    '1': 'mil', '2': 'milhão', '3': 'bilhão', '4': 'trilhão', '5': 'quadrilhão',
    '6': 'quintilhão', '7': 'sextilhão', '8': 'septilhão', '9': 'octilhão', '10': 'nonilhão',
    '11': 'decilhão', '12': 'undecilhão', '13': 'duodecilhão', '14': 'tredecilhão', '15': 'quattuordecilhão',
    '16': 'quindecilhão', '17': 'sexdecilhão', '18': 'septendecilhão', '19': 'octodecilhão',
    '20': 'novemdecilhão', '21': 'vigésimo', '22': 'vigésimo primeiro', '23': 'vigésimo segundo',
    '24': 'vigésimo terceiro', '25': 'vigésimo quarto', '26': 'vigésimo quinto', '27': 'vigésimo sexto',
    '28': 'vigésimo sétimo', '29': 'vigésimo oitavo', '30': 'vigésimo nono', '31': 'trigésimo',
    '32': 'trigésimo primeiro', '33': 'trigésimo segundo', '34': 'trigésimo terceiro', '35': 'trigésimo quarto',
    '36': 'trigésimo quinto', '37': 'trigésimo sexto', '38': 'trigésimo sétimo', '39': 'trigésimo oitavo',
    '40': 'quadragésimo', '41': 'quadragésimo primeiro', '42': 'quadragésimo segundo', '43': 'quadragésimo terceiro',
    '44': 'quadragésimo quarto', '45': 'quadragésimo quinto', '46': 'quadragésimo sexto', '47': 'quadragésimo sétimo',
    '48': 'quadragésimo oitavo', '49': 'quadragésimo nono', '50': 'quinquagésimo', '51': 'quinquagésimo primeiro',
    '52': 'quinquagésimo segundo', '53': 'quinquagésimo terceiro', '54': 'quinquagésimo quarto', '55': 'quinquagésimo quinto',
    '56': 'quinquagésimo sexto', '57': 'quinquagésimo sétimo', '58': 'quinquagésimo oitavo', '59': 'quinquagésimo nono',
    '60': 'sexagésimo', '61': 'sexagésimo primeiro', '62': 'sexagésimo segundo', '63': 'sexagésimo terceiro',
    '64': 'sexagésimo quarto', '65': 'sexagésimo quinto', '66': 'sexagésimo sexto', '67': 'sexagésimo sétimo',
    '68': 'sexagésimo oitavo', '69': 'sexagésimo nono', '70': 'septuagésimo', '71': 'septuagésimo primeiro',
    '72': 'septuagésimo segundo', '73': 'septuagésimo terceiro', '74': 'septuagésimo quarto', '75': 'septuagésimo quinto',
    '76': 'septuagésimo sexto', '77': 'septuagésimo sétimo', '78': 'septuagésimo oitavo', '79': 'septuagésimo nono',
    '80': 'octogésimo', '81': 'octogésimo primeiro', '82': 'octogésimo segundo', '83': 'octogésimo terceiro',
    '84': 'octogésimo quarto', '85': 'octogésimo quinto', '86': 'octogésimo sexto', '87': 'octogésimo sétimo',
    '88': 'octogésimo oitavo', '89': 'octogésimo nono', '90': 'nonagésimo', '91': 'nonagésimo primeiro',
    '92': 'nonagésimo segundo', '93': 'nonagésimo terceiro', '94': 'nonagésimo quarto', '95': 'nonagésimo quinto',
    '96': 'nonagésimo sexto', '97': 'nonagésimo sétimo', '98': 'nonagésimo oitavo', '99': 'nonagésimo nono',
    '100': 'cem', '101': 'cento e um'
};


// Trimming utility functions
export function trimLeadingNegatives(number: string): string {
    return number.replace(/^-+/, '');
}

export function trimLeadingZeros(number: string): string {
    return number.replace(/^0+/, '') || '0';
}

// Parsing number groups into words
export function getWholeNumber(wholeNumber: string): string {
    if (wholeNumber === '') return 'ноль';

    const words: string[] = [];
    let parsedObject;

    while (true) {
        parsedObject = parseLargestNumber(trimLeadingZeros(wholeNumber));
        words.push(parsedObject.largestNumber2Word);
        wholeNumber = parsedObject.subNumber;
        if (!wholeNumber) break;
    }

    if (words.length > 1 && words[words.length - 1] === 'ноль') words.pop();
    return words.join(" ");
}

// Handle decimal number conversion
export function getDecimalNumber(decimalNumber: string): string {
    if (!decimalNumber) return '';
    const words: string[] = [];
    for (const char of decimalNumber) {
        words.push(coreNumbers[char] || 'ноль');
    }
    return 'точка ' + words.join(' ');
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
    
    if (num === 0) return 'ноль';
    if (num < 20) return coreNumbers[num.toString()];
    
    let word = '';
    
    // Handle hundreds
    if (group.length === 3 && group[0] !== '0') {
        word += `${coreNumbers[group[0]]} сто `;
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
