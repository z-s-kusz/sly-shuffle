/**
 * @typedef {{weight: number, pickMe: boolean }} Item
 * @param {Item[]} items
 * @return {Item|undefined}
 */
export function getRandomItemWithCheatOption(items) {
    if (!items || items.length < 1) return undefined;

    /* Cheats code. For a real weighted picker remove the code between comment lines and clean up the jsdoc/name */
    const garunteedItem = items.find((item) => item.pickMe);
    if (garunteedItem) return garunteedItem;
    /* */

    const weights = [items[0].weight];
    for (let i = 1; i < items.length; i++) {
        weights.push(items[i].weight + weights[i - 1]);
    }

    const randomWeightNumber = Math.random() * weights[weights.length - 1];

    const selectedItem = items.find((item, i) => {
        return weights[i] > randomWeightNumber;
    });

    return selectedItem;
}
