"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "../components/layout";
import { Loader } from "../components/loader";
import { useRouter } from "next/navigation";
import ErrPressingButton from "../components/errUser";
import { TodoSchemaCode } from "../lib/types";
import { addUsers, codeValidation } from "../lib/firebaseFunctions";

export default function Page(){
    const router = useRouter();
    const [load, setLoad] = useState<boolean>(false);
    const [err, setErr] = useState<boolean>(false);
    const { user, isLoading } = useUser() as any;
    const [roomCode, setRoomCode] = useState<string>("");

    const handleChange = (e:ChangeEvent<HTMLInputElement>):void => {
        setRoomCode(e.target.value);
    };

    const clientActionCode = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoad(true);
        if(user === null || user === undefined) return setErr(true);
        setErr(false);
        const isLogin = {
            //google: ():boolean=> Boolean(user.sub.match(/google-oauth2/i)),
            //facebook: ():boolean=> Boolean(user.sub.match(/facebook/i)),
            //twitter: ():boolean=> Boolean(user.sub.match(/twitter/i)),
            auth: ():boolean => Boolean(user?.sub.match(/auth0/i)),
        };
        const oficialUsername:string = isLogin.auth() ? user?.nickname : user?.name.replace(" ", "_");
        const resultCode = TodoSchemaCode.safeParse(roomCode);

        if(!resultCode.success){  
            toast.error(resultCode.error.issues[0].code + ": " + resultCode.error.issues[0].message);
            setLoad(false);  
            return;
        };

        const short_id_db:string = resultCode.data; //8ba0142a
        const validatedCode:Promise<boolean> = codeValidation(short_id_db);

        validatedCode.then((accepted:boolean) => {
            if(accepted){
                addUsers(short_id_db, oficialUsername, user.picture);
                router.push(`play?code=${short_id_db}`);
            };
    
            if(!accepted){
                toast.error("Room not exists, evalute well the code, please");
                setLoad(false);
            };
        });
    };

    if(isLoading){
        return <h4>Loading...</h4>
    };

    if(!user && !isLoading){
        router.back();
    };

    return(
        <section>
            <form onSubmit={clientActionCode}>
                <Layout>
                    <h5 className="card-header">Join quickly to have fun</h5>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="FormControlCode" className="form-label">Code of room</label>
                            <input type="text" className="form-control" name="roomCode" id="FormControlCode" value={roomCode} onChange={handleChange} />
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