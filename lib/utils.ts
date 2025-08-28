import { DateData } from "react-native-calendars";

// Convert a Date object to a DateData object
export const dateToDateData = (date: Date) => {
    // Function for padding a string
    const pad = (n: number, d: number) => n.toString().padStart(d, '0');

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const timestamp = date.getTime();

    // Pad the month and day strings
    const monthString = pad(month, 2);
    const dayString = pad(day, 2);

    // Format the date into a YYYY-MM-DD string
    const dateString = `${year}-${monthString}-${dayString}`;

    // Create and return the DateData object
    return {
        year,
        month,
        day,
        timestamp,
        dateString,
    } as DateData;
}