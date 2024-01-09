import { get, ref, set } from "firebase/database";
import { db } from "../lib/firebaseConfig";

export function dataTrivia(short_id_db:string, AllDataTriviaMerge:any):void{
    set(ref(db, `${short_id_db}/trivia`), {
        dataTrivia: AllDataTriviaMerge
    });
};

export function addUsers(short_id_db:string, username:string, picture:string):void{
    const id_user:number = Date.now();
    set(ref(db, `${short_id_db}/users/${id_user}`), {
        username,
        picture
    });
};

export function saveMap(short_id_db:string, map:string):void{
    set(ref(db, `${short_id_db}/placeToPlay/`), {
        map
    });
};

export async function codeValidation(short_id_db: string):Promise<boolean>{
    const starCountRef = ref(db);
    const snapshot = await get(starCountRef);
    const room = snapshot.val();
    
    if(room === null){
        return false;
    };

    const validatedCode:number = Object.keys(room).findIndex((codeRoom:string) => codeRoom === short_id_db);

    return validatedCode !== -1 ? true : false;
};
