import {
    apple,
    corn,
    garlic,
    grapes,
    hotPepper,
    lemon,
    mushroom,
    peanuts,
    pear,
    pineapple,
    potato,
    strawberry,
    tangerine,
    tomato,
    watermelon
} from '../assets/fruits';

const fruitArray = [
    apple,
    corn,
    garlic,
    grapes,
    hotPepper,
    lemon,
    mushroom,
    peanuts,
    pear,
    pineapple,
    potato,
    strawberry,
    tangerine,
    tomato,
    watermelon
]

const keys = [
    { buttonValue: 1, fruit: apple, color: "white" },
    { buttonValue: 2, fruit: corn, color: "yellow" },
    { buttonValue: 3, fruit: garlic, color: "red" },
    { buttonValue: 4, fruit: grapes, color: "blue" },
    { buttonValue: 5, fruit: hotPepper, color: "green" },
    { buttonValue: 6, fruit: lemon, color: "purple" },
    { buttonValue: 7, fruit: mushroom, color: "orange" },
    { buttonValue: 8, fruit: peanuts, color: "black" },
    { buttonValue: 9, fruit: pear, color: "brown" },
    { buttonValue: ".", fruit: null, color: "purple95" },
    { buttonValue: 0, fruit: pineapple, color: "silver" },
    { buttonValue: "DELETE", fruit: null, color: "purple95" },
];

//focusPosition should be fruit position for user to note (left, right or center)
const FOCUS_POSITION = {
    LEFT: "LEFT",
    CENTER: "CENTER",
    RIGHT: "RIGHT"
}

const otherRandomFruits = () => Math.floor(Math.random() * fruitArray.length);

const fruitTrio = (focusPosition, key) => {
    if (focusPosition === FOCUS_POSITION.LEFT) {
        return [key.fruit, fruitArray[otherRandomFruits()], fruitArray[otherRandomFruits()]]
    }
    if (focusPosition === FOCUS_POSITION.CENTER) {
        return [fruitArray[otherRandomFruits()], key.fruit, fruitArray[otherRandomFruits()]]
    }
    if (focusPosition === FOCUS_POSITION.RIGHT) {
        return [fruitArray[otherRandomFruits()], fruitArray[otherRandomFruits()], key.fruit]
    }
};

const shuffledArr = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
}

const switchIndex = arr => {
    let removeIndexes = [];
    let replaceIndexes = [];
    let newArr = []
    arr.map((item, index) => {
        if (item.buttonValue == '.' && index != 9) {
            replaceIndexes.push(item);
            newArr.push(".");
        } else if (item.buttonValue == "DELETE" && index != 11) {
            replaceIndexes.push(item);
            newArr.push("DELETE");
        } else if (item.buttonValue != '.' && index == 9 || item.buttonValue != 'DELETE' && index == 11) {
            removeIndexes.push(item);
            newArr.push(null);
        }
        else {
            newArr.push(item);
        }
    });
    let holdRemoveIndex = 0;
    return newArr.map((val, ind) => {
        if (ind == 9 && !(val instanceof Object)) {
            return val = replaceIndexes.filter(it => it.buttonValue == ".")[0];
        }
        if (ind == 11 && !(val instanceof Object)) {
            return val = replaceIndexes.filter(it => it.buttonValue == "DELETE")[0];
        }
        if (ind != 9 && !(val instanceof Object) || ind != 11 && !(val instanceof Object)) {
            val = removeIndexes[holdRemoveIndex];
            holdRemoveIndex++;
            return val;
        }
        return val;
    });
}

const randomizeValuesAndKeepDotDelete = () => {
    return switchIndex(shuffledArr(keys));
}

const mapKeysToFruitTrio = (focusPosition) => randomizeValuesAndKeepDotDelete().map(key => {
    let fruitOrder = null;
    if (key.buttonValue !== "DELETE" && key.buttonValue !== ".") {
        fruitOrder = fruitTrio(focusPosition, key);
    }
    return {
        fruitOrder,
        buttonValue: key.buttonValue,
        color: key.color
    }
});

const matchNumberToFruit = (buttonValue) => keys.filter(ky => ky.buttonValue == buttonValue && ky.fruit)[0].fruit;

export {
    keys,
    fruitTrio,
    mapKeysToFruitTrio,
    FOCUS_POSITION,
    matchNumberToFruit
}