'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import TaskCards from '@/components/TaskCards/page';
import styles from '@/assets/styles/pages/home.module.sass';
import * as T from '../../Types/contextTypes';
import Star from '@/assets/images/svg/star.svg';
import Header from '@/components/Header/page';
import LoadingPage from '@/components/Loading/loading';
import Bucket from '@/assets/images/svg/bucket.svg';
import Image from 'next/image';
import Api from '@/components/Services/api';
import { Metadata } from 'next';
import { StoreNotesContext } from '@/contexts/StoreNotesProviders';
import { useRouter } from 'next/navigation';
import { stringify } from 'querystring';

export default function Notes() {
    const { Loged, user, Loading, CreateTask }: T.InitialValue =
        useContext(StoreNotesContext);
    const [titulo, setTitulo] = useState<string>('');
    const [task, setTask] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    const [DataTasks, SetDataTasks] = useState<T.TaskProps[]>([]);
    const [DataFavorites, SetDataFavorites] = useState<T.TaskProps[]>([]);
    const router = useRouter();
    useEffect(() => {
        setUserId(!!user?.id ? user.id : '');
    }, [Loged]);

    const AddNewTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (userId !== null || userId !== undefined) {
            CreateTask(titulo, task, userId);
        }
    };

    useEffect(() => {
        async function LoadTask() {
            if (!user?.id) return;
            await Api.get(`/findTasks/${user?.id}`).then(res => {
                console.log(res.data);
                const data = res.data;
                SetDataTasks(data);
            });
        }
        LoadTask();
    }, [Loged]);

    useEffect(() => {
        async function LoadFavorites() {
            if (!user?.id) return;
            await Api.get(`/findFavorites/${user?.id}`).then(res => {
                console.log(res.data);
                const data = res.data;
                if (!data) return;
                SetDataFavorites(data);
            });
        }
        LoadFavorites();
    }, [Loged]);
    console.log('dataTask:' + DataTasks);
    if (!Loged) {
        router.push('/')!;
    } else {
        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.containerAddTask}>
                    {Loading && <LoadingPage />}
                    <span className={styles.titulo}>
                        <input
                            id="title"
                            type="text"
                            placeholder="Titulo"
                            value={titulo}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setTitulo(e.target.value)}
                        />
                        <button className={styles.btn_favoritos} disabled>
                            <Image src={Star} alt="star" />
                        </button>
                    </span>
                    <span className={styles.tarefasDesc}>
                        <input
                            id="Task"
                            type="text"
                            placeholder="Criar tarefa..."
                            value={task}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setTask(e.target.value)}
                        />
                    </span>

                    <button className={styles.btnAddTask} onClick={AddNewTask}>
                        Adicionar
                    </button>
                </div>
                <div className={styles.favoritos}>
                    <span>Favoritas</span>
                    <div className={styles.displayFavoritos}>
                        {DataFavorites.length > 0 ? (
                            Object.values(DataFavorites).map(
                                (tasks, index) =>
                                    tasks !== null && (
                                        <TaskCards
                                            key={index}
                                            DataTasks={tasks}
                                            elementNumber={index}
                                            tasksId={tasks.id}
                                        />
                                    )
                            )
                        ) : (
                            <h1>Vc ainda nao tem tarefas</h1>
                        )}
                    </div>
                </div>
                <div className={styles.outras}>
                    <span>Outras</span>
                    <div className={styles.displayOutras}>
                        {DataTasks.length > 0 ? (
                            Object.values(DataTasks).map(
                                (tasks, index) =>
                                    tasks !== undefined && (
                                        <TaskCards
                                            key={index}
                                            DataTasks={tasks}
                                            elementNumber={index}
                                        />
                                    )
                            )
                        ) : (
                            <h1>Vc ainda nao tem tarefas</h1>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
