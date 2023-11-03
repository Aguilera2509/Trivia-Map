import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useSearchParams } from "next/navigation";
import { useGettingAllSelectedRegions } from "../hooks/useCustoms";

export default function WorldMap({ setRegion }){
    const routerGetParams = useSearchParams();
    const routerCode  = routerGetParams.get("code");
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
            setRegion(code);
        }} />
    );
};