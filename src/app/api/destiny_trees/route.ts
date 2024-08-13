import { DestinyTree } from "@/types/destiny_trees"

const destiny_trees: Array<DestinyTree> = [
    {
        name: "Draconic Incarnation",
        alias: "draconic_incarnation",
        core: true,
        upcoming: false,
    },
    {
        name: "Fatesinger",
        alias: "fatesinger",
        core: true,
        upcoming: false,
    },
    {
        name: "Magus of the Eclipse",
        alias: "magus_of_the_eclipse",
        core: true,
        upcoming: false,
    },
    {
        name: "Machro-technic",
        alias: "machrotechnic",
        core: false,
        upcoming: false,
        isBought: false,
    },
    {
        name: "Divine Crusader",
        alias: "divine_crusader",
        core: true,
        upcoming: false,
    },
    {
        name: "Exalted Angel",
        alias: "exalted_angel",
        core: true,
        upcoming: false,
    },
    {
        name: "Unyielding Sentinel",
        alias: "unyielding_sentinel",
        core: true,
        upcoming: false,
    },
    {
        name: "Grandmaster of Flowers",
        alias: "grandmaster_of_flowers",
        core: true,
        upcoming: false,
    },
    {
        name: "Legendary Dreadnought",
        alias: "legendary_dreadnought",
        core: true,
        upcoming: false,
    },
    {
        name: "Shadow-dancer",
        alias: "shadowdancer",
        core: true,
        upcoming: false,
    },
    {
        name: "Fury of the Wild",
        alias: "fury_of_the_wild",
        core: true,
        upcoming: false,
    },
    {
        name: "Primal Avatar",
        alias: "primal_avatar",
        core: true,
        upcoming: false,
    },
    {
        name: "Shiradi Champion",
        alias: "shiradi_champion",
        core: true,
        upcoming: false,
    },
]

export function GET() {
    return Response.json(destiny_trees, { status: 200 });
}