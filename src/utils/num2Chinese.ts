// src/utils/num2WordUtils.ts

// Core numbers from 0 to 19
export const coreNumbers: Record<string, string> = {
    '0': '零', '1': '一', '2': '二', '3': '三', '4': '四',
    '5': '五', '6': '六', '7': '七', '8': '八', '9': '九',
    '10': '十', '11': '十一', '12': '十二', '13': '十三',
    '14': '十四', '15': '十五', '16': '十六', '17': '十七',
    '18': '十八', '19': '十九'
};


// Tens place numbers
export const tens: Record<string, string> = {
    '2': '二十', '3': '三十', '4': '四十', '5': '五十',
    '6': '六十', '7': '七十', '8': '八十', '9': '九十'
};


// Larger number groups (thousands, millions, etc.)
export const larger: Record<string, string> = {
    '1': '千', '2': '百万', '3': '十亿', '4': '万亿', '5': '千万亿',
    '6': '亿亿', '7': '十亿亿', '8': '百亿亿', '9': '千亿亿', '10': '万亿亿',
    '11': '十万亿', '12': '百万亿', '13': '千万亿', '14': '亿万亿', '15': '十亿万亿',
    '16': '百亿万亿', '17': '千亿万亿', '18': '万亿万亿', '19': '十万亿万亿',
    '20': '亿万亿', '21': '二十亿亿', '22': '三十亿亿', '23': '四十亿亿',
    '24': '五十亿亿', '25': '六十亿亿', '26': '七十亿亿', '27': '八十亿亿',
    '28': '九十亿亿', '29': '百亿万亿', '30': '千亿万亿', '31': '万亿万亿',
    '32': '十万亿万亿', '33': '百万亿万亿', '34': '千万亿万亿', '35': '亿亿万亿',
    '36': '十亿万亿', '37': '百亿万亿', '38': '千亿万亿', '39': '万亿万亿',
    '40': '十万亿万亿', '41': '百万亿万亿', '42': '千万亿万亿', '43': '亿亿万亿',
    '44': '十亿万亿', '45': '百亿万亿', '46': '千亿万亿', '47': '万亿万亿',
    '48': '十万亿万亿', '49': '百万亿万亿', '50': '千万亿万亿', '51': '亿亿万亿',
    '52': '十亿万亿', '53': '百亿万亿', '54': '千亿万亿', '55': '万亿万亿',
    '56': '十万亿万亿', '57': '百万亿万亿', '58': '千万亿万亿', '59': '亿亿万亿',
    '60': '六十亿万亿', '61': '六十亿万亿', '62': '十六十亿万亿', '63': '二十亿万亿',
    '64': '三十亿万亿', '65': '四十亿万亿', '66': '五十亿万亿', '67': '六十亿万亿',
    '68': '七十亿万亿', '69': '八十亿万亿', '70': '九十亿万亿', '71': '七十亿万亿',
    '72': '八十亿万亿', '73': '九十亿万亿', '74': '十万亿万亿', '75': '百万亿万亿',
    '76': '千万亿万亿', '77': '亿亿万亿', '78': '十亿万亿', '79': '百亿万亿',
    '80': '千亿万亿', '81': '万亿万亿', '82': '十万亿万亿', '83': '百万亿万亿',
    '84': '千万亿万亿', '85': '亿亿万亿', '86': '十亿万亿', '87': '百亿万亿',
    '88': '千亿万亿', '89': '万亿万亿', '90': '十万亿万亿', '91': '百万亿万亿',
    '92': '千万亿万亿', '93': '亿亿万亿', '94': '十亿万亿', '95': '百亿万亿',
    '96': '千亿万亿', '97': '万亿万亿', '98': '十万亿万亿', '99': '百万亿万亿',
    '100': '亿亿万亿', '101': '千亿亿'
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
    if (wholeNumber === '') return '零';

    const words: string[] = [];
    let parsedObject;

    while (true) {
        parsedObject = parseLargestNumber(trimLeadingZeros(wholeNumber));
        words.push(parsedObject.largestNumber2Word);
        wholeNumber = parsedObject.subNumber;
        if (!wholeNumber) break;
    }

    if (words.length > 1 && words[words.length - 1] === '零') words.pop();
    return words.join(" ");
}

// Handle decimal number conversion
export function getDecimalNumber(decimalNumber: string): string {
    if (!decimalNumber) return '';
    const words: string[] = [];
    for (const char of decimalNumber) {
        words.push(coreNumbers[char] || '零');
    }
    return '觀點 ' + words.join(' ');
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
    
    if (num === 0) return '零';
    if (num < 20) return coreNumbers[num.toString()];
    
    let word = '';
    
    // Handle hundreds
    if (group.length === 3 && group[0] !== '0') {
        word += `${coreNumbers[group[0]]} 百 `;
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
