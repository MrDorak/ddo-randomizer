"use client"

import UpdateNotes from '@/components/randomizer/UpdateNotes'
import Options from '@/components/randomizer/Options'
import Classes from '@/components/randomizer/Classes'
import Races from '@/components/randomizer/Races'
import {useEffect, useState} from "react";
import type { Classes as ClassesType } from "@/types/classes"
import type { Races as RacesType } from "@/types/races"
import Loading from "@/app/(randomizer)/loading";

export default function Randomizer() {
    const [displayNames, setDisplayNames] = useState<boolean>(false)
    const [classes, setClasses] = useState<null|ClassesType>(null)
    const [races, setRaces] = useState<null|RacesType>(null)

    useEffect(() => {
        setDisplayNames(!localStorage.getItem("displayNames") || localStorage.getItem("displayNames") === "true")

        fetch(`/api/classes`, { cache: 'no-store' }).then(r => r.json()).then(r => setClasses(r))
        fetch(`/api/races`, { cache: 'no-store' }).then(r => r.json()).then(r => setRaces(r))
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
            </div>
        </div>
    );
}