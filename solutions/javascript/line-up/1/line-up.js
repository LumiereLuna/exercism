function ordinality(number) {
    const numSt = number.toString();
    if (numSt.endsWith('1') && !numSt.endsWith('11')) {
        return 'st';
    } else if (numSt.endsWith('2') && !numSt.endsWith('12')) {
        return 'nd';
    } else if (numSt.endsWith('3') && !numSt.endsWith('13')) {
        return 'rd';
    } else {
        return 'th';
    }
}

export const format = (name, number) => {
    return `${name}, you are the ${number}${ordinality(number)} customer we serve today. Thank you!`;
};
