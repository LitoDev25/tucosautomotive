import { api } from '@/services/api';
import styles from './page.module.scss';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function Home() {

  async function handleLogin(formData: FormData) {
    "use server"

    const email = formData.get("email");
    const password = formData.get("password");

    if(email === '' || password === '') return;

    try {
      const response = await api.post("/admin-session", {
        email,
        password,
      })

      if (!response.data.token) return;
      
      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStore = await cookies();

      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    } catch (err) {
      console.log(err);
      return
    }

    redirect("/dashboard");
  }

  return(
    <>
      <div className={ styles.loginBox}>
        <div className={ styles.titleLogin }>
          <h1>LOGIN</h1>
        </div>
        <section className={ styles.login }>
          <form action={handleLogin}>
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
                placeholder="Digite sua senha"
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