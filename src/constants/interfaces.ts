export interface UNIVERSITY {
    id: number,
    name: string,
    description?: string | null,
    rating: number,
    societyCount: number,
    website?: string | null,
    studentsUnion?: string | null,
    updated_at?: Date
}

export interface SOCIETY {
    id: number,
    name: string,
    description?: string | null,
    rating: number,
    memberCount: number,
    website?: string | null,
    updated_at: Date,

    category?: {
        name?: string | null,
        colour?: string | null
    } | null

    _count?: {
        reviews: number
    }
}

export interface REVIEW {
    id?: number,
    rating: number,
    comment: string,
    posted_at: Date,
    updated_at?: Date
}

export interface USER {
    id?: number,
    ip: string,
    fingerprint: string,
    is_banned: boolean
}

export interface SEARCH_RESULT {
    name: string;
}
