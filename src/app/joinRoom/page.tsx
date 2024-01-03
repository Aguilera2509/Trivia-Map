"use client"

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "../components/layout";
import { Loader } from "../components/loader";
import { requestCode } from "../action/requestCode";
import { useRouter } from "next/navigation";
import ErrPressingButton from "../components/errUser";

export default function Page(){
    const router = useRouter();
    const [load, setLoad] = useState<boolean>(false);
    const [err, setErr] = useState<boolean>(false);
    const { user, isLoading } = useUser();

    const clientActionCode = async (formData:FormData) => {
        const dataCode = formData.get("roomCode") as FormDataEntryValue;
        if(user === null || user === undefined) return setErr(true);
        setErr(false);
        const username = user.name as string;
        const response = await requestCode(dataCode, username);
        if(response?.error){
            toast.error(response.error);
            setLoad(false);
        };
    };

    if(isLoading){
        return <h4>Loading...</h4>
    };

    if(!user && !isLoading){
        router.back();
    };

    return(
        <section>
            <form onSubmit={() => setLoad(true)} action={clientActionCode}>
                <Layout>
                    <h5 className="card-header">Join quickly to have fun</h5>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="FormControlCode" className="form-label">Code of room</label>
                            <input type="text" className="form-control" name="roomCode" id="FormControlCode" />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        <div className="d-flex justify-content-start">
                            <Link href="/" role="button" className="btn btn-info">Back</Link>
                        </div>
                    </div>
                    {load &&
                        <Loader />
                    }
                    {err &&
                        <ErrPressingButton />
                    }
                </Layout>
            </form>
        </section>
    )
}