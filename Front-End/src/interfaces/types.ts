interface Arsenal {
    ObjectName: string;
    Weight: number;
    SurvivalUsefulness: number;
    CombatUsefulness: number;
}

export interface Combination {
    ObjectOneName: string;
    ObjectTwoName: string;
    CombinationName: string;
    SurvivalBonus: number;
    CombatBonus: number;
}

export interface AntiCombination {
    ObjectName: string;
    Weight: number;
    SurvivalUsefulness: number;
    CombatUsefulness: number;

}

export type { Arsenal as Arsenal };
