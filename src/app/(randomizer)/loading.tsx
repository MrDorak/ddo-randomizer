import {Spinner} from "flowbite-react";

export default function Loading({ name } : { name ?: string }) {
    return (
        <div className="text-center m-3">
            Loading {name}<Spinner className="ml-2"></Spinner>
        </div>
    )
}