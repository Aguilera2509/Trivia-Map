"use server"

import { redirect } from "next/navigation"
import { addUsers, readUsers } from "../lib/firebaseFunctions";
import { TodoSchemaCode } from "../lib/types";

export async function requestCode(formData: unknown) {
    const resultCode = TodoSchemaCode.safeParse(formData);

    if(!resultCode.success){
        let errorMessage:string = "";

        resultCode.error.issues.forEach((issue, index) => {
            errorMessage = errorMessage + issue.path[index] + ": " + issue.message + ". ";
        });

        return {
            error: errorMessage
        };
    };

    const username_code:string = btoa(resultCode.data["username"]);
    const short_id_db:string = resultCode.data["roomCode"];
    const validated:Promise<boolean> = readUsers(short_id_db, resultCode.data["username"]);

    return validated.then((accepted:boolean) => {
        if(accepted){
            addUsers(short_id_db, resultCode.data["username"]);
            redirect(`/play?user=${username_code}&code=${short_id_db}`);
        };

        if(!accepted){
            return {
                error: "That username already exists in the room. Please choose any else"
            };
        };
    });
};