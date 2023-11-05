import { Arsenal } from "./sort";

interface Props {
    weight: number;
    arsenal: Arsenal[];
    optimization: "survival" | "combat" | "both";
}

function findCombinations(arsenal: Arsenal[], weightLimit: number, memo: Map<number, Arsenal[][]>): Arsenal[][] {
    if (memo.has(weightLimit)) {
        return memo.get(weightLimit)!;
    }

    function backtrack(start: number, currentCombination: Arsenal[], remainingWeight: number): void {
        if (remainingWeight === 0) {
            combinations.push([...currentCombination]);
            return;
        }
        if (remainingWeight < 0 || start >= arsenal.length) {
            return;
        }

        for (let i = start; i < arsenal.length; i++) {
            const item = arsenal[i];
            currentCombination.push(item);
            backtrack(i + 1, currentCombination, remainingWeight - item.Weight);
            currentCombination.pop();
        }
    }

    const combinations: Arsenal[][] = [];
    const currentCombination: Arsenal[] = [];
    backtrack(0, currentCombination, weightLimit);

    memo.set(weightLimit, combinations);
    return combinations;
}

// export function knapsack(props: Props): Arsenal[] {
//     const memo = new Map<number, Arsenal[][]>();
//     const combinations = findCombinations(props.arsenal, props.weight, memo);
//     let bestCombination: Arsenal[] = [];
//     let bestScore = 0;

//     for (const combination of combinations) {
//         let survivalScore = 0;
//         let combatScore = 0;
//         for (const item of combination) {
//             survivalScore += item.SurvivalUsefulness;
//             combatScore += item.CombatUsefulness;
//         }

//         if (
//             (props.optimization === "survival" && survivalScore > bestScore) ||
//             (props.optimization === "combat" && combatScore > bestScore) ||
//             (props.optimization === "both" && survivalScore + combatScore > bestScore)
//         ) {
//             bestScore = survivalScore + combatScore;
//             bestCombination = combination;
//         }
//     }

//     return bestCombination;
// }


export function knapsack(props: Props): Arsenal[] {
    const { weight, arsenal, optimization } = props;
    const n = arsenal.length;

    // Initialize a 2D array to store the results of subproblems
    const dp: number[][] = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(weight + 1).fill(0);
    }

    // Initialize a 2D array to keep track of selected items
    const selected: boolean[][] = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        selected[i] = new Array(weight + 1).fill(false);
    }

    for (let i = 1; i <= n; i++) {
        const item = arsenal[i - 1];

        for (let w = 1; w <= weight; w++) {
            if (item.Weight <= w) {
                const survivalScore = dp[i - 1][w - Math.ceil(item.Weight)] + item.SurvivalUsefulness;
                const combatScore = dp[i - 1][w - Math.ceil(item.Weight)] + item.CombatUsefulness;

                if (optimization === "survival") {
                    if (survivalScore >= dp[i - 1][w]) {
                        dp[i][w] = survivalScore;
                        selected[i][w] = true;
                    } else {
                        dp[i][w] = dp[i - 1][w];
                        selected[i][w] = false;
                    }
                } else if (optimization === "combat") {
                    if (combatScore >= dp[i - 1][w]) {
                        dp[i][w] = combatScore;
                        selected[i][w] = true;
                    } else {
                        dp[i][w] = dp[i - 1][w];
                        selected[i][w] = false;
                    }
                } else {
                    const combinedScore = survivalScore + combatScore;
                    if (combinedScore >= dp[i - 1][w]) {
                        dp[i][w] = combinedScore;
                        selected[i][w] = true;
                    } else {
                        dp[i][w] = dp[i - 1][w];
                        selected[i][w] = false;
                    }
                }
            } else {
                dp[i][w] = dp[i - 1][w];
                selected[i][w] = false;
            }
        }
    }

    // Trace back to find selected items
    const selectedItems: Arsenal[] = [];
    let i = n;
    let w = weight;

    while (i > 0 && w > 0) {
        if (selected[i][w]) {
            selectedItems.push(arsenal[i - 1]);
            w -= Math.ceil(arsenal[i - 1].Weight);
        }
        i--;
    }

    return selectedItems;
}


// Example usage:
export const testArsenal: Props = {
    weight: 10, // The maximum weight limit
    arsenal: [
        {
            ObjectName: "Hatchet",
            Weight: 2,
            SurvivalUsefulness: 4,
            CombatUsefulness: 5,
        },
        {
            ObjectName: "Bow and Arrows",
            Weight: 3,
            SurvivalUsefulness: 4,
            CombatUsefulness: 6,
        },
        {
            ObjectName: "Sword",
            Weight: 2,
            SurvivalUsefulness: 5,
            CombatUsefulness: 8,
        },
        {
            ObjectName: "Knife",
            Weight: 0.5,
            SurvivalUsefulness: 3,
            CombatUsefulness: 2,
        },
        {
            ObjectName: "Net",
            Weight: 2,
            SurvivalUsefulness: 4,
            CombatUsefulness: 2,
        },
        {
            ObjectName: "Rope",
            Weight: 4,
            SurvivalUsefulness: 6,
            CombatUsefulness: 2,
        },
        {
            ObjectName: "Chain",
            Weight: 9,
            SurvivalUsefulness: 5,
            CombatUsefulness: 3,
        },
        {
            ObjectName: "Polearm",
            Weight: 6,
            SurvivalUsefulness: 6,
            CombatUsefulness: 9,
        },
        {
            ObjectName: "Jacket",
            Weight: 3,
            SurvivalUsefulness: 7,
            CombatUsefulness: 2,
        },
        {
            ObjectName: "Armor",
            Weight: 5,
            SurvivalUsefulness: 4,
            CombatUsefulness: 5,
        },
        {
            ObjectName: "Sleeping Bag",
            Weight: 1.5,
            SurvivalUsefulness: 9,
            CombatUsefulness: 0,
        },
        {
            ObjectName: "Hammer",
            Weight: 2,
            SurvivalUsefulness: 3,
            CombatUsefulness: 3,
        },
        {
            ObjectName: "Compass",
            Weight: 0.5,
            SurvivalUsefulness: 6,
            CombatUsefulness: 0,
        },
        {
            ObjectName: "First aid kit",
            Weight: 1,
            SurvivalUsefulness: 8,
            CombatUsefulness: 0,
        },
        {
            ObjectName: "Multi-tool",
            Weight: 1,
            SurvivalUsefulness: 5,
            CombatUsefulness: 1,
        },
        {
            ObjectName: "Matches",
            Weight: 0.5,
            SurvivalUsefulness: 3,
            CombatUsefulness: 1,
        },
        {
            ObjectName: "2x4",
            Weight: 1,
            SurvivalUsefulness: 1,
            CombatUsefulness: 1,
        },
        {
            ObjectName: "Tarp",
            Weight: 2,
            SurvivalUsefulness: 6,
            CombatUsefulness: 1,
        },
        {
            ObjectName: "Water Bottle",
            Weight: 1,
            SurvivalUsefulness: 7,
            CombatUsefulness: 1,
        },
        {
            ObjectName: "Alcohol",
            Weight: 0.5,
            SurvivalUsefulness: 2,
            CombatUsefulness: 1,
        },
        {
            ObjectName: "Mosquito Repellant",
            Weight: 0.5,
            SurvivalUsefulness: 3,
            CombatUsefulness: 1,
        },
        {
            ObjectName: "Tent",
            Weight: 4,
            SurvivalUsefulness: 6,
            CombatUsefulness: 0,
        }
    ],
    optimization: "combat", // You can choose "survival", "combat", or "both"
};

