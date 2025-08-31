import { DateData } from "react-native-calendars";

// Function for padding a string
const pad = (n: number, d: number, c: string) => n.toString().padStart(d, c);
const padZeroes = (n: number) => pad(n, 2, '0');


// Convert a string (YYYY-MM-DD) to a DateData object
export const stringToDateData = (dateString: string) => {
    // Split the date string to the separate YYYY, MM, DD components
    const dateArr = dateString.split("-");

    // Parse each part of the string
    const year = parseInt(dateArr[0]);
    const month = parseInt(dateArr[1]);
    const day = parseInt(dateArr[2]);

    // Get the date
    const date = new Date(year, month - 1, day);

    // Return the date data
    return dateToDateData(date);
}
// Convert a Date object to a DateData object
export const dateToDateData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const timestamp = date.getTime();

    // Pad the month and day strings
    const monthString = padZeroes(month);
    const dayString = padZeroes(day);

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
};
// Convert a string of seconds to a time representation (90 => 1:30)
export const secondsToMinutesAndSeconds = (string: string) => {
    const number = parseInt(string);
    const minutes = Math.floor(number / 60);
    const seconds = padZeroes(number - minutes * 60);

    return `${minutes}:${seconds}`;
}
// Convert a number to a time representation (90 => 1:30)
export const minutesAndSecondsToSeconds = (string: string) => {
    // Split the string to the separate minutes and seconds components
    const timeArr = string.split(":");

    // Parse each part of the string
    const minutes = parseInt(timeArr[0]);
    const seconds = parseInt(timeArr[1]);

    const number = minutes * 60 + seconds;

    return number;
}



// Math functions
export const radiansToDegrees = (radians: number) => {
    return radians * (180 / Math.PI);
}
export const degreesToRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
}


// // Utility functions for sensors (acceleration, position, etc.)
// For clarity's sake, the 'top' of the device is defined here as the topmost part of the device pointing up when making a phone call, held to the ear
export const isWithinThreshold = (x: number, y: number, threshold: number = 0.2) => {
    const value = x - y;

    if (Math.abs(value) < threshold)
        return true;
    else
        return false;
};
// The below group of "accel_" functions are for using the Accelerometer from expo-sensors
export const accel_isPointingInDirection = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, threshold: number = 0.2) => {
    // If any of the axis values are wrong, return false
    if (!isWithinThreshold(x0, x1)) return false;
    if (!isWithinThreshold(y0, y1)) return false;
    if (!isWithinThreshold(z0, z1)) return false;

    // If no axis values are wrong, return true
    return true;
};
export const accel_isPointingUp = (x: number, y: number, z: number, threshold: number = 0.2) => {
    return accel_isPointingInDirection(x, y, z, 0, -1, 0, threshold);
};
export const accel_isPointingDown = (x: number, y: number, z: number, threshold: number = 0.2) => {
    return accel_isPointingInDirection(x, y, z, 0, 1, 0, threshold);
};
export const accel_isPointingLeft = (x: number, y: number, z: number, threshold: number = 0.2) => {
    return accel_isPointingInDirection(x, y, z, -1, 0, 0, threshold);
};
export const accel_isPointingRight = (x: number, y: number, z: number, threshold: number = 0.2) => {
    return accel_isPointingInDirection(x, y, z, 1, 0, 0, threshold);
};
export const accel_isFlatUp = (x: number, y: number, z: number, threshold: number = 0.2) => {
    return accel_isPointingInDirection(x, y, z, 0, 0, -1, threshold);
};
export const accel_isFlatDown = (x: number, y: number, z: number, threshold: number = 0.2) => {
    return accel_isPointingInDirection(x, y, z, 0, 0, 1, threshold);
};
