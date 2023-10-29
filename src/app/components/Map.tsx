import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useSearchParams } from "next/navigation";
import { useGettingAllSelectedRegions } from "../hooks/useCustoms";
import { TComponentMap } from "../lib/types";

export const WorldMap = ({ setRegion, timeQuestions }:TComponentMap) => {
    const routerGetParams = useSearchParams();
    const routerCode:string  = routerGetParams.get("code") as string;
    const selectedRegions = useGettingAllSelectedRegions(routerCode);

    return(
        <VectorMap map={worldMill} series={{
            regions: [{
                scale: ["#E2AEFF", "#5E32CA"],
                values: selectedRegions,
                min: 0,
                max: 100
            }]
        }} style={{
            "width": "85%",
            "height": "700px",
            "margin": "1rem"
        }} 
        onRegionClick={(event, code) => {
            if(timeQuestions) return;
            setRegion(code);
        }} />
    );
};