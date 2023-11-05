import React, { useEffect } from 'react';
import { Arsenal } from './interfaces/sort';
import { useState } from 'react';
import { knapsack } from './interfaces/knapsack';


interface Props {
    weight: number;
    arsenal: Arsenal[];
    optimization: "survival" | "combat" | "both";
}

const Stage2: React.FC<Props> = (props) => {
    const [mySack, setMySack] = useState<Arsenal[]>(knapsack({ weight: props.weight, arsenal: props.arsenal, optimization: props.optimization }));

    useEffect(() => {
        setMySack(knapsack({ weight: props.weight, arsenal: props.arsenal, optimization: props.optimization }));
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
