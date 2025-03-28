"use client"

import { StatusProps } from '@/lib/status.type';
import styles from './styles.module.scss';
import { RefreshCcw, Edit, Delete, Plus } from 'lucide-react'
import Link from 'next/link';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { redirect } from 'next/navigation';

interface Props {
    status: StatusProps[]
}

export function StatusComponent({ status }: Props) {

    async function handleDelete(status_id: string) {

        const token = await getCookieClient();

        try {
            await api.delete(`/status/${status_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (err) {
            console.log(err);
        }

        redirect('/dashboard/status')
    }

    return (
        <div className={styles.statusContainer}>
            <section className={styles.containerStatus}>
                <h1>Status</h1>
                <button>
                    <RefreshCcw size={25} color='#3fffa3' />
                </button>
                <button>
                    <Link href={"/dashboard/status/create"}>
                        <Plus size={25} color='#3fffa3' />
                    </Link>
                </button>
            </section>

            <section className={styles.listStatus}>
                {status.map(staty => (
                    <div key={staty._id} className={styles.statusDiv}>
                        <div className="taginformation">
                            <div className={styles.tag}></div>
                            <span>{staty.name}</span>
                        </div>

                        <div className="optbtns">
                            <button>
                                <Link href={`/dashboard/status/update/${staty._id}`}>
                                    <Edit size={25} color='#3fffa3' />
                                </Link>
                            </button>
                            <button onClick={() => handleDelete(staty._id)}>
                                <Delete size={25} color='#fc0000e3' />
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}