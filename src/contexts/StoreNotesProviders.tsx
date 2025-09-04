'use client';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as T from '../Types/contextTypes';
import Api from '@/components/Services/api';
import { toast } from 'react-toastify';

export const StoreNotesContext = createContext<T.InitialValue>(
    {} as T.InitialValue
);

export const StoreNotesProvider = ({ children }: T.UserContextProps) => {
    const [Loading, SetLoading] = useState<boolean>(false);
    const [user, setUser] = useState<T.UserProps | null>(null);
    const [Loged, SetLoged] = useState<boolean>(false);
    const [Status, SetStatus] = useState<number | null>(null);
    const [Mensage, SetMensage] = useState<string | null>(null);
    const [Trigger, SetTrigger] = useState<boolean>(false);
    const [DataTasks, SetDataTasks] = useState<T.DataTask[]>([]);
    const router = useRouter();
    let userId: string | null;
    const HandleSetStorage = async (item: string) => {
        if (!!item || item.trim() !== '') {
            window.localStorage.setItem('User', JSON.stringify(item));
        }
    };
    useEffect(() => {
        function LoadStorage() {
            const storageUser = window.localStorage.getItem('User');
            if (storageUser !== null && storageUser !== undefined) {
                const dataParse = JSON.parse(storageUser);
                console.log(dataParse.userName);
                setUser(dataParse);
                console.log('user :' + dataParse);
                SetLoged(true);
            }
        };
        LoadStorage();
    }, [Loged]);

    async function Login(email: string, password: string) {
        let NewData = {
            email: email,
            password: password
        };

        try {
            SetLoading(true);
            await Api.post('/login', NewData).then(res => {
                console.log('teste');
                HandleSetStorage(res.data.login);
                SetStatus(Number(res.status));
                SetMensage(res.data.msg);
                SetLoged(true);
                console.log('status:' + Number(res.status));
            });
        } catch (error: any) {
            console.log('login error: ' + error + 'msg :' + user?.msg);
            SetMensage(error.toString());
        } finally {
            await setTimeout(function () {
                SetLoading(false);
            }, 4500);
            router.push('/notes', { scroll: false })!;
            window.location.reload();
        }
    }
    if (Status === 200 || !!user?.id) {
        router.push('/notes', { scroll: false });
    }

    const Logout = async () => {
        try {
            SetLoged(true);
            window.localStorage.removeItem('User');
            router.push('/')!;
        } catch (err) {
        } finally {
            setUser(null);
            SetLoged(false);
            SetMensage(null);
        }
    };

    const CreateUser = async (
        userName: string,
        email: string,
        password: string,
        image?: File | null,
    ) => {
        if (userName && email && password) {
            let data = {
                userName: userName,
                email: email,
                password: password,
                image:image
            };
            try {
                SetLoading(true);
                await Api.post('/createUSer', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    SetStatus(res.data.status);
                    SetMensage(res.data.msg);
                });
            } catch (err) {
                console.log('createUser error :' + err + '\n msg:' + Mensage);
                console.log(Status);
                SetMensage(Mensage);
            } finally {
                SetStatus(null);
                SetMensage('');
                setTimeout(function () {
                    SetLoading(false);
                }, 4000);

                Login(email, password)!;
            }
        }
    };

    const CreateTask = async (
        titulo: string,
        task: string,
        userId: string
    ): Promise<void> => {
        SetLoading(true);
        let taskData: T.TaskProps = {
            titulo: titulo,
            task: task,
            
            userId: userId
        };

        if (!!taskData) {
            try {
                await Api.post('/createTask', taskData).then(res => {
                    SetStatus(Number(res.data.status));
                    SetMensage(res.data.msg);
                });
                toast.success(`Tarefa Criada com Sucesso!`);
            } catch (err) {
                SetLoading(false);
                console.log(err);
                toast.error(`Erro ao criar a tarefa`);
            } finally {
                setTimeout(function () {
                    SetLoading(false);
                }, 4000);
            }
        }
    };

    return (
        <StoreNotesContext.Provider
            value={{
                Loading,
                Login,
                Loged,
                Mensage,
                Status,
                CreateUser,
                user,
                Logout,
                SetLoged,
                SetLoading,
                Trigger,
                SetTrigger,
                CreateTask,
                DataTasks
            }}
        >
            {children}
        </StoreNotesContext.Provider>
    );
};

export default StoreNotesProvider;
