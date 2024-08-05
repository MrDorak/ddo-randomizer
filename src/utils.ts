
export default function isSelected<T extends {selected: boolean}>(data: T[]): boolean {
    const copiedVal : Array<T> = JSON.parse(JSON.stringify(data))

    return data ? copiedVal.filter((c: T) => c.selected).length === data.length : false
}