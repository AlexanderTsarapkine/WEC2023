import React, { useEffect } from 'react';
import { Arsenal } from './interfaces/types';
import { useState } from 'react';
import { knapsack } from './interfaces/knapsack';


interface Props {
    weight: number;
    arsenal: Arsenal[];
    optimization: "survival" | "combat" | "both";
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

const Stage2: React.FC<Props> = (props) => {
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


        setMySack(newSack);

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

export default Stage2;
