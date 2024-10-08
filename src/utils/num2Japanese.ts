// src/utils/num2WordUtils.ts
// Core numbers from 0 to 19
export const coreNumbers: Record<string, string> = {
    '0': 'ゼロ', '1': 'いち', '2': 'に', '3': 'さん', '4': 'し/よん',
    '5': 'ご', '6': 'ろく', '7': 'しち/なな', '8': 'はち', '9': 'きゅう',
    '10': 'じゅう', '11': 'じゅういち', '12': 'じゅうに', '13': 'じゅうさん',
    '14': 'じゅうし/じゅうよん', '15': 'じゅうご', '16': 'じゅうろく', '17': 'じゅうしち/じゅうなな',
    '18': 'じゅうはち', '19': 'じゅうきゅう'
};

// Tens place numbers
export const tens: Record<string, string> = {
    '2': 'にじゅう', '3': 'さんじゅう', '4': 'よんじゅう', '5': 'ごじゅう',
    '6': 'ろくじゅう', '7': 'ななじゅう', '8': 'はちじゅう', '9': 'きゅうじゅう'
};

// Larger number groups (thousands, millions, etc.)
export const larger: Record<string, string> = {
    '1': '千', '2': '百万', '3': '十億', '4': '兆', '5': '京',
    '6': '垓', '7': '禾', '8': '穣', '9': '溝', '10': '澗',
    '11': '正', '12': '載', '13': '極', '14': '恒河沙', '15': '阿僧祇',
    '16': '那由他', '17': '孔子', '18': '無量大数', '19': '十',
    '20': '京', '21': '十京', '22': '百京', '23': '千京',
    '24': '兆京', '25': '無量京', '26': '万', '27': '十万',
    '28': '百万', '29': '千万', '30': '億', '31': '十億',
    '32': '百億', '33': '千億', '34': '兆', '35': '十兆',
    '36': '百兆', '37': '千兆', '38': '京', '39': '十京',
    '40': '百京', '41': '千京', '42': '兆', '43': '十兆',
    '44': '百兆', '45': '千兆', '46': '京', '47': '十京',
    '48': '百京', '49': '千京', '50': '兆', '51': '十兆',
    '52': '百兆', '53': '千兆', '54': '京', '55': '十京',
    '56': '百京', '57': '千京', '58': '兆', '59': '十兆',
    '60': '百兆', '61': '千兆', '62': '京', '63': '十京',
    '64': '百京', '65': '千京', '66': '兆', '67': '十兆',
    '68': '百兆', '69': '千兆', '70': '京', '71': '十京',
    '72': '百京', '73': '千京', '74': '兆', '75': '十兆',
    '76': '百兆', '77': '千兆', '78': '京', '79': '十京',
    '80': '百京', '81': '千京', '82': '兆', '83': '十兆',
    '84': '百兆', '85': '千兆', '86': '京', '87': '十京',
    '88': '百京', '89': '千京', '90': '兆', '91': '十兆',
    '92': '百兆', '93': '千兆', '94': '京', '95': '十京',
    '96': '百京', '97': '千京', '98': '兆', '99': '十兆',
    '100': '千', '101': '百'
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
    if (wholeNumber === '') return 'ゼロ';

    const words: string[] = [];
    let parsedObject;

    while (true) {
        parsedObject = parseLargestNumber(trimLeadingZeros(wholeNumber));
        words.push(parsedObject.largestNumber2Word);
        wholeNumber = parsedObject.subNumber;
        if (!wholeNumber) break;
    }

    if (words.length > 1 && words[words.length - 1] === 'ゼロ') words.pop();
    return words.join(" ");
}

// Handle decimal number conversion
export function getDecimalNumber(decimalNumber: string): string {
    if (!decimalNumber) return '';
    const words: string[] = [];
    for (const char of decimalNumber) {
        words.push(coreNumbers[char] || 'ゼロ');
    }
    return 'ポイント ' + words.join(' ');
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
    
    if (num === 0) return 'ゼロ';
    if (num < 20) return coreNumbers[num.toString()];
    
    let word = '';
    
    // Handle hundreds
    if (group.length === 3 && group[0] !== '0') {
        word += `${coreNumbers[group[0]]} 千 `;
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
