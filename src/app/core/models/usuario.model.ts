import { SenderoResumen } from "./sendero.model";

export interface UsuarioResponse {
    id: number;
    username: string;
    email: string;
    rol: 'ROLE_USER' | 'ROLE_ADMIN';
    createdAt: string;
    avatarUrl: string;
    favoritos: SenderoResumen[];
    visitados: SenderoResumen[];
}

export interface UsuarioRequest {
    email: string;
    avatarUrl: string;
}