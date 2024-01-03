import { VectorMap } from "@react-jvectormap/core";
import { frRegions_2016Mill } from "@react-jvectormap/franceregions2016";
import { useSearchParams } from "next/navigation";
import { useGettingAllSelectedRegions } from "@/app/hooks/useCustoms";
import { useEffect } from "react";

export default function FrancePastRegionsMap({ setRegion, setLengthOfCountriesToFinishGaming }){
    const routerGetParams = useSearchParams();
    const routerCode  = routerGetParams.get("code");
    const selectedRegions = useGettingAllSelectedRegions(routerCode);
    let styleMap = {"width": "85%", "height": "700px", "margin": "1rem"};

    useEffect(()=>{
        if(Object.keys(frRegions_2016Mill.content.paths).length === 0) return;        
        setLengthOfCountriesToFinishGaming(Object.keys(frRegions_2016Mill.content.paths).length)
    },[]);

    return(
        <VectorMap map={frRegions_2016Mill} series={{
            regions: [{
                scale: ["#E2AEFF", "#5E32CA"],
                values: selectedRegions,
                min: 0,
                max: 100
            }]
        }} style={styleMap} backgroundColor="#345DA7" onRegionClick={(event, code) => {
            setRegion(code);
        }} />
    );
};