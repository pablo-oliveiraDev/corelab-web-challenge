import React, { Children, useCallback, useEffect, useState } from 'react';
import styles from '../../assets/styles/components/taskCards.module.sass';
import Image from 'next/image';
import Star from '@/assets/images/svg/star.svg';
import Pencil from '../../assets/images/svg/pencil.svg';
import Bucket from '@/assets/images/svg/bucket.svg';
import Api from '../Services/api';

import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

const TaskCards = ({ DataTasks, elementNumber, tasksId, children }: any) => {
    const [style, setStyle] = useState<string>('');
    const [titulo, setTitulo] = useState<string>(DataTasks.titulo);
    const [task, setTask] = useState<string>(DataTasks.task);
    const [taskId, setTaskId] = useState<string>(DataTasks.id);
    //const [categoria, setCategoria] = useState<string | null>(DataTasks.typeNotes.name);
    const [updateAt, setUpdateAt] = useState<string>(DataTasks.updatedAt);
    const [createdAt, setCreatedAt] = useState<string>(DataTasks.createdAt);
    const [edit, setEdit] = useState<boolean>(true);
    const [collors, setCollors] = useState<number>(0);
    const [mark, setMark] = useState<boolean>(false);
    let i: number = collors;

    let index: string[] = [
        'container',
        'containerRed',
        'containerBlue',
        'containerYellow',
        'containerGreen'
    ];

    const themeColor = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setCollors(i);
            i++;
            i > index.length - 1 ? (i = 0) : i;
            let element = document.getElementById(elementNumber);

            if (index[i] !== null || index[i] !== undefined) {
                index.map(val => element?.classList.remove(styles[val]));
                element?.classList.add(styles[index[i]]);
            }
        },
        [style]
    );

    useEffect(() => {
        setStyle(style);
    }, [style]);
    const actEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEdit(!edit);
    };

    // Estado para controlar o loading do botão
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Verificação básica para garantir que o ID existe
        if (!taskId) {
            toast.error('ID da tarefa não encontrado.' + taskId);
            return;
        }

        setIsLoading(true); // Ativa o estado de loading

        try {
            const res = await Api.patch(`/updateType/${taskId}`);

            // Se a requisição for bem-sucedida
            if (res.status === 200) {
                toast.success('Tarefa atualizada com sucesso!');
                console.log('Resposta da API:', res.data.msg);
            }
        } catch (error) {
            // Se a requisição falhar
            console.error('Erro ao atualizar a tarefa:', error);
            toast.error('Falha ao atualizar a tarefa.');
        } finally {
            setIsLoading(false); // Desativa o loading, independentemente do resultado
        }
    };

    const handleDeleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
        
        if (!taskId) {
            toast.error('ID da tarefa não encontrado.');
            return;
        }

        try {
            // Faz a requisição DELETE para a sua API, usando o ID nos parâmetros da URL
            const res = await Api.delete(`/deleteTask/${taskId}`);

            // Verifica se a requisição foi bem-sucedida (status 200)
            if (res.status === 200) {
                toast.success('Tarefa deletada com sucesso!');
                console.log('Resposta da API:', res.data.status);
               

                // Opcional: Aqui você pode atualizar o estado do seu componente,
                // por exemplo, removendo a tarefa da lista sem precisar recarregar a página.
                // Ex: setTodos(todos.filter(todo => todo.id !== taskId));
            }
        } catch (error) {
            // Se a requisição falhar (erro de rede, status 404, 500 etc.)
            console.error('Erro ao deletar a tarefa:', error);
            
        }
    };

    return (
        <div
            className={styles.container}
            style={{ backgroundColor: style }}
            id={elementNumber}
        >
            <section className={styles.boxTitle}>
                <input
                    disabled={edit}
                    type="text"
                    placeholder="Titulo"
                    style={{ backgroundColor: style }}
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                />
                <button className={styles.btn_star} onClick={handleUpdateTask}>
                    <Image src={Star} alt="icon star" />
                </button>
            </section>

            <section className={styles.boxTask}>
                <textarea
                    disabled={edit}
                    name="tasksTxt"
                    className={styles.tasksTxt}
                    cols={30}
                    rows={15}
                    placeholder="digite aqui a nota..."
                    style={{ backgroundColor: style }}
                    value={task}
                    onChange={e => setTask(e.target.value)}
                ></textarea>
            </section>
            <section className={styles.dates}>
                <label htmlFor="">
                    <span>
                        Criado a: {new Date(createdAt).toLocaleDateString()}
                    </span>
                </label>
            </section>
            <section className="">
                <button style={edit ? { display: 'none' } : {}}>Save</button>
            </section>
            <div className={styles.boxEdits}>
                <section>
                    <button onClick={actEdit}>
                        <Image
                            className={styles.pencil}
                            src={Pencil}
                            alt="icon star"
                        />
                    </button>
                    <button onClick={themeColor}>
                        <Image src={Bucket} alt="bucket" />
                    </button>
                </section>
                <section>
                    <button onClick={handleDeleteTask} >
                        <IoMdClose className={styles.closeIcon} />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default TaskCards;
