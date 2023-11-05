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
    gear:{
        gearId: number;
        gearName: string;
        gearExceptions: string[];

    }
}

export type { Arsenal as Arsenal };
