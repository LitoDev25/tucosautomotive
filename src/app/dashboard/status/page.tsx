import { api } from "@/services/api";
import { StatusComponent } from "../components/status";
import { getCookieServer } from "@/lib/cookieServer";
import { StatusProps } from "@/lib/status.type";


async function getStatus(): Promise<StatusProps[] | []>
{
    try {

        const token = await getCookieServer();

        const response = await api.get("/status", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        return response.data || [];
    } catch(err) {
        console.log(err);
        return []
    }
}

export default async function Status() {

    const status = await getStatus();    

    return (
        <main>
            <StatusComponent status={status} />
        </main>
    )
}