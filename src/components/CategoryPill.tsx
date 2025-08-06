import { getHexComplement, getHexLighter } from "@/utils/Colour"

export default function CategoryPill({ category } : { category: {name: string | null, colour: string | null} }) {
    
    const mainColour = category.colour ?? "#bbb"
    const complementColour = getHexLighter(mainColour);

    return (
        <span
            className="border-2 w-fit p-1 rounded-2xl not-italic border-transparent"
            style={{
                backgroundColor: mainColour,
                color: complementColour,
            }}
        >
            {category.name === null ? 'Uncategorised' : category.name}
        </span>
    )
}