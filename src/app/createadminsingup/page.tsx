import styles from '../page.module.scss';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';

export default function Singup() {

    async function handleRegister(formData: FormData) {
        "use server"

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const repassword = formData.get("repassword");

        if(name === "" || email === "" || password === "" || repassword === "") {
            console.log("Preencha todos os campos")
            return;
        }

        if ( password !== repassword) {
            console.log("Senhas diferentes")
            return;
        }

        try {
            await api.post('/0110000101100100011011010110100101101110', {
                name,
                email,
                password,
            })
        } catch (err) {
            console.log("error");
            console.log(err);
            
        }

        redirect("/");
    }

    return (
        <>
            <div className={styles.loginBox}>
                <div className={styles.titleLogin}>
                    <h1>Faça seu Cadastro:</h1>
                </div>
                <section className={styles.login}>
                    <form action={handleRegister}>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder='Digite seu Nome'
                        />

                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Digite seu Email"
                        />

                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Digite sua Senha"
                        />

                        <input
                            type="password"
                            required
                            name="repassword"
                            id="repassword"
                            placeholder="Digite novamente sua Senha"
                        />

                        <button type="submit">
                            Acessar
                        </button>

                    </form>
                </section>
            </div>
        </>
    )
}