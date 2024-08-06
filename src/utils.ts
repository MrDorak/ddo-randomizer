
export default function isSelected<T extends {selected: boolean}>(data: T[]): boolean {
    const copiedData : Array<T> = JSON.parse(JSON.stringify(data))

    return copiedData.filter((c: T) => c.selected).length === data.length
}

/*
    const toggle = <T extends {selected: boolean}, >(e: ChangeEvent<HTMLInputElement>, type?: string, k?: number) => {
        let toggledClasses: [string, Array<T>][] = JSON.parse(JSON.stringify(Object.entries(races)))

        toggledClasses.forEach(( [idx, val] : [idx: string, val: Array<T>] ) : void => {
            if (type && type !== idx) return;

            return val.forEach((c: T, raceIdx: number) => {
                if (k !== undefined && k !== raceIdx) return;

                c.selected = e.target.checked
            })
        })

        editRaces(Object.fromEntries(toggledClasses) as Races)
    }
* */