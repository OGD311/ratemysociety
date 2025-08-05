export interface UNIVERSITY {
    id: number,
    name: string,
    description?: string | null,
    rating: number,
    societyCount: number,
    website?: string | null,
    studentsUnion?: string | null,
    updated_at: Date
}

export interface SOCIETY {
    id: number,
    name: string,
    description?: string | null,
    rating: number,
    memberCount: number,
    website?: string | null,
    updated_at: Date,

    _count: {
        reviews: number
    }
}

export interface REVIEW {
    id?: number,
    rating: number,
    comment?: string | null
    posted_at: Date
}

export interface SEARCH_RESULT {
    name: string;
}
