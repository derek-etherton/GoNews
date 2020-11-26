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