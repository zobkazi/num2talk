// src/utils/num2Hindi.ts

// Core numbers from 0 to 19
export const coreNumbers: Record<string, string> = {
    '0': 'शून्य', '1': 'एक', '2': 'दो', '3': 'तीन', '4': 'चार',
    '5': 'पाँच', '6': 'छह', '7': 'सात', '8': 'आठ', '9': 'नौ',
    '10': 'दस', '11': 'ग्यारह', '12': 'बारह', '13': 'तेरह',
    '14': 'चौदह', '15': 'पंद्रह', '16': 'सोलह', '17': 'सत्रह',
    '18': 'अठारह', '19': 'उन्नीस'
};

// Tens place numbers
export const tens: Record<string, string> = {
'2': 'बीस', '3': 'तीस', '4': 'चालीस', '5': 'पचास',
    '6': 'साठ', '7': 'सत्तर', '8': 'अस्सी', '9': 'नब्बे'

};

// Larger number groups (thousands, millions, etc.)
export const larger: Record<string, string> = {
    '1': 'हज़ार', '2': 'लाख', '3': 'करोड़', '4': 'अरब', '5': 'खरब',
    '6': 'हज़ार खरब', '7': 'लाख खरब', '8': 'करोड़ खरब', '9': 'अरब खरब',
    '10': 'खरब', '11': 'हज़ार खरब', '12': 'लाख खरब', '13': 'करोड़ खरब',
    '14': 'अरब खरब', '15': 'लाख करोड़', '16': 'करोड़ करोड़', '17': 'अरब करोड़',
    '18': 'खरब करोड़', '19': 'हज़ार करोड़', '20': 'लाख करोड़',
    '21': 'करोड़ करोड़', '22': 'अरब करोड़', '23': 'खरब करोड़',
    // Add further number groups as needed
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
    if (wholeNumber === '') return 'शून्य';

    const words: string[] = [];
    let parsedObject;

    while (true) {
        parsedObject = parseLargestNumber(trimLeadingZeros(wholeNumber));
        words.push(parsedObject.largestNumber2Word);
        wholeNumber = parsedObject.subNumber;
        if (!wholeNumber) break;
    }

    if (words.length > 1 && words[words.length - 1] === 'शून्य') words.pop();
    return words.join(" ");
}

// Handle decimal number conversion
export function getDecimalNumber(decimalNumber: string): string {
    if (!decimalNumber) return '';
    const words: string[] = [];
    for (const char of decimalNumber) {
        words.push(coreNumbers[char] || 'शून्य');
    }
    return 'दशमलव ' + words.join(' ');
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
    
    if (num === 0) return 'जीरो';
    if (num < 20) return coreNumbers[num.toString()];
    
    let word = '';
    
    // Handle hundreds
    if (group.length === 3 && group[0] !== '0') {
        word += `${coreNumbers[group[0]]} जीरो `;
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
