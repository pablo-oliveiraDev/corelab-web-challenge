'use client';
import styles from '@/assets/styles/pages/login.module.sass';
import LoadingPage from '@/components/Loading/loading';
import Link from 'next/link';
import * as T from '../../Types/contextTypes';
import { useContext, useEffect, useState } from 'react';
import { StoreNotesContext } from '@/contexts/StoreNotesProviders';
import {ResStatusCode} from '@/functions/functions';

export default function UsrLogin() {
    const {
        Login,
        Loading,
        SetLoged,
        SetTrigger,
        Trigger,
        Status,
        Mensage,
    }: T.InitialValue = useContext(StoreNotesContext);
    const [email, SetEmail] = useState<string>('');
    const [senha, SetSenha] = useState<string>('');

    const SaveBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        SetTrigger(!Trigger);
        Login(email, senha);
        
        // SetEmail('');
        // SetPassword('');
    };
    useEffect(()=>{
        ResStatusCode(Status!, Mensage!);
    },[Mensage,Status])
    return (
        <div className={styles.container}>
            {Loading && <LoadingPage />}
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form className={styles.itensForm}>
                <h3>Login Here</h3>
                <label htmlFor="username">Username</label>
                <input
                    type="email"
                    placeholder="Email "
                    id="username"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        SetEmail(e.target.value)
                    }
                />

                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    placeholder="Password"
                    id="password"
                    value={senha}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        SetSenha(e.target.value)
                    }
                />

                <button className={styles.btnLogin} onClick={SaveBtn}>
                    Log In
                </button>
                <div className={styles.social}>
                    <span>Dont have login? </span>
                    <Link href="/signup">click here for sign up</Link>
                </div>
            </form>
        </div>
    );
}
