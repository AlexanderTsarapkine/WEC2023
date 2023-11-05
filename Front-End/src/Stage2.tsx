import React, { useEffect } from 'react';
import { Arsenal } from './interfaces/sort';
import { useState } from 'react';
import { knapsack } from './interfaces/knapsack';


interface Props {
    weight: number;
    arsenal: Arsenal[];
    optimization: "survival" | "combat" | "both";
}



function calulateLCD(arr: number[]) {
    function gcd(a: number, b: number) {
        if (!b) {
            return a;
        }
        return gcd(b, a % b);
    }
    let divisor = arr[0];
    for (let i = 1; i < arr.length; i++) {
        divisor = gcd(divisor, arr[i]);
    }
    return divisor;
}
const Stage2: React.FC<Props> = (props) => {
    const [mySack, setMySack] = useState<Arsenal[]>(knapsack({ weight: props.weight, arsenal: props.arsenal, optimization: props.optimization }));

    useEffect(() => {
        const lcd = calulateLCD(props.arsenal.map((item) => item.Weight));
        const newWeight = props.weight * lcd;
        const newArsenal = props.arsenal.map((item) => {
            return {
                ...item,
                Weight: item.Weight * lcd
            };
        });
        const newSack = knapsack({ weight: newWeight, arsenal: newArsenal, optimization: props.optimization });
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
