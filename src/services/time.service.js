/**
 * Add '0' before 1-digit numbers
 * @param {number} timeUnit
 */
const toTwoDigitsFormat = (timeUnit) => timeUnit > 9 ? timeUnit : ('0' + timeUnit);

/**
 * Translates seconds to 'mm:ss' ('90' -> '01:30')
 * @param {number} timeInSeconds
 * @returns {string}
 */
export const secondsToMinutesAndSeconds = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) {
        return '--:--';
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${toTwoDigitsFormat(minutes)}:${toTwoDigitsFormat(seconds)}`;
};
