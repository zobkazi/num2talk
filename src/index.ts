import num2Word from './languages/num2Word';
import num2Money from './languages/num2bn';
const num = 100098

console.log(num2Word(num))

// নয়  হাজার নয় শত নব্বই  টাকা 
console.log(num2Money(num))