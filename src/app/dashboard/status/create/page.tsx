
import { redirect } from 'next/navigation';
import styles from '../update/[_id]/styles.module.scss';
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';

export default function CreateStatus() {

    async function handleCreate(formData: FormData) {
        "use server"

        const name = formData.get("name");

        if (name === '') return;
        
        const token = await getCookieServer();

        try {
            await api.post("/status", {
                    name
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }}
        );
        } catch (error) {
            console.log(error);
            return;
        }

        redirect('/dashboard/status')
    }

    return (
        <main>
            <div className={styles.formContainerUpdate}>
                <h2>Criar status:</h2>
                <section className={styles.continerUpFiles}>
                    <form action={handleCreate}>
                        <div className={styles.itemForm}>
                            <label htmlFor="name">Nome do status</label>
                            <input type="text" name="name" id="name" placeholder='Digite o nome do status' />
                        </div>
                        <div className={styles.submitForm}>
                            <button type='submit'>
                                Salvar
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}