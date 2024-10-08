// numToWords.ts

type NumToWords = (number: number | string) => string;

const numToWords: NumToWords = (n) => {
  const a = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen'
  ];

  const b = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];

  const g = [
    '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion',
    'sextillion', 'septillion', 'octillion', 'nonillion'
  ];

  const arr = (x: string): string[] => Array.from(x);
  const num = (x: string): number => Number(x) || 0;
  const isEmpty = (xs: string[]): boolean => xs.length === 0;
  const take = (n: number) => (xs: string[]): string[] => xs.slice(0, n);
  const drop = (n: number) => (xs: string[]): string[] => xs.slice(n);
  const comp = <T, U, V>(f: (x: T) => V) => (g: (x: U) => T) => (x: U): V => f(g(x));
  const not = (x: boolean): boolean => !x;
  const isEmptyFilter = (x: unknown): boolean => Array.isArray(x) && isEmpty(x as string[]);
  const chunk = (n: number) => (xs: string[]): string[][] =>
    isEmpty(xs) ? [] : [take(n)(xs)].concat(chunk(n)(drop(n)(xs)));

  // Helper function to construct a group of three digits
  const makeGroup = ([ones, tens, huns]: string[]): string => {
    return [
      huns ? a[num(huns)] + ' hundred ' : '',
      tens === '1' ? a[Number(tens + ones)] : b[num(tens)] && b[num(tens)] + (ones ? '-' : '') || '',
      a[num(ones)] || ''
    ].join('');
  };

  const thousand = (group: string, i: number): string => {
    return group ? group + ' ' + g[i] : group;
  };

  const numToWordsFunction = (n: string | number): string => {
    if (typeof n === 'number') return numToWords(String(n));
    if (n === '0') return 'zero';

    // Fix: Add type assertions to ensure the correct type
    return chunk(3)(arr(String(n)) as string[])
    .map(makeGroup)
    .map(thousand)
    .filter(comp(not)(isEmptyFilter))
    .reverse()
    .join(' ');

  };
  return numToWordsFunction(n);
};

export default numToWords


