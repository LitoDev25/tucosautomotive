import { api } from "@/services/api";
import { Orders } from "./components/orders";
import { getCookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";

async function getOrders(): Promise<OrderProps[] | []>
{
    try {
        const token = await getCookieServer();

        const response = await api.get("/order", {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
                
        return response.data || [];
    } catch (error) {
        console.log(error);
        return []
    }
}

async function getStatus() {
    const token = await getCookieServer();

    const response = await api.get("/status", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}

export default async function Dashboard() {

    const orders = await getOrders();
    const status = await getStatus();

    return (
        <>
            <Orders orders={ orders } />
        </>
    )
}