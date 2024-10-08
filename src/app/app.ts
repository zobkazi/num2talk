import { num2Bangla } from "../index";

const app = () => {
    const number = 12345; // ইংরেজি সংখ্যা
    const banNumber = '৭৯৮৩'; // বাংলা সংখ্যা

    // ইংরেজি সংখ্যা রূপান্তর
    console.log(num2Bangla(number.toString())); // আউটপুট: "বারো হাজার তিনশত পঁচল্লিশ টাকা"

    // বাংলা সংখ্যা রূপান্তর
    console.log(num2Bangla(banNumber)); // আউটপুট: "সাত হাজার নয়শত তিরিশ টাকা"
}

export default app;
