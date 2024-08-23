import {ChangeEvent, useState} from "react";
import {Checkbox, Label, Radio, TextInput, Tooltip} from "flowbite-react";
import {HiExclamationCircle} from "react-icons/hi";

export default function Options() {
    let minRacialPoints = 0;
    let maxRacialPoints = 14;

    const [randomizeEnhancementTrees, setRandomizeEnhancementTrees] = useState<boolean>(true);
    const [capstoneTree, setCapstoneTree] = useState<string>("no_capstone");
    const [racialPoints, setRacialPoints] = useState<number>(minRacialPoints);

    const handleCapstoneChange = (e : ChangeEvent<HTMLInputElement>) => {
        setCapstoneTree(e.target.value)
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

    return (
        <div className="flex flex-col gap-2">
            <span className="text-cyan-500">Randomizer options</span>

            <div className="flex flex-col gap-3 p-3 rounded-lg text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-2">Enhancement Trees :</span>
                    <div className="flex flex-wrap flex-col grow gap-2">
                        <div className="flex flex-wrap justify-center">
                            <div className="flex items-center">
                                <Label htmlFor="randomize-enhancement-trees-checkbox" className="flex items-center gap-2">
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

                                    <Tooltip content="If there is no universal tree selected, this will be ignored.">
                                        <HiExclamationCircle size={20}/>
                                    </Tooltip>
                                </Label>
                            </div>

                            <Label htmlFor="racial_pts" className="flex flex-wrap items-center justify-center gap-2">
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
            </div>
        </div>
    );
}