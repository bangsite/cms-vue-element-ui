type ID = string;

export interface Board {
    id: ID;
    title?: string;
    tasks?: Tasks[];
    deleted?: boolean;
}

export interface Tasks {
    id: ID;
    title?: string;
    description?: string;
    completed?: boolean;
    deleted?: boolean;
    createdAt?: Date;
}
