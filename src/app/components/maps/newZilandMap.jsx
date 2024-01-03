import { VectorMap } from "@react-jvectormap/core";
import { nzMill } from "@react-jvectormap/newziland";
import { useSearchParams } from "next/navigation";
import { useGettingAllSelectedRegions } from "@/app/hooks/useCustoms";
import { useEffect } from "react";

export default function NewZilandMap({ setRegion, setLengthOfCountriesToFinishGaming  }){
    const routerGetParams = useSearchParams();
    const routerCode  = routerGetParams.get("code");
    const selectedRegions = useGettingAllSelectedRegions(routerCode);
    let styleMap = {"width": "85%", "height": "700px", "margin": "1rem"};

    useEffect(()=>{
        if(Object.keys(nzMill.content.paths).length === 0) return;        
        setLengthOfCountriesToFinishGaming(Object.keys(nzMill.content.paths).length)
    },[]);

    return(
        <VectorMap map={nzMill} series={{
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