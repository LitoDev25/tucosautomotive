"use client"
import { api } from '@/services/api';
import styles from './styles.module.scss';
import { redirect, useParams } from 'next/navigation';
import { getCookieClient } from '@/lib/cookieClient';

interface ParamId {
    params: string
}

export default function updateStatus({params: _id}: ParamId) {
    const params = useParams<{ _id: string}>();

    async function handleUpdate(formData: FormData)
    {

        const name = formData.get('name');

        if(name === '') return;

        const token = await getCookieClient();

        try {
            await api.put(`/status/${params._id}`, 
                {
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
            <div className={ styles.formContainerUpdate }>
                <h2>Atualizar status:</h2>
                <section className={styles.continerUpFiles}>
                    <form action={handleUpdate}>
                        <div className={styles.itemForm}>
                            <label htmlFor="name">Nome do status</label>
                            <input type="text" name="name" id="name" placeholder='Digite o nome do status' />
                        </div>
                        <div className={ styles.submitForm }>
                            <button type='submit'>
                                Atualizar
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}