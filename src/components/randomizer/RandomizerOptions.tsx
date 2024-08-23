import {ChangeEvent, useMemo, useState} from "react";
import {Checkbox, Label, Radio, TextInput, Tooltip} from "flowbite-react";
import {HiExclamationCircle} from "react-icons/hi";

let minRacialPoints = 0;
let maxRacialPoints = 14;

let maxLevel = 34;
// 12 (from 12 trees) + 40 (4 * 10 epic lvls) + (4 * legendary lvls) + 14 (past lives + fate tomes)
let minDestinyPoints = 12 + 40 + ((maxLevel - 30) * 4);
let maxDestinyPoints = 12 + 40 + ((maxLevel - 30) * 4) + 14;

export default function Options({ destinyTreesSelectedLength = 0 } : { destinyTreesSelectedLength : number }) {
    const [randomizeEnhancementTrees, setRandomizeEnhancementTrees] = useState<boolean>(true);
    const [capstoneTree, setCapstoneTree] = useState<string>("no_capstone");
    const [racialPoints, setRacialPoints] = useState<number>(minRacialPoints);

    const [randomizeDestinyTrees, setRandomizeDestinyTrees] = useState<boolean>(true);
    const [destinyTier5, setDestinyTier5] = useState<string>("without_tier5");
    const [destinyPoints, setDestinyPoints] = useState<number>(minDestinyPoints);

    useMemo(() => {
        minDestinyPoints = 68 + destinyTreesSelectedLength
        maxDestinyPoints = 82 + destinyTreesSelectedLength

        if (destinyPoints < minDestinyPoints) {
            setDestinyPoints(minDestinyPoints)
        } else if(destinyPoints > maxDestinyPoints) {
            setDestinyPoints(maxDestinyPoints)
        }
    }, [destinyPoints, destinyTreesSelectedLength])

    const handleCapstoneChange = (e : ChangeEvent<HTMLInputElement>) => {
        setCapstoneTree(e.target.value)
    }

    const handleDestinyTier5Change = (e : ChangeEvent<HTMLInputElement>) => {
        setDestinyTier5(e.target.value)
    }

    const handleRacialPointsChange = (e : ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            e.target.value = '0'
        } else if (parseInt(e.target.value) < minRacialPoints) {
            e.target.value = minRacialPoints.toString();
        } else if (parseInt(e.target.value) > maxRacialPoints) {
            e.target.value = maxRacialPoints.toString();
        }

        setRacialPoints(parseInt(e.target.value))
    }

    const handleDestinyPointsChange = (e : ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            e.target.value = '0'
        } else if (parseInt(e.target.value) < minDestinyPoints) {
            e.target.value = minDestinyPoints.toString();
        } else if (parseInt(e.target.value) > maxDestinyPoints) {
            e.target.value = maxDestinyPoints.toString();
        }

        setDestinyPoints(parseInt(e.target.value))
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="text-cyan-500">Randomizer options</span>

            <div
                className="flex flex-col gap-3 p-3 rounded-lg text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white">
                <div className="flex flex-wrap items-center">
                    <span>Enhancement Trees :</span>
                    <div className="flex flex-wrap flex-col grow gap-2">
                        <div className="flex flex-wrap justify-center">
                            <div className="flex items-center">
                                <Label htmlFor="randomize-enhancement-trees-checkbox"
                                       className="flex items-center gap-2">
                                    <Checkbox
                                        className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-600 text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:border-gray-500"
                                        checked={randomizeEnhancementTrees}
                                        id="randomize-enhancement-trees-checkbox"
                                        onChange={() => setRandomizeEnhancementTrees(!randomizeEnhancementTrees)}
                                    />
                                    Randomize enhancement trees
                                </Label>
                            </div>
                        </div>

                        {randomizeEnhancementTrees ? (
                            <div className="flex flex-wrap flex-col grow gap-2">
                                <div className="flex flex-wrap justify-center gap-3">
                                    <Label htmlFor="no_capstone" className="flex items-center gap-2">
                                        <Radio id="no_capstone"
                                               value="no_capstone"
                                               checked={capstoneTree === 'no_capstone'}
                                               onChange={handleCapstoneChange}
                                               name="capstone"
                                               className="h-4 w-4 border border-gray-300 text-orange-500 dark:ring-offset-gray-700 focus:ring-2 focus:ring-orange-500 dark:border-gray-500 dark:bg-gray-700 dark:focus:bg-orange-500 dark:focus:ring-orange-500 "
                                        />
                                        No forced capstone
                                    </Label>
                                    <Label htmlFor="class_capstone" className="flex items-center gap-2">
                                        <Radio id="class_capstone"
                                               value="class_capstone"
                                               checked={capstoneTree === 'class_capstone'}
                                               onChange={handleCapstoneChange}
                                               name="capstone"
                                               className="h-4 w-4 border border-gray-300 text-orange-500 dark:ring-offset-gray-700 focus:ring-2 focus:ring-orange-500 dark:border-gray-500 dark:bg-gray-700 dark:focus:bg-orange-500 dark:focus:ring-orange-500 "
                                        />
                                        Class capstone

                                        <Tooltip content="Choosing this option will prevent multiclassing.">
                                            <HiExclamationCircle size={20}/>
                                        </Tooltip>
                                    </Label>
                                    <Label htmlFor="universal_capstone" className="flex items-center gap-2">
                                        <Radio id="universal_capstone"
                                               value="universal_capstone"
                                               checked={capstoneTree === 'universal_capstone'}
                                               onChange={handleCapstoneChange}
                                               name="capstone"
                                               className="h-4 w-4 border border-gray-300 text-orange-500 dark:ring-offset-gray-700 focus:ring-2 focus:ring-orange-500 dark:border-gray-500 dark:bg-gray-700 dark:focus:bg-orange-500 dark:focus:ring-orange-500 "
                                        />
                                        Universal capstone

                                        <Tooltip
                                            content="If there is no universal tree selected, this will be ignored.">
                                            <HiExclamationCircle size={20}/>
                                        </Tooltip>
                                    </Label>
                                </div>

                                <Label htmlFor="racial_pts"
                                       className="flex flex-wrap items-center justify-center gap-2">
                                    Racial Points (max {maxRacialPoints})
                                    <TextInput
                                        id="racial_pts"
                                        placeholder={minRacialPoints.toString()}
                                        type="number"
                                        min={minRacialPoints}
                                        max={maxRacialPoints}
                                        value={racialPoints}
                                        onChange={handleRacialPointsChange}
                                    />
                                </Label>
                            </div>
                        ) : null}
                    </div>
                </div>

                <hr/>

                <div className="flex flex-wrap items-center">
                    <span>Destiny Trees :</span>
                    <div className="flex flex-wrap flex-col grow gap-2">
                        <div className="flex flex-wrap justify-center">
                            <div className="flex items-center">
                                <Label htmlFor="randomize-enhancement-trees-checkbox"
                                       className="flex items-center gap-2">
                                    <Checkbox
                                        className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-600 text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:border-gray-500"
                                        checked={randomizeDestinyTrees}
                                        id="randomize-enhancement-trees-checkbox"
                                        onChange={() => setRandomizeDestinyTrees(!randomizeDestinyTrees)}
                                    />
                                    Randomize destiny trees
                                </Label>
                            </div>
                        </div>

                        {randomizeDestinyTrees ? (
                            <div className="flex flex-wrap flex-col grow gap-2">
                                <div className="flex flex-wrap justify-center gap-3">
                                    <Label htmlFor="without_tier5" className="flex items-center gap-2">
                                        <Radio id="without_tier5"
                                               value="without_tier5"
                                               checked={destinyTier5 === 'without_tier5'}
                                               onChange={handleDestinyTier5Change}
                                               name="destiny_tier5"
                                               className="h-4 w-4 border border-gray-300 text-orange-500 dark:ring-offset-gray-700 focus:ring-2 focus:ring-orange-500 dark:border-gray-500 dark:bg-gray-700 dark:focus:bg-orange-500 dark:focus:ring-orange-500 "
                                        />
                                        No forced tier 5
                                    </Label>
                                    <Label htmlFor="with_tier5" className="flex items-center gap-2">
                                        <Radio id="with_tier5"
                                               value="with_tier5"
                                               checked={destinyTier5 === 'with_tier5'}
                                               onChange={handleDestinyTier5Change}
                                               name="destiny_tier5"
                                               className="h-4 w-4 border border-gray-300 text-orange-500 dark:ring-offset-gray-700 focus:ring-2 focus:ring-orange-500 dark:border-gray-500 dark:bg-gray-700 dark:focus:bg-orange-500 dark:focus:ring-orange-500 "
                                        />
                                        Force a tier 5
                                    </Label>
                                </div>


                                <Label htmlFor="racial_pts" className="flex flex-wrap items-center justify-center gap-2">
                                    Destiny Points (max {maxDestinyPoints})
                                    <TextInput
                                        id="racial_pts"
                                        placeholder={minDestinyPoints.toString()}
                                        type="number"
                                        min={minDestinyPoints}
                                        max={maxDestinyPoints}
                                        value={destinyPoints}
                                        onChange={handleDestinyPointsChange}
                                    />
                                </Label>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}