import { get, ref, set } from "firebase/database";
import { db } from "../lib/firebaseConfig";

export function dataTrivia(short_id_db:string, AllDataTriviaMerge:any):void{
    set(ref(db, `${short_id_db}/trivia`), {
        dataTrivia: AllDataTriviaMerge
    });
};

export function addUsers(short_id_db:string, username:string):void{
    const id_user:number = Date.now();
    set(ref(db, `${short_id_db}/users/${id_user}`), {
        username,
    });
};

export async function readUsers(short_id_db: string, user:string):Promise<boolean>{
    const starCountRef = ref(db, `${short_id_db}/users`);
    const snapshot = await get(starCountRef);
    const users = snapshot.val();
    
    if(users === null){
        return false;
    };

    const usersArrayOne:string[] = Object.values(users);

    let usersArrayTwo:string[] = [];

    usersArrayOne.forEach((e:any) => {
        for (const value in e) {
            usersArrayTwo.push(e[value]);
        };
    });

    const validatedUser:number = validateUsers(usersArrayTwo, user);

    return validatedUser === -1 ? true : false;
}

function validateUsers(allUsers:string[], user:string):number{
    let validated:number = allUsers.findIndex((el:string) => el === user);

    return validated;
};