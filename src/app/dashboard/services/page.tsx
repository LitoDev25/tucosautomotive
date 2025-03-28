import { api } from "@/services/api";
import { ServicesComponent } from "../components/services";

async function getServicos() {
    try {
        const response = await api.get("/service");

        return response.data || []
    } catch (err) {
        console.log(err);
        return;
    }
}

export default async function Services() {

    const services = await getServicos();

    return (
        <main>
            <ServicesComponent services={services} />
        </main>
    )
}