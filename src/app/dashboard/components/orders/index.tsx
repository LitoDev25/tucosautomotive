"use client"

import { use } from 'react';
import { OrderProps } from '@/lib/order.type';
import styles from './styles.module.scss';
import { RefreshCcw } from "lucide-react";
import { ModalOrder } from '../modal';
import { OrderContext } from '@/providers/order';
import { StatusProps } from '@/lib/status.type';

interface Props {
    orders: OrderProps[];
}


export function Orders({ orders }: Props) {
    const { isOpen, onRequestOpen } = use(OrderContext);

    async function handleDetailOrder(order_id: string) {
        await onRequestOpen(order_id);
    }

    return (
        <>
            <main className={styles.container}>
                <div className={styles.boxController}>
                    <section className={styles.containerHeader}>
                        <h2>Últimos pedidos</h2>
                        <button>
                            <RefreshCcw size={24} color='#3fffa3' />
                        </button>
                    </section>
                    <section className={styles.listOrder}>
                        {orders.map(function (order) {
                            let data = new Date(order.data);
                            let dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                            return (
                                <div key={order._id} className={styles.orderItem}>
                                    <button
                                        onClick={() => handleDetailOrder(order._id)}
                                        className={styles.orderItem}>
                                        <div className={styles.tag}></div>
                                        <span>Pedido {order.code}</span>
                                        <span>| Cliente: {order.user.firstname + " " + order.user.lastname}</span>
                                        <span>| Status: {order.status.name}</span>
                                        <span>| Data: { dataFormatada } <br />| Hora: {order.hour}</span>
                                    </button>
                                </div>
                            )
                        })}
                    </section>
                </div>
            </main>

            {isOpen && <ModalOrder />}
        </>
    )
}