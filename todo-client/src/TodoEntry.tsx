import React from "react";
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const TodoEntry = () => {
    return(
        <div className="flex items-center h-16 w-full bg-white border-b-2">
            <ChevronDownIcon className="fill-slate-400 h-6 w-6 ml-4"/>
            <input
                className="h-full w-full px-4"
                type="text"
                placeholder="What needs to be done?"
            />
        </div>
    )
}

export default TodoEntry;