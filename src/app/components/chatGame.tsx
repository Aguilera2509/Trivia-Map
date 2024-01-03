import { ref, set } from "firebase/database";
import { ChangeEvent, FormEvent, useState } from "react";
import { db } from "../lib/firebaseConfig";
import { useSearchParams } from "next/navigation";
import { useGettingMessagesUsers } from "../hooks/useCustoms";
import { useUser } from '@auth0/nextjs-auth0/client';

export const ChatGame = () => {
    const { user } = useUser() as any;
    const isLogin = {
        //google: ()=> user.sub.match(/google-oauth2/i),
        //facebook: ()=> user.sub.match(/facebook/i),
        //twitter: ()=> user.sub.match(/twitter/i),
        auth: ():boolean => Boolean(user?.sub.match(/auth0/i)),
    };
    const oficialUsername =  isLogin.auth() ? user?.nickname : user?.name.replace(" ", "_") as string;
    const router = useSearchParams();
    const routerCode:string  = router.get("code") as string;
    const [message, setMessage] = useState<string>("");
    const readMessages = useGettingMessagesUsers(routerCode);

    const handleChange = (e:ChangeEvent<HTMLInputElement>):void => {
        setMessage(e.target.value);
    };
    
    const handleSubmit = (e:FormEvent<HTMLFormElement>): void=> {
        e.preventDefault();
        postMessages();
        setMessage("");
    };

    const postMessages = ():void => {
        let id_message:number = Date.now();
        const currentDate:Date = new Date();
        const options:Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
        const formattedTime = currentDate.toLocaleString(['en-US', 'en-GB'], options);
        const [hours, minutes] = formattedTime.split(':');

        set(ref(db, `${routerCode}/messages/${id_message}`), {
            message,
            oficialUsername,
            hours,
            minutes
        });
    };

    return (
        <div className="card positionChat" style={{"width": "24rem"}}>
            <div className="card-body" style={{"overflowY": "auto"}}>
                {readMessages.length !== 0 && readMessages.map((el:any, index:number) => <p className="text-bg-dark rounded p-2" key={index}>{ el["oficialUsername"]}: {el["message"] } <sub>{el["hours"]}:{el["minutes"]}</sub> </p> )}  
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 p-3">
                    <input type="text" value={message} onChange={handleChange}  className="form-control" placeholder="Hi, friends" />
                </div>
            </form>
        </div>
    );
};