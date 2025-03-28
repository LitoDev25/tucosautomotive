"use client"

import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { redirect } from "next/navigation";

export function Form() {
    const [ image, setImage ] = useState<File>();
    const [ previewImage, setPreviewImage ] = useState("");

    async function handleRegisterService(formData: FormData) {
        const name = formData.get("name");
        const description = formData.get("description");
        const price = formData.get("price");

        if(!name || !description || !price || !image) return;

        const token = getCookieClient();

        const data = new FormData();

        data.append("name", name);
        data.append("description", description);
        data.append("price", price);
        data.append("file", image);

        await api.post("/service", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        alert("Cadastrado com sucesso!")
        redirect("/dashboard/services")
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        const eltarget = e.target.files;

        if(eltarget && eltarget[0]) {
            const image = eltarget[0]

            if(image.type !== "image/png" && image.type !== "image/jpeg" && image.type !== "image/webp" ) {
                return;
            }
            
            setImage(image);
            setPreviewImage(URL.createObjectURL(image));
        }
    }

    return(
        <div className={styles.servicesContainerForm}>
            <h1>Novo Serviço</h1>

            <form action={handleRegisterService} className={ styles.serviceForm }>
                <label htmlFor="" className={ styles.labelImage }>
                    <span>
                        <UploadCloud size={30} color="#fff" />
                    </span>
                        <input type="file"
                               accept="image/png, image/jpeg, image/webp"
                               required
                               onChange={handleFile}
                               aria-hidden={true}
                        />
                        {previewImage && (
                            <Image 
                                alt={`${image?.name}`}
                                src={previewImage}
                                className={ styles.preview }
                                fill={true}
                                quality={100}
                                priority={true}
                            />
                        )}
                </label>

                <input 
                    type="text" 
                    name="name" 
                    placeholder="Nome do serviço?"
                    className={ styles.inputService }
                    required
                />

                <textarea 
                    name="description"
                    required
                    className={styles.inputService}
                    placeholder="Digite a descrição do seu serviço."
                >

                </textarea>

                <input 
                    type="text" 
                    name="price" 
                    placeholder="Quanto custa o seviço?"
                    className={ styles.inputService }
                    required
                />

                <button type="submit">
                    Criar
                </button>
            </form>
        </div>
    )
}