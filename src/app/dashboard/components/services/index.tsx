"use client"

import { ServiceProps } from '@/lib/service.type';
import styles from './styles.module.scss';
import { RefreshCcw, Plus, Edit, Delete } from 'lucide-react';
import Link from 'next/link';
import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';

interface Props {
    services: ServiceProps[]
}

export function ServicesComponent({ services }: Props) {

    async function handleDelete(service_id: string) {
        const token = await getCookieClient();

        try {
            await api.delete(`/service/${service_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (err) {
            console.log(err);
        }

        redirect('/dashboard/services')
    }



    return (
        <>
            <section className={styles.serviceContainer}>
                <div className={styles.serviceBoxContent}>
                    <div className={styles.serviceTopo}>
                        <h1>Serviços:</h1>
                        <button>
                            <RefreshCcw size={24} color='#3fffa3' />
                        </button>
                        <button>
                            <Link href={'/dashboard/services/create'}>
                                <Plus size={24} color='#3fffa3' />
                            </Link>
                        </button>
                    </div>

                    {services.map(function (srv) {
                        return (
                            <div key={srv._id} className={styles.servicesBox}>
                                <div className={styles.boxName}>
                                    <span>Nome: {srv.name}</span>
                                    <span> | Preço: {srv.price}</span>
                                </div>
                                <div className={styles.serviceBtn}>
                                    <button>
                                        <Link href={`/dashboard/services/update/${srv._id}`}>
                                            <Edit size={25} color='#3fffa3' />
                                        </Link>
                                    </button>
                                    <button onClick={() => handleDelete(srv._id)}>
                                        <Delete size={25} color='#fc0000e3' />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}