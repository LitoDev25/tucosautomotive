"use client"

import { getCookieClient } from "@/lib/cookieClient";
import { StatusProps } from "@/lib/status.type";
import { api } from "@/services/api";
import { createContext, ReactNode, useState } from "react";


interface OrderItemProps {
    _id: string,
    user: {
			_id: string,
			firstname: string,
			lastname: string,
			email: string,
			phone: string,
            password: string,
			photo: string,
			date_of_birth: string,
			created_at: string,
			updated_at: string,
			__v: number,
	},
    service: {
        _id: string,
        name: string,
        banner: string,
        description: string,
        price: string,
        created_at: string,
        updated_at: string,
        __v: number,
    },
    status: {
		_id: string,
		name: string,
		created_at: string,
		updated_at: string,
		__v: number,
	},
    code: string,
    hour: string,
	data: string,
	created_at: string,
	updated_at: string,
    __v: number,
}	

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: ()=> void;
    order: OrderItemProps[];
    status: StatusProps[];
}

type OrderProviderProps = {
    children: ReactNode;
}	

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider( {children}: OrderProviderProps ) {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ status, setStatus ] = useState([]);
    const [ order, setOrder ] = useState<OrderItemProps[]>([]);

    async function onRequestOpen(order_id: string) {
        // console.log(order_id);

        const token = getCookieClient();

        const response = await api.get(`/orderme/${order_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        const responseStatus = await api.get('/status', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        const dataStatus = responseStatus.data;
        const data = response.data;

        setStatus(dataStatus);
        setOrder(data);
        setIsOpen(true);
    }

    function onRequestClose() {
        setIsOpen(false);
    }

    return(
        <OrderContext.Provider 
        value={{
            isOpen,
            onRequestOpen,
            onRequestClose,
            status,
            order,
        }}>
            {children}
        </OrderContext.Provider>
    )
}