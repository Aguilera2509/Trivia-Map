import { useEffect, useState } from 'react';
import { useGettingAnswersUsers, useGettingDataUsers } from '../hooks/useCustoms';
import { useSearchParams } from 'next/navigation';
import { TComponentClickableHeading } from '../lib/types';
import { useUser } from '@auth0/nextjs-auth0/client';

export const ClickableHeading = ({ data, selectedOption, setSelectedOption, numberQuestion }:TComponentClickableHeading) => {
    const { user } = useUser() as any;
    const isLogin = {
        //google: ()=> user.sub.match(/google-oauth2/i),
        //facebook: ()=> user.sub.match(/facebook/i),
        //twitter: ()=> user.sub.match(/twitter/i),
        auth: ():boolean => Boolean(user?.sub.match(/auth0/i)),
    };
    const oficialUsername =  isLogin.auth() ? user?.nickname : user?.name.replace(" ", "_") as string;
    const routerGetParams = useSearchParams();
    const routerCode:string  = routerGetParams.get("code") as string;
    const answersUsers = useGettingAnswersUsers(routerCode);
    const users = useGettingDataUsers(routerCode);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if(selectedOption.length === 0){
            setSelectedOption(data);
            setIsClicked(true);
        };
    };

    useEffect(()=> {
        setIsClicked(false);
        setSelectedOption("");
    }, [numberQuestion]);

    useEffect(()=> {
        let lookingForYourAnswer:string[] = answersUsers.map((el:any) => el["oficialUsername"] === oficialUsername ? el["selectedOption"] : "");
        let searchingYourIndexAtUsers:number = users.findIndex(el => el === oficialUsername);
        if(lookingForYourAnswer[searchingYourIndexAtUsers] !== undefined && data === lookingForYourAnswer[searchingYourIndexAtUsers]){
            setSelectedOption(data);
            setIsClicked(true);
        };
    }, [answersUsers])

    return (
        <h3
            onClick={handleClick}
            className={`form-control ${!isClicked ? "text-bg-secondary" : "text-bg-primary"}`}
        >
        {data}
        </h3>
    );
};