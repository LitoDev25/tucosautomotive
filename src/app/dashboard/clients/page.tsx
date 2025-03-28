
import { ClientComponent } from "../components/clients";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";


async function getClient() {
    try {

        const token = await getCookieServer();

        const response = await api.get("/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        return response.data || [];
    } catch (err) {
        console.log(err);
        return []
    }
}

export default async function Clients() {

    const client = await getClient();

    return (
        <main>
            <ClientComponent client={client} />
        </main>
    )
}