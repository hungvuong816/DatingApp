import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    KnownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: any; // 180 changed to any
    photoUrl: string;
    city: string;
    country: string;
    interests?: string; // optional
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}
