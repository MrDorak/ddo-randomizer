import {ChangeEvent, Dispatch, Fragment, useMemo} from "react";
import {Checkbox, Label, Tooltip} from "flowbite-react";
import type {Class, Classes} from "@/types/classes";

export function Icons (
    { data, dataType, color, displayNames, setChange } : { data : Class[], dataType: string, color: string, displayNames: boolean, setChange: (e: ChangeEvent<HTMLInputElement>, k: number, data: Class[]) => void }) {
    return (
        <div className={`flex flex-col gap-2 p-2 grow ${color} ${dataType === 'free' ? 'rounded-l-lg' : dataType === 'archetype' ? 'rounded-r-lg' : ''}`}>
            <span className="text-center text-slate-900">{dataType.charAt(0).toUpperCase() + dataType.slice(1)}</span>
            <div className="flex flex-wrap justify-center gap-2">
                {data.map((type, k) => (
                    <Tooltip key={k} content={(
                        <div className="flex flex-col">
                            <span>Name: <span className="text-red-500">{type.name}</span></span>
                            <span>
                                Weight modifier : {type.weightedStats.map((stat, key) =>
                                <Fragment key={key}>
                                    {key > 0 && ', '}
                                    <span className="text-purple-400">{stat.name}</span>
                                </Fragment>
                            )}
                            </span>
                            <span>
                                Enhancement trees : {type.enhancementTrees.map((tree, key) =>
                                <Fragment key={key}>
                                    {key > 0 && ', '}
                                    <span className="text-green-400">{tree.name}</span>
                                </Fragment>
                            )}
                            </span>
                        </div>
                    )}>
                        <input className="hidden" checked={type.selected} type="checkbox"
                               id={`${dataType}_${type.alias}`} onChange={e => setChange(e, k, data)}
                        />
                        <label htmlFor={`${dataType}_${type.alias}`} className="flex flex-col items-center">
                            <img src={`/images/classes/${dataType}/${type.alias}_class_icon.png`} alt={type.name}
                                 title={type.name}/>
                            {displayNames ? <small>{type.name}</small> : null}
                        </label>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
}

export default function Classes({classes, editClasses, displayNames}: {
    classes: Classes,
    editClasses: Dispatch<Classes>,
    displayNames: boolean
}) {
    const hasAllFreeClassSelected = useMemo(() => {
        return classes ? Object.values(classes.free).filter((c: Class) => c.selected).length === classes.free.length : false;
    }, [classes]);

    const hasAllPremiumClassSelected = useMemo(() => {
        return classes ? Object.values(classes.premium).filter((c: Class) => c.selected).length === classes.premium.length : false;
    }, [classes]);

    const hasAllArchetypeClassSelected = useMemo(() => {
        return classes ? Object.values(classes.archetype).filter((c: Class) => c.selected).length === classes.archetype.length : false;
    }, [classes]);

    const toggle = (e: ChangeEvent<HTMLInputElement>, type?: string) => {
        let toggledClasses: [string, Class[]][] = Object.entries(classes)

        toggledClasses.forEach(([idx, val]) => {
            if (type && type !== idx) return;

            return val.forEach((c: Class) => c.selected = e.target.checked)
        })

        editClasses(Object.fromEntries(toggledClasses) as Classes)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>, k: number, data: Class[]) => {
        data[k].selected = e.target.checked

        editClasses({...classes, ...data});
    }

    return (
        <div className="flex flex-col justify-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white ">Class Selector</span>
            <div className="flex flex-wrap gap-3">
                <Checkbox id="all"
                          checked={hasAllFreeClassSelected && hasAllPremiumClassSelected && hasAllArchetypeClassSelected}
                          onChange={e => toggle(e)}/>
                <Label htmlFor="all">Select all</Label>

                <Checkbox id="free" checked={hasAllFreeClassSelected} onChange={e => toggle(e, 'free')}/>
                <Label htmlFor="free">Select all free classes</Label>

                <Checkbox id="premium" checked={hasAllPremiumClassSelected} onChange={e => toggle(e, 'premium')}/>
                <Label htmlFor="premium">Select all premium classes</Label>

                <Checkbox id="archetype" checked={hasAllArchetypeClassSelected} onChange={e => toggle(e, 'archetype')}/>
                <Label htmlFor="archetype">Select all archetype classes</Label>
            </div>

            <div className="flex">
                { classes.free.length ? <Icons data={classes.free} dataType="free" displayNames={displayNames} setChange={handleChange} color="bg-blue-500"></Icons> : null }
                { classes.premium.length ? <Icons data={classes.premium} dataType="premium" displayNames={displayNames} setChange={handleChange} color="bg-red-700"></Icons> : null }
                { classes.archetype.length ? <Icons data={classes.archetype} dataType="archetype" displayNames={displayNames} setChange={handleChange} color="bg-yellow-500"></Icons> : null }
            </div>
        </div>
    );
}