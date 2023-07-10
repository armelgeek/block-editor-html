export function includesDeep(arr, obj) {
    const filtered = arr.filter((value) => _.isEqual(value, obj));
    return filtered.length > 0;
}
export function shiftArrayLeft(arr) {
    if (arr.length > 0) {
        const firstElement = arr.shift();
        arr.push(firstElement);
    }
    return arr;
}
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const getRandomShuffledIndex = (
    length,
    currentIndex
) => {
    let randomIndex = currentIndex;
    while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * length);
    }
    return randomIndex;
};

export const getNextShuffledIndex = (currentIndex, length) => {
    const shuffledIndexes = getShuffledIndexes(length);
    const nextIndex = shuffledIndexes.indexOf(currentIndex) + 1;
    return nextIndex >= length ? shuffledIndexes[0] : shuffledIndexes[nextIndex];
};

export const getPrevShuffledIndex = (currentIndex, length) => {
    const shuffledIndexes = getShuffledIndexes(length);
    const prevIndex = shuffledIndexes.indexOf(currentIndex) - 1;
    return prevIndex < 0
        ? shuffledIndexes[length - 1]
        : shuffledIndexes[prevIndex];
};

export const getShuffledIndexes = (length) => {
    const indexes = Array.from({ length }, (_, index) => index);
    return shuffleArray(indexes);
};

export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};
