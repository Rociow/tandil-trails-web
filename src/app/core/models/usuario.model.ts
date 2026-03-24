export interface Usuario {
    id: number;
    username: string;
    email: string;
    rol: 'ROLE_USER' | 'ROLE_ADMIN';
    createdAt: string;
    avatarUrl: string;
}