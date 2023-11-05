import { useState, useEffect } from "react";
import { Arsenal, AntiCombination } from "./interfaces/types";
import { knapsack } from "./interfaces/knapsack";

interface Props {
    weight: number;
    arsenal: Arsenal[];
    optimization: "survival" | "combat" | "both";
    anticombos: [[string, string]];
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

const MyComponent: React.FC<Props> = (props) => {
    const [mySack, setMySack] = useState<Arsenal[]>(knapsack({ weight: props.weight, arsenal: props.arsenal, optimization: props.optimization }));

    useEffect(() => {
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

        // Remove all the anti combos from the sack
        props.anticombos.forEach((combo) => {
            // Remove the anti combo with lowest usefulness 
            const antiCombo: AntiCombination = {
                ObjectName: combo[0],
                AntiObjectName: combo[1]
            };
            const antiCombo2: AntiCombination = {
                ObjectName: combo[1],
                AntiObjectName: combo[0]
            };

            const item1 = newSack.find((item) => item.ObjectName === antiCombo.ObjectName);
            const item2 = newSack.find((item) => item.ObjectName === antiCombo2.ObjectName);

            if (item1 && item2) {
                if (item1.SurvivalUsefulness + item1.CombatUsefulness > item2.SurvivalUsefulness + item2.CombatUsefulness) {
                    newSack.splice(newSack.indexOf(item2), 1);
                } else {
                    newSack.splice(newSack.indexOf(item1), 1);
                }
            }

            // sort the arnsenal by survival usefulness
            newSack.sort((a, b) => b.SurvivalUsefulness + b.CombatUsefulness - a.SurvivalUsefulness + a.CombatUsefulness);

            // iterate through the arsenal and add the next item if it doesn't create an anti combo and if it doesn't exceed the weight and if it isn't already in the sack
            const newSack2: Arsenal[] = [];
            let weight = props.weight;
            for (let i = 0; i < newSack.length; i++) {
                const item = newSack[i];
                if (item.Weight <= weight && !newSack2.includes(item)) {
                    newSack2.push(item);
                    weight -= item.Weight;
                }
            }

            // set the sack to the new sack
            setMySack(newSack2);
        });
    }, [props.weight, props.arsenal, props.optimization]);


    return (
        <div>
            Gear chosen: {mySack.map((item) => item.ObjectName).join(", ")} <br />
            Gear not chosen: {props.arsenal.filter((item) => !mySack.includes(item)).map((item) => item.ObjectName).join(", ")}<br />
            Total weight of gear chosen: {mySack.reduce((total, item) => total + item.Weight, 0)}<br />
            Total Survival Usefulness: {mySack.reduce((total, item) => total + item.SurvivalUsefulness, 0)}<br />
            Total Combat Usefulness: {mySack.reduce((total, item) => total + item.CombatUsefulness, 0)}
        </div>
    );
};

export default MyComponent;
