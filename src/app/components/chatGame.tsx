import { ref, set } from "firebase/database";
import { ChangeEvent, FormEvent, useState } from "react";
import { db } from "../lib/firebaseConfig";
import { useSearchParams } from "next/navigation";
import { useGettingMessagesUsers } from "../hooks/useCustoms";

export const ChatGame = () => {
    const router = useSearchParams();
    const username:string = atob(router.get("user") as string);
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
        const hours:string = currentDate.getHours().toString().padStart(2, '0');
        const minutes:String = currentDate.getMinutes().toString().padStart(2, '0');

        set(ref(db, `${routerCode}/messages/${id_message}`), {
            message,
            username,
            hours,
            minutes
        });
    };

    return (
        <div className="card positionChat" style={{"width": "24rem"}}>
            <div className="card-body" style={{"overflowY": "auto"}}>
                {readMessages.length !== 0 && readMessages.map((el:any, index:number) => <p className="text-bg-dark rounded p-2" key={index}>{ el["username"]}: {el["message"] } <sub>{el["hours"]}:{el["minutes"]}</sub> </p> )}  
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 p-3">
                    <input type="text" value={message} onChange={handleChange}  className="form-control" placeholder="Hi, friends" />
                </div>
            </form>
        </div>
    );
};