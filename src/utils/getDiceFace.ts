import { DiceTypes } from "../components/Dice";

export const getDiceFace = (diceType: DiceTypes) => {
    const {single, double, tripple} = require("../dice-faces.json");
    switch(diceType) {
        case DiceTypes.Single:
            return single;
        case DiceTypes.Double:
            return double;
        case DiceTypes.Tripple:
            return tripple;
        default:
            console.error("diceType not set on line 21");
    }
}