export type Stat = {
    name: string
    value: number
}

export type Race = {
    alias: string;
    name: string;
    selected: boolean | string;
    statsMod?: { increasedStats: Array<Stat>, loweredStats?: Array<Stat> };
    forcedClass?: string
    forcedClassName?: string
    isIconic: boolean
}

export type Races = {
    free: Race[],
    premium: Race[],
    iconic: Race[]
}