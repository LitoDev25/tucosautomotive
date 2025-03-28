"use client"

import Link from 'next/link';
import styles from './styles.module.scss';
import { LogInIcon } from 'lucide-react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export function Header() {
    const router = useRouter();

    async function handleLogout() {
        deleteCookie("session", { path: "/"});

        router.replace('/');
    }

    return (
        <header className={ styles.header }>
            <div className={ styles.headerContainer }>
                <div className={ styles.headerContent }>
                    <Link href={"/dashboard"}>
                        <h2>Tuco Lavação Admin</h2>
                    </Link>

                    <nav>
                        <Link href={"/dashboard"} >
                            Inicio
                        </Link>
                        <Link href={"/dashboard/status"} >
                            Status
                        </Link>
                        <Link href={"/dashboard/services"} >
                            Serviços
                        </Link>
                        <Link href={"/dashboard/clients"} >
                            Clientes
                        </Link>

                        <form action={ handleLogout }>
                            <button type='submit'>
                                <LogInIcon size={24} />
                            </button>
                        </form>
                    </nav>
                </div>
            </div>
        </header>
    )
}