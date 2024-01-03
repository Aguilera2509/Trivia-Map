import { VectorMap } from "@react-jvectormap/core";
import { esMill } from "@react-jvectormap/spain";
import { useSearchParams } from "next/navigation";
import { useGettingAllSelectedRegions } from "@/app/hooks/useCustoms";
import { useEffect } from "react";

export default function SpainMap({ setRegion, setLengthOfCountriesToFinishGaming }){
    const routerGetParams = useSearchParams();
    const routerCode  = routerGetParams.get("code");
    const selectedRegions = useGettingAllSelectedRegions(routerCode);
    let styleMap = {"width": "85%", "height": "700px", "margin": "1rem"};

    useEffect(()=>{
        if(Object.keys(esMill.content.paths).length === 0) return;        
        setLengthOfCountriesToFinishGaming(Object.keys(esMill.content.paths).length)
    },[]);

    return(
        <VectorMap map={esMill} series={{
            regions: [{
                scale: ["#E2AEFF", "#5E32CA"],
                values: selectedRegions,
                min: 0,
                max: 100
            }]
        }} style={styleMap} backgroundColor="#345DA7" onRegionClick={(event, code) => {
            setRegion(code);
        }} /*onRegionTipShow={(event, label, code) => {
            return label.html(`
                <div class="card text-bg-dark mb-3" style="max-width: 12rem;">
                    <div class="card-header">${label.html()}</div>
                    <div class="card-body">
                        <p class="card-text">This spot is dominated by *User*</p>
                    </div>
                </div>
                `)
        }}*/ />
    );
};