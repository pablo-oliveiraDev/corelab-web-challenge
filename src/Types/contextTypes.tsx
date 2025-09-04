import { Dispatch, ReactNode, SetStateAction } from 'react';

export type UserContextProps = {
    children: ReactNode;
};

export type InitialValue = {
    Loading: boolean;
    Login: (email: string, senha: string) => void;
    Loged: boolean;
    Mensage: string | null;

    CreateUser: (
        userName: string,
        email: string,
        password: string,
        image?: File | null
    ) => void;
    Status: number | null;
    user: UserProps | null;
    Logout: () => void;
    SetLoged: Dispatch<SetStateAction<boolean>>;
    SetLoading: Dispatch<SetStateAction<boolean>>;
    Trigger: boolean;
    SetTrigger: Dispatch<SetStateAction<boolean>>;
    CreateTask: (titulo: string, task: string, userId: string) => Promise<void>;
    DataTasks: DataTask[];
};
type UserImages = {
    id: string | null;
    image: string;
    userId: string | null;
};
export interface UserProps {
    id?: string;
    msg: string;
    userName: string;
    email: string;
    password: string;
    image?: File | null;
    createdAt?: string;
}
export interface TaskProps {
    id?: string;
    titulo: string;
    task: string;
    typeNotes?: string[] | null;
    userId?: string;
}
export interface DataTask {
    createdAt?: string;
    id: string;
    task: string;
    titulo: string;
    status: string;
    updatedAt?: string | null;
    userId: string;
}

export type collors = {
    setCollors: Dispatch<SetStateAction<number>>;
};
