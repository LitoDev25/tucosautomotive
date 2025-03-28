"use client"

import { useParams } from "next/navigation";
import { UpdateForm } from "../component/form/index";

interface Props {
    params: string
}


export default function ServiceUpdateItem({params: _id}: Props) {
    const params = useParams<{ _id: string}>();

    return (
        <UpdateForm id={params._id} />
    )

}