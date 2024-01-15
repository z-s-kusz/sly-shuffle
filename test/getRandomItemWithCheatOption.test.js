import { getRandomItemWithCheatOption } from '../src/utility/getRandomItemWithCheatOption';
import { expect, test } from 'vitest';

const testItems = [
    { id: 0, name: 'foo', weight: 1, pickMe: false },
    { id: 1, name: 'bar', weight: 1, pickMe: false },
    { id: 2, name: 'baz', weight: 1, pickMe: false },
    { id: 3, name: 'bip', weight: 1, pickMe: false },
    { id: 4, name: 'bop', weight: 1, pickMe: false },
];

test('pickMe returns the cheat item', () => {
    const testItemsClone = structuredClone(testItems);
    const cheatItem = testItemsClone[3];
    cheatItem.pickMe = true;

    const selection = getRandomItemWithCheatOption(testItemsClone);

    expect(selection).toEqual(cheatItem);
});

// 2% variance allowed
// I suppose it's possible for RNG tests to fail by pure chance,
// not sure the math on how many runs are needed to effectively 'guarantee' a pass

test('repeated runs results in ~20% selection for each item', () => {
    const testItemsClone = structuredClone(testItems);
    const resultsArray = [0, 0, 0, 0, 0];
    const cyclesCount = 2000;
    const rangeMin = 0.18;
    const rangeMax = 0.22;

    for (let i = 0; i < cyclesCount; i++) {
        const selection = getRandomItemWithCheatOption(testItemsClone);
        resultsArray[selection.id]++;
    }

    resultsArray.forEach((result) => {
        const percentage = result / cyclesCount; // 2/5 or 0.20
        expect(percentage).toBeGreaterThanOrEqual(rangeMin);
        expect(percentage).toBeLessThanOrEqual(rangeMax);
    });
});

test('weighted items are selected proportionally more often', () => {
    const testItemsClone = structuredClone(testItems);
    const cyclesCount = 2000;
    const resultsArray = [0, 0, 0, 0, 0];

    const doubledItem = testItemsClone[0];
    doubledItem.weight = 2;

    const quadroupledItem = testItemsClone[1];
    quadroupledItem.weight = 4;

    for (let i = 0; i < cyclesCount; i++) {
        const selection = getRandomItemWithCheatOption(testItemsClone);
        resultsArray[selection.id]++;
    }

    const doubledItemPercentage = resultsArray[0] / cyclesCount; // 2/9 or 0.2222
    expect(doubledItemPercentage).toBeGreaterThanOrEqual(0.2);
    expect(doubledItemPercentage).toBeLessThanOrEqual(0.24);

    const quadroupledItemPercentage = resultsArray[1] / cyclesCount; // 4/9 or 0.4444
    expect(quadroupledItemPercentage).toBeGreaterThanOrEqual(0.42);
    expect(quadroupledItemPercentage).toBeLessThanOrEqual(0.46);

    for (let i = 2; i < resultsArray.length; i++) {
        const percentage = resultsArray[i] / cyclesCount; // 1/9 or 0.1111
        expect(percentage).toBeGreaterThanOrEqual(0.09);
        expect(percentage).toBeLessThanOrEqual(0.13);
    }
});
