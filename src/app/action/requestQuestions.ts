"use server"

import { redirect } from "next/navigation";
import { addUsers, dataTrivia } from "../lib/firebaseFunctions";
import { TodoSchema } from "../lib/types";

export async function requestQuestions(formData: unknown) {
    const id_db:string = crypto.randomUUID();
    const short_id_db:string = id_db.substring(0,8); 
    const resultQuestions = TodoSchema.safeParse(formData);
    
    if(!resultQuestions.success){
        let errorMessage:string = "";

        resultQuestions.error.issues.forEach((issue, index) => {
            errorMessage = errorMessage + issue.path[index] + ": " + issue.message + ". ";
        });

        return {
            error: errorMessage
        };
    };

    const username_code:string = btoa(resultQuestions.data["username"]);
    
    addUsers(short_id_db, resultQuestions.data["username"]);

    const url_getToken:string = "https://opentdb.com/api_token.php?command=request";
    const request_token:Response = await fetch(url_getToken, { cache:"no-cache" });
    const getTokenFormatJson:any = await request_token.json();
    let amountQuestions:number = 1;
    let allDataTriviaMerge:string[];
    let errorMessageTriviAPI:string = "";

    Promise.all([
        fetch(`https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`, { cache:"no-cache" }),
        fetch(`https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`, { cache:"no-cache" }),
        fetch(`https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`, { cache:"no-cache" }),
        fetch(`https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`, { cache:"no-cache" }),
        fetch(`https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`, { cache:"no-cache" })
    ]).then(responses => {
        return Promise.all(responses.map((res) => res.ok ? res.json() : Promise.reject(res)));
    }).then(json => {
        allDataTriviaMerge = [
            ...json[0].results,
            ...json[1].results,
            ...json[2].results,
            ...json[3].results,
            ...json[4].results
        ];

        dataTrivia(short_id_db, allDataTriviaMerge);
    }).catch(err => {
        //errorMessageTriviAPI  = err.cause.code || "We have tecnical issues, excuse us";
    });

    redirect(`/play?user=${username_code}&code=${short_id_db}`);
};