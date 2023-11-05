import { Arsenal } from "./sort";

interface Props {
    weight: number;
    arsenal: Arsenal[];
    optimization: "survival" | "combat" | "both";
}

export function knapsack(props: Props): Arsenal[] {
    const { weight, arsenal, optimization } = props;
    const n = arsenal.length;
    const dp: number[][] = new Array(n + 1).fill([]).map(() => new Array(weight + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= weight; w++) {
            const item = arsenal[i - 1];
            const canTake = item.Weight <= w;
            switch (optimization) {
                case "survival":
                    dp[i][w] = canTake
                        ? Math.max(dp[i - 1][w], dp[i - 1][w - item.Weight] + item.SurvivalUsefulness)
                        : dp[i - 1][w];
                    break;
                case "combat":
                    dp[i][w] = canTake
                        ? Math.max(dp[i - 1][w], dp[i - 1][w - item.Weight] + item.CombatUsefulness)
                        : dp[i - 1][w];
                    break;
                case "both":
                    dp[i][w] = canTake
                        ? Math.max(
                            dp[i - 1][w],
                            Math.max(
                                dp[i - 1][w - item.Weight] + item.SurvivalUsefulness,
                                dp[i - 1][w - item.Weight] + item.CombatUsefulness
                            )
                        )
                        : dp[i - 1][w];
                    break;
            }
        }
    }

    const selectedItems: Arsenal[] = [];
    let i = n;
    let w = weight;
    while (i > 0 && w > 0) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(arsenal[i - 1]);
            w -= arsenal[i - 1].Weight;
        }
        i--;
    }

    return selectedItems;
}

// Example usage:
const props: Props = {
    weight: 10, // The maximum weight limit
    arsenal: [
        {
            ObjectName: "Item1",
            Weight: 2,
            SurvivalUsefulness: 4,
            CombatUsefulness: 5,
        },
        {
            ObjectName: "Item2",
            Weight: 3,
            SurvivalUsefulness: 2,
            CombatUsefulness: 6,
        },
        {
            ObjectName: "Item3",
            Weight: 5,
            SurvivalUsefulness: 8,
            CombatUsefulness: 4,
        },
    ],
    optimization: "both", // You can choose "survival", "combat", or "both"
};

