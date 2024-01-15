export function maskPositiveNumberInput(input) {
    const parsedInput = parseInt(input);

    if (isNaN(parsedInput)) {
        return 0;
    } else {
        return parsedInput;
    }
}
