import { SOCIETY } from "@/constants/interfaces";


export default function SocietyDetails( { society } : { society: SOCIETY }) {

    return (
        
        <div className="border-2 p-4 rounded-xl w-[50dvw] min-w-[50dvw] max-w-[50dvw] h-64 min-h-64 max-h-64">    
            <h1>{society.name}</h1>
            <p>{society.description}</p>
            <p>{society.memberCount}</p>
        </div>
    )
}