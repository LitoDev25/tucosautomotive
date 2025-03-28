"use client"

import { ClientProps } from '@/lib/client.type';
import styles from './styles.module.scss';
import { redirect } from 'next/navigation';

interface Props {
    client: ClientProps[]
}

export function ClientComponent({client}: Props) {

    function showUser(_id: string) {
        redirect(`/dashboard/clients/me/${_id}`);
    }

    return (
        <section className={styles.clientContainer}>
            <div className={styles.clienteBox}>
                <div className={styles.clientsTitle}>
                    <h1>Clientes: </h1>
                </div>

                <div className={styles.clientsContent}>
                    <div className={styles.clientsInfos}>
                        {client.map(function(clients) {
                            return (
                                <button onClick={()=> showUser(clients._id)} key={clients._id}>
                                    Cliente: { clients.firstname + " " + clients.lastname} 
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}