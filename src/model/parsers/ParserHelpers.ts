// @ts-ignore
import googleTranslate from 'translate';

export function fudgeDateYear(date: Date): Date {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    date.setFullYear(currentYear);

    // to account for year roll-over...
    if (date.getTime() > currentDate.getTime()) {
        date.setFullYear(currentYear - 1);
    }

    return date;
}

export async function translate(language: string, text: string): Promise<string> {
    googleTranslate.engine = 'google';
    googleTranslate.key = process.env.TRANSLATE_KEY;
    googleTranslate.from = language;

    let result = await googleTranslate(text);
    return result;
}