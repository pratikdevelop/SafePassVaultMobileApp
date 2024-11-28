interface Organization {
    _id: string;
    name: string;
    owner: string;
    members: string[];
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
}

interface Token {
    token: string;
    _id: string;
}

export interface User {
    userImage?: string;
    billingAddress?: any;
    _id?: string;
    name?: string;
    email?: string;
    phone?: number;
    password?: string; // Consider using a more secure way to handle passwords
    emailConfirmed?: boolean;
    mfaEnabled?: boolean;
    mfaMethod?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    organization?: Organization[];
    invitation?: string[];
    country?: string;
    favorites?: string[];
    tokens?: Token[];
    createdAt?: string; // ISO date string
    updatedAt?: string; // ISO date string
    confirmationCode?: string | null;
    __v?: number;
    role?: string;
    totpSecret?: string;
    recoveryTokenExpiry?: string; // ISO date string
}