"use client"

import UpdateNotes from '@/components/randomizer/UpdateNotes'
import Options from '@/components/randomizer/Options'
import Classes from '@/components/randomizer/Classes'
import Races from '@/components/randomizer/Races'
import Alignments from '@/components/randomizer/Alignments'
import {useEffect, useState} from "react";
import type { Races as RacesType } from "@/types/races"
import type { Classes as ClassesType } from "@/types/classes"
import type { Alignment as AlignmentType } from "@/types/alignments"
import type { Stat as StatType } from "@/types/stats"
import Loading from "@/app/(randomizer)/loading";
import StartingStats from "@/components/randomizer/StartingStats";

export default function Randomizer() {
    const [displayNames, setDisplayNames] = useState<boolean>(false)
    const [races, setRaces] = useState<null|RacesType>(null)
    const [classes, setClasses] = useState<null|ClassesType>(null)
    const [alignments, setAlignments] = useState<null|Array<AlignmentType>>(null)
    const [stats, setStats] = useState<null|Array<StatType>>(null)

    useEffect(() => {
        setDisplayNames(!localStorage.getItem("displayNames") || localStorage.getItem("displayNames") === "true")

        fetch(`/api/races`, { cache: 'no-store' }).then(r => r.json()).then(r => setRaces(r))
        fetch(`/api/classes`, { cache: 'no-store' }).then(r => r.json()).then(r => setClasses(r))
        fetch(`/api/alignments`, { cache: 'no-store' }).then(r => r.json()).then(r => setAlignments(r))
        fetch(`/api/stats`, { cache: 'no-store' }).then(r => r.json()).then(r => setStats(r))
    }, []);

    return (
        <div className="md:container px-2 mx-auto">
            <h1 className="text-5xl font-bold text-center mb-3 break-words">
                DDO Class Randomizer
            </h1>

            <UpdateNotes/>

            <div className="flex flex-col gap-5">
                <Options displayNames={displayNames} editDisplay={setDisplayNames} />

                {races ? <Races races={races} editRaces={setRaces} displayNames={displayNames}/> : <Loading name="races" />}

                {classes ? <Classes classes={classes} editClasses={setClasses} displayNames={displayNames}/> : <Loading name="classes" />}

                {alignments ? <Alignments alignments={alignments} editAlignments={setAlignments} /> : <Loading name="alignments" />}

                {stats ? <StartingStats stats={stats} editStats={setStats} /> : <Loading name="stats" />}
            </div>
        </div>
    );
}