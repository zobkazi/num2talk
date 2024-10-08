// src/utils/num2WordUtils.ts

// Core numbers from 0 to 19
export const coreNumbers: Record<string, string> = {
    '0': 'cero', '1': 'uno', '2': 'dos', '3': 'tres', '4': 'cuatro',
    '5': 'cinco', '6': 'seis', '7': 'siete', '8': 'ocho', '9': 'nueve',
    '10': 'diez', '11': 'once', '12': 'doce', '13': 'trece',
    '14': 'catorce', '15': 'quince', '16': 'dieciséis', '17': 'diecisiete',
    '18': 'dieciocho', '19': 'diecinueve'
};

// Tens place numbers
export const tens: Record<string, string> = {
    '2': 'veinte', '3': 'treinta', '4': 'cuarenta', '5': 'cincuenta',
    '6': 'sesenta', '7': 'setenta', '8': 'ochenta', '9': 'noventa'
};

// Larger number groups (thousands, millions, etc.)
export const larger: Record<string, string> = {
    '1': 'mil', '2': 'millón', '3': 'mil millones', '4': 'billón', '5': 'quatrillón',
    '6': 'quintillón', '7': 'sextillón', '8': 'septillón', '9': 'octillón', '10': 'nonillón',
    '11': 'decillón', '12': 'undecillón', '13': 'duodecillón', '14': 'tredecillón', '15': 'cuatordecillón',
    '16': 'quindecillón', '17': 'sexdecillón', '18': 'septendecillón', '19': 'octodecillón',
    '20': 'novemdecillón', '21': 'vigésimo', '22': 'vigésimo primero', '23': 'vigésimo segundo',
    '24': 'vigésimo tercero', '25': 'vigésimo cuarto', '26': 'vigésimo quinto', '27': 'vigésimo sexto',
    '28': 'vigésimo séptimo', '29': 'vigésimo octavo', '30': 'trigésimo', '31': 'trigésimo primero',
    '32': 'trigésimo segundo', '33': 'trigésimo tercero', '34': 'trigésimo cuarto', '35': 'trigésimo quinto',
    '36': 'trigésimo sexto', '37': 'trigésimo séptimo', '38': 'trigésimo octavo', '39': 'trigésimo noveno',
    '40': 'cuadragésimo', '41': 'cuadragésimo primero', '42': 'cuadragésimo segundo', '43': 'cuadragésimo tercero',
    '44': 'cuadragésimo cuarto', '45': 'cuadragésimo quinto', '46': 'cuadragésimo sexto', '47': 'cuadragésimo séptimo',
    '48': 'cuadragésimo octavo', '49': 'cuadragésimo noveno', '50': 'quincuagésimo', '51': 'quincuagésimo primero',
    '52': 'quincuagésimo segundo', '53': 'quincuagésimo tercero', '54': 'quincuagésimo cuarto', '55': 'quincuagésimo quinto',
    '56': 'quincuagésimo sexto', '57': 'quincuagésimo séptimo', '58': 'quincuagésimo octavo', '59': 'quincuagésimo noveno',
    '60': 'sexagésimo', '61': 'sexagésimo primero', '62': 'sexagésimo segundo', '63': 'sexagésimo tercero',
    '64': 'sexagésimo cuarto', '65': 'sexagésimo quinto', '66': 'sexagésimo sexto', '67': 'sexagésimo séptimo',
    '68': 'sexagésimo octavo', '69': 'sexagésimo noveno', '70': 'septuagésimo', '71': 'septuagésimo primero',
    '72': 'septuagésimo segundo', '73': 'septuagésimo tercero', '74': 'septuagésimo cuarto', '75': 'septuagésimo quinto',
    '76': 'septuagésimo sexto', '77': 'septuagésimo séptimo', '78': 'septuagésimo octavo', '79': 'septuagésimo noveno',
    '80': 'octogésimo', '81': 'octogésimo primero', '82': 'octogésimo segundo', '83': 'octogésimo tercero',
    '84': 'octogésimo cuarto', '85': 'octogésimo quinto', '86': 'octogésimo sexto', '87': 'octogésimo séptimo',
    '88': 'octogésimo octavo', '89': 'octogésimo noveno', '90': 'nonagésimo', '91': 'nonagésimo primero',
    '92': 'nonagésimo segundo', '93': 'nonagésimo tercero', '94': 'nonagésimo cuarto', '95': 'nonagésimo quinto',
    '96': 'nonagésimo sexto', '97': 'nonagésimo séptimo', '98': 'nonagésimo octavo', '99': 'nonagésimo noveno',
    '100': 'cien', '101': 'ciento uno'
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
    if (wholeNumber === '') return 'cero';

    const words: string[] = [];
    let parsedObject;

    while (true) {
        parsedObject = parseLargestNumber(trimLeadingZeros(wholeNumber));
        words.push(parsedObject.largestNumber2Word);
        wholeNumber = parsedObject.subNumber;
        if (!wholeNumber) break;
    }

    if (words.length > 1 && words[words.length - 1] === 'cero') words.pop();
    return words.join(" ");
}

// Handle decimal number conversion
export function getDecimalNumber(decimalNumber: string): string {
    if (!decimalNumber) return '';
    const words: string[] = [];
    for (const char of decimalNumber) {
        words.push(coreNumbers[char] || 'cero');
    }
    return 'punto ' + words.join(' ');
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
    
    if (num === 0) return 'cero';
    if (num < 20) return coreNumbers[num.toString()];
    
    let word = '';
    
    // Handle hundreds
    if (group.length === 3 && group[0] !== '0') {
        word += `${coreNumbers[group[0]]} cien `;
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
