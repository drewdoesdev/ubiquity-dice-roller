import { useEffect, useState } from 'react';
import { Dice, DiceTypes, IDiceProps } from './components/Dice';
import { getDiceFace } from './utils/getDiceFace';
import Logo from "./assets/coinflip.svg";
import styles from './App.module.scss';

export const App = () => {
  const [diceArray, updateDiceArray] = useState<IDiceProps[]>([]);
  const [successTotal, setSuccessTotal] = useState<number>(0);
  const [hasRolled, setHasRolled] = useState<boolean>(false)

  useEffect(() => {
    if(hasRolled){
      console.log("Dice Array", diceArray,)
      diceArray.forEach(dice => {
        const {diceRoll, diceType} = dice;
        const faces = getDiceFace(diceType);
        if(diceRoll) {
          console.log("Roll", faces[diceRoll]);
          const total = parseInt(faces[diceRoll]);
          console.log("total", total);
          setSuccessTotal((prevState) => prevState + total);
        }
      })
    }
  }, [hasRolled])

  const addDice = async (diceType: DiceTypes) => {
    const dice: IDiceProps = {
      diceType
    };

    if(hasRolled){
      updateDiceArray([dice]);
      setSuccessTotal(0);
      setHasRolled(false);
    } else {
      updateDiceArray([...diceArray, dice]);
    }
  }

  const rollDice = () => {
    const arrayCopy = diceArray;
    arrayCopy.forEach(dice => {
      dice.diceRoll = Math.floor(Math.random() * 8)
    });
    updateDiceArray(arrayCopy);
    setHasRolled(true);
  }

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={Logo} width={125} />
        </div>
        <h1 className={styles.title}>Ubiquity Dice Roller</h1>
        <p className={styles.instructions}><span className={styles.blue}>Blue dice</span> are a 50/50 roll.  <span className={styles.green}>Green dice</span> are the equivalent of 2 Blue dice, and <span className={styles.red}>Red dice</span> the equivalent of 3 Blue dice. <em>Click a dice to rolling!</em></p>
        <div className={styles.diceControls}>
          <Dice diceType={DiceTypes.Single} staticVal="x1" onClick={() => addDice(DiceTypes.Single)} hasRolled={hasRolled} />
          <Dice diceType={DiceTypes.Double} staticVal="x2" onClick={() => addDice(DiceTypes.Double)}  hasRolled={hasRolled} />
          <Dice diceType={DiceTypes.Tripple} staticVal="x3" onClick={() => addDice(DiceTypes.Tripple)}  hasRolled={hasRolled} />
        </div>
        {diceArray.length > 0 && <button className={styles.rollDiceButton} onClick={rollDice}>Roll Dice</button>}
        {hasRolled && <h2 className={styles.successes}>Successes: {successTotal}</h2>}
        <div className={styles.diceResults}>
          {diceArray.map(dice => {
            return <Dice {...dice} />
          })}
        </div>
        {hasRolled && <span className={styles.clearInstructions}>Reselect dice to start again</span>}
      </div>
    </div>
  );
}
