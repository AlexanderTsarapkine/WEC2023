import React, { useEffect } from 'react';
import { Arsenal, Combination } from './interfaces/types';
import { useState } from 'react';
import { knapsack } from './interfaces/knapsack';


interface Props {
    weight: number;
    arsenal: Arsenal[];
    combinations: Combination[];
    optimization: "survival" | "combat" | "both";
}

interface Bonus {
    survival: number;
    combat: number;
}

function calculateSM(array: number[]): number {
    function findSM(a: number, b: number): number {
        return (a * b) / findGCD(a, b);
    }

    function findGCD(a: number, b: number): number {
        if (b === 0) {
            return a;
        }
        return findGCD(b, a % b);
    }

    return array.reduce((sm, weight) => findSM(sm, weight), array[0]);
}



function CalcBonus(array: Arsenal[], combs: Combination[]): Bonus {
    let survival = 0;
    let combat = 0;

    for (const item of combs) {
        const arsenalOneExists = array.some(arsenal => arsenal.ObjectName === item.ObjectOneName);

        const arsenalTwoExists = array.some(arsenal => arsenal.ObjectName === item.ObjectTwoName);

        if (arsenalOneExists && arsenalTwoExists) {
            survival += item.SurvivalBonus;
            combat += item.CombatBonus;
        }
    }

    return { survival, combat };
}

const Stage2: React.FC<Props> = (props) => {
    const [mySack, setMySack] = useState<Arsenal[]>(knapsack({ weight: props.weight, arsenal: props.arsenal, optimization: props.optimization }));
    const [bonuses, setBonuses] = useState({ survival: 0, combat: 0 });

    useEffect(() => {
        let startTime = Date.now();
        const sm = calculateSM(props.arsenal.map((item) => item.Weight));
        const weight = props.weight * sm;
        // make a new list of items with the weight multiplied by the SM
        const weightedArsenal = props.arsenal.map((item) => {
            return {
                ...item,
                Weight: item.Weight * sm
            };
        });

        const newSack = knapsack({ weight, arsenal: weightedArsenal, optimization: props.optimization });
        // divide the weight of the items in the sack by the SM
        newSack.forEach((item) => {
            item.Weight = item.Weight / sm;
        });


        const weightedArsenl = props.arsenal.map((item) => {
            return {
                ...item,
                // Also add the score of the cominations to the arsenal
                SurvivalUsefulness: item.SurvivalUsefulness + item.CombatUsefulness + props.combinations.filter((combination) => combination.ObjectOneName === item.ObjectName || combination.ObjectTwoName === item.ObjectName).reduce((total, combination) => total + combination.SurvivalBonus, 0),
                CombatUsefulness: 0,
            };
        });

        const newSack2 = knapsack({ weight, arsenal: weightedArsenl, optimization: props.optimization });

        // Compare the two sacks and choose the one with the highest score
        if (newSack2.reduce((total, item) => total + item.SurvivalUsefulness, 0) > newSack.reduce((total, item) => total + item.SurvivalUsefulness, 0)) {
            setMySack(newSack2);
        } else {
            setMySack(newSack);
        }

        setMySack(newSack);

        console.log("Stage 2 took " + (Date.now() - startTime) + "ms");
    }, [props.weight, props.arsenal, props.optimization]);

    useEffect(() => {
        setBonuses(CalcBonus(mySack, props.combinations));
    }, [mySack]);


    return (
        <div>
            <br />
            Gear chosen: <br />{mySack.map((item) => item.ObjectName).join(", ")} <br /> <br />
            Gear not chosen: <br />{props.arsenal.filter((item) => !mySack.includes(item)).map((item) => item.ObjectName).join(", ")}<br /> <br />
            Total weight of gear chosen: {mySack.reduce((total, item) => total + item.Weight, 0)}<br /> <br />
            Total Survival Usefulness: {mySack.reduce((total, item) => total + item.SurvivalUsefulness, 0) + bonuses.survival}<br /> <br />
            Total Combat Usefulness: {mySack.reduce((total, item) => total + item.CombatUsefulness, 0) + bonuses.combat}
        </div>
    );
};

export default Stage2;
