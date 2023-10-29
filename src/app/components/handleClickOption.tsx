import { useEffect, useState } from 'react';
import { useGettingAnswersUsers, useGettingDataUsers } from '../hooks/useCustoms';
import { useSearchParams } from 'next/navigation';
import { TComponentClickableHeading } from '../lib/types';

export const ClickableHeading = ({ data, selectedOption, setSelectedOption, numberQuestion }:TComponentClickableHeading) => {
    const routerGetParams = useSearchParams();
    const username:string = atob(routerGetParams.get("user") as string);
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
        let lookingForYourAnswer:string[] = answersUsers.map((el:any) => el["username"] === username ? el["selectedOption"] : "");
        let searchingYourIndexAtUsers:number = users.findIndex(el => el === username);
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