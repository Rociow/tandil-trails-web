
export interface UsuarioResponse {
    id: number;
    username: string;
    email: string;
    rol: 'ROLE_USER' | 'ROLE_ADMIN';
    createdAt: string;
    avatarUrl: string;
}

export interface UsuarioRequest {
    email: string;
    avatarUrl: string;
}