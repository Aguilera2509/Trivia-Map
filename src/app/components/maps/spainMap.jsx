import { VectorMap } from "@react-jvectormap/core";
import { esMill } from "@react-jvectormap/spain";
import { useSearchParams } from "next/navigation";
import { useGettingAllSelected, useGettingAllSelectedRegions } from "@/app/hooks/useCustoms";
import React, { useEffect } from "react";

export default function SpainMap({ setRegion, setLengthOfCountriesToFinishGaming }){
    const routerGetParams = useSearchParams();
    const routerCode  = routerGetParams.get("code");
    const selectedRegions = useGettingAllSelectedRegions(routerCode);
    //let test = useGettingAllSelected(routerCode); //Super Test
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
        }} />
    );
};


//${Object.keys(test)[Object.values(test).findIndex(el => el === Object.values(selectedRegions)[Object.keys(selectedRegions).findIndex(el => el === code)])]}

/*onRegionTipShow={function reginalTip(event, label, code){
            return label.html(`
            <div class="card text-bg-dark mb-3" style="max-width: 18rem;">
            <div class="card-header">${label.html()}</div>
            <div class="card-body">
            <p class="card-text">Conquered by ${Object.keys(test)[Object.values(test).findIndex(el => el === Object.values(selectedRegions)[Object.keys(selectedRegions).findIndex(el => el === code)])]}</p>
            </div>
            </div>`);
        }}*/

        /*labels={{ 
                regions:{
                    render: function(code) {
                    return test[code] ? `${test[code]}` : "";
                }}
            }}
*/