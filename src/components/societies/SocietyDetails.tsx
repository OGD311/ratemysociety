import { SOCIETY } from "@/constants/interfaces";


export default function SocietyDetails( { society } : { society: SOCIETY }) {

    return (
        <>
        <h1>{society.name}</h1>
        <p>{society.description}</p>
        <p>{society.memberCount}</p>
        </>
    )
}