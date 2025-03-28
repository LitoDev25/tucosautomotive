"use client";

import styles from './styles.module.scss';
import { X } from 'lucide-react';
import { ChangeEvent, use, useState } from 'react';
import { OrderContext } from '@/providers/order';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { redirect } from 'next/navigation';

export function ModalOrder() {
    const { onRequestClose, order, status } = use(OrderContext);
    const [statusIs, setStatusId] = useState("");

    let data = new Date(order.data);
    let dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    async function updateStatus() {

        const token = await getCookieClient();

        await api.put(`/order/${order._id}`, {
            status: statusIs
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        onRequestClose();
        redirect("/dashboard")
    }

    function changeStatus(e: ChangeEvent<HTMLSelectElement>) {
        let el = e.target;

        setStatusId(el.value);
    }

    return (
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} />
                </button>

                <article className={styles.dContainer}>
                    <h2>Detalhes do pedido: </h2>

                    <span className={styles.orderNumber}>
                        Pedido <b>{order.code}</b>
                    </span>

                    <section className={styles.orderItem}>
                        <div className={styles.imgOrder}>
                            <img src={`http://localhost:2409/service-photo/${order.service.banner}`} alt={order.service.name} />
                        </div>
                        <span>Data: <b>{dataFormatada}</b> Hora: <b><em>{order.hour}</em></b></span>
                        <span>Nome: <b>{`${order.user.firstname} ${order.user.lastname}`}</b></span>
                        <span>Serviço: <b>{order.service.name}</b></span>
                        <span>Preço: R$ <b>{order.service.price}</b></span>
                        <span className={styles.description}>{order.service.description}</span>
                        <select onChange={changeStatus} name="status">
                            <option defaultValue={order.status.name} selected key={0} value={order.status._id}>
                                {order.status.name}
                            </option>
                            {status.map(function (stts) {
                                if (order.status._id === status._id) return;
                                return (
                                    <option key={stts._id} value={stts._id}>
                                        {stts.name}
                                    </option>
                                )
                            })}
                        </select>
                    </section>

                    <button onClick={updateStatus} className={styles.buttonOrder}>
                        concluir
                    </button>
                </article>
            </section>
        </dialog>
    )
}