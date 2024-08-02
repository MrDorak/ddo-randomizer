import {UniversalTree} from "@/types/universal_trees";

const universal_trees: Array<UniversalTree> = [
    {
        name: "Falconry",
        alias: "falconry",
        selected: false,
    },
    {
        name: "Harper Agent",
        alias: "harper_agent",
        selected: false,
    },
    {
        name: "Inquisitive",
        alias: "inquisitive",
        selected: false,
    },
    {
        name: "Vistani Knife Fighter",
        alias: "vistani_knife_fighter",
        selected: false,
    },
    {
        name: "Feydark Illusionist",
        alias: "feydark_illusionist",
        selected: false,
    },
    {
        name: "Horizon Walker",
        alias: "horizon_walker",
        selected: false,
    },
]

export function GET(): Response {
    return Response.json(universal_trees, { status: 200 });
}