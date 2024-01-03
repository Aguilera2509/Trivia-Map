"use client"

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUser } from '@auth0/nextjs-auth0/client';
import { requestQuestions } from "../action/requestQuestions";
import Layout from "../components/layout";
import { Loader } from "../components/loader";
import { useRouter } from 'next/navigation';
import ErrPressingButton from "../components/errUser";

type TOptionsToPlay = {
    value: string;
    label: string;
};

const optionsToPlay:TOptionsToPlay[] = [
    { value:"africaMill", label:"Africa" },
    { value:"dzMill", label:"Algeria" },
    { value:"arMill", label:"Argentina" },
    { value:"asiaMill", label:"Asia" },
    { value:"auMill", label:"Australia" },
    { value:"atMill", label:"Austria" },
    { value:"beMill", label:"Belgium" },
    { value:"brMill", label:"Brazil" },
    { value:"caMill", label:"Canada" },
    { value:"usIlChicagoMill", label:"Chicago" },
    { value:"cnMill", label:"China" },
    { value:"coMill", label:"Colombia" },
    { value:"dkMill", label:"Denmark" },
    { value:"europeMill", label:"Europe" },
    { value:"frMill", label:"France" },
    { value:"frRegionsMill", label:"France Regions" },
    { value:"frRegions_2016Mill", label:"France Regions 2016" },
    { value:"deMill", label:"Germany" },
    { value:"inMill", label:"India" },
    { value:"iranMill", label:"Iran" },
    { value:"itMill", label:"Italy" },
    { value:"itRegionsMill", label:"Italy Regions" },
    { value:"nlMill", label:"Netherlands" },
    { value:"usNyNewYorkMill", label:"New York" },
    { value:"nzMill", label:"New Ziland" },
    { value:"northAmericaMill", label:"NorthAmerica" },
    { value:"noMill", label:"Norway" },
    { value:"oceaniaMill", label:"Oceania" },
    { value:"plMill", label:"Poland" },
    { value:"ptMill", label:"Portugal" },
    { value:"ruMill", label:"Russia" },
    { value:"ruFdMill", label:"Russia Federal Districts" },
    { value:"zaMill", label:"SouthAfrica" },
    { value:"southAmericaMill", label:"SouthAmerica" },
    { value:"krMill", label:"SouthKorea" },
    { value:"esMill", label:"Spain" },
    { value:"seMill", label:"Sweden" },
    { value:"chMill", label:"Switzerland" },
    { value:"thMill", label:"Thailand" },
    { value:"trMill", label:"Turkey" },
    { value:"ukRegionsMill", label:"UkRegions" },
    { value:"ukCountriesMill", label:"United Kingdom Countries" },
    { value:"usMill", label:"United States" },
    { value:"veMill", label:"Venezuela" },
    { value:"worldMill", label:"The Whole World" },
];

export default function Page(){
    const router = useRouter();
    const [load, setLoad] = useState<boolean>(false);
    const [err, setErr] = useState<boolean>(false);
    const { user, isLoading } = useUser();

    const clientActionQuestions = async (formData:FormData) => {
        const placeToPlay = formData.get("optionFromSelectTag") as FormDataEntryValue;
        if(user === null || user === undefined) return setErr(true);
        setErr(false);
        const username = user.name as string;
        const response = await requestQuestions(placeToPlay, username);
        if(response?.error){
          toast.error(response.error);
          setLoad(false);
        };
        if(response.code !== undefined){
            setTimeout(()=>{
                router.push(`/play?code=${response.code}`);
            }, 27000);
        };
    };

    if(isLoading){
        return <h4>Loading...</h4>
    };

    if(!user && !isLoading){
        router.back();
    };

    return(
        <section>
            <form onSubmit={() => setLoad(true)} action={clientActionQuestions}>
                <Layout>
                    <h5 className="card-header">Features of Your Game, have Fun</h5>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="optionChosenFromSelectTag">Choose where you wanna play</label>
                            <select className="form-select" id="optionChosenFromSelectTag" name="optionFromSelectTag" aria-label="Default select example">
                                {optionsToPlay.map((option) => (
                                    <option value={option.value} key={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        <div className="d-flex justify-content-start">
                            <Link href="/" role="button" className="btn btn-info">Back</Link>
                        </div>
                    </div>
                    {load &&
                    <>
                        <div className="alert alert-success" role="alert">
                            Sorry, due to the database we are using this process can take 20 seconds, user
                        </div>
                        <Loader />
                    </>
                    }
                    {err &&
                        <ErrPressingButton />
                    }
                </Layout>
            </form>
        </section>
    )
};