import type { Alignment } from "@/types/alignments"

const alignments_list: Array<Alignment> = [
    {
        alias: "lawful_good",
        name: "Lawful Good",
        category: "lawful",
        selected: true,
    },
    {
        alias: "lawful_neutral",
        name: "Lawful Neutral",
        category: "lawful",
        selected: true,
    },
    {
        alias: "neutral_good",
        name: "Neutral Good",
        category: "neutral",
        selected: true,
    },
    {
        alias: "true_neutral",
        name: "True Neutral",
        category: "neutral",
        selected: true,
    },
    {
        alias: "chaotic_good",
        name: "Chaotic Good",
        category: "chaotic",
        selected: true,
    },
    {
        alias: "chaotic_neutral",
        name: "Chaotic Neutral",
        category: "chaotic",
        selected: true,
    },
]

export async function GET() {
    return Response.json(alignments_list, { status: 200 });
}