"use server"

import { redirect } from "next/navigation"
import { addUsers, codeValidation } from "../lib/firebaseFunctions";
import { TodoSchemaCode } from "../lib/types";
import { getSession } from '@auth0/nextjs-auth0';

/*Option made for when you have severals inputs
    resultCode.error.issues.forEach((issue, index) => {
        errorMessage = errorMessage + issue.path[index] + ": " + issue.message + ". ";
});*/

export async function requestCode(formData: FormDataEntryValue, username:string) {
    const { user } = await getSession() as any;
    const resultCode = TodoSchemaCode.safeParse(formData);

    if(!resultCode.success){
        console.log(resultCode.error.issues[0].message);

        return {
            error: resultCode.error.issues[0].code + ": " +resultCode.error.issues[0].message
        };
    };

    const short_id_db:string = resultCode.data; //8ba0142a
    const isLogin = {
        //google: ():boolean=> Boolean(user.sub.match(/google-oauth2/i)),
        //facebook: ():boolean=> Boolean(user.sub.match(/facebook/i)),
        //twitter: ():boolean=> Boolean(user.sub.match(/twitter/i)),
        auth: ():boolean => Boolean(user?.sub.match(/auth0/i)),
    };
    const oficialUsername:string = isLogin.auth() ? user?.nickname : username.replace(" ", "_");
    const validatedCode:Promise<boolean> = codeValidation(short_id_db);

    return validatedCode.then((accepted:boolean) => {
        if(accepted){
            addUsers(short_id_db, oficialUsername, user.picture);
            redirect(`/play?code=${short_id_db}`);
        };

        if(!accepted){
            return {
                error: "Room not exists, evalute well the code, please"
            };
        };
    });
};