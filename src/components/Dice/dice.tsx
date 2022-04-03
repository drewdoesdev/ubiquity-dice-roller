import cn from "classnames"
import { getDiceFace } from "../../utils/getDiceFace";
import { IDiceProps, DiceTypes } from "./dice-types";
import styles from './dice.module.scss';

export const Dice = ({
    diceType, 
    staticVal, 
    diceRoll, 
    hasRolled = false,
    onClick = () => null
}: IDiceProps) => {
    const wrapperClasses = cn(
        styles.dice,
        staticVal && styles.static,
        hasRolled && styles.rolled
    )

    //Set Faces
    let faces: string[] = getDiceFace(diceType);

    const renderRoll = () => {
        if(staticVal){
            return staticVal
        } 
        
        else if (diceRoll !== undefined){
            return faces[diceRoll];
        }

        return ""
    }


    return (
        <div className={wrapperClasses} onClick={() => onClick()} data-dice-type={diceType}>
            <span className={styles.number}>{renderRoll()}</span>
        </div>
    );
};