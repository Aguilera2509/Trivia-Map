import { useSearchParams } from "next/navigation";
import { useGettingPlaceToPlay } from "../hooks/useCustoms";
import dynamic from "next/dynamic";

const AfricaMap = dynamic(() => import("./maps/africaMap"));
const AlgeriaMap = dynamic(() => import("./maps/algeriaMap"));
const ArgentinaMap = dynamic(() => import("./maps/argentinaMap"));
const AsiaMap = dynamic(() => import("./maps/asiaMap"));
const AustraliaMap = dynamic(() => import("./maps/australiaMap"));
const AustriaMap = dynamic(() => import("./maps/austriaMap"));
const BelgiumMap = dynamic(() => import("./maps/belgiumMap"));
const BrazilMap = dynamic(() => import("./maps/brazilMap"));
const CanadaMap = dynamic(() => import("./maps/canadaMap"));
const ChicagoMap = dynamic(() => import("./maps/chicagoMap"));
const ChinaMap = dynamic(() => import("./maps/chinaMap"));
const ColombiaMap = dynamic(() => import("./maps/colombiaMap"));
const DenmarkMap = dynamic(() => import("./maps/denmarkMap"));
const EuropeMap = dynamic(() => import("./maps/europeMap"));
const FranceMap = dynamic(() => import("./maps/franceMap"));
const FranceRegionsMap = dynamic(() => import("./maps/franceRegionsMap"));
const FrancePastRegionsMap = dynamic(() => import("./maps/francePastRegionsMap"));
const GermanyMap = dynamic(() => import("./maps/germanyMap"));
const IndiaMap = dynamic(() => import("./maps/indiaMap"));
const IranMap = dynamic(() => import("./maps/iranMap"));
const ItalyMap = dynamic(() => import("./maps/italyMap"));
const ItalyRegionsMap = dynamic(() => import("./maps/italyRegionsMap"));
const NetherlandsMap = dynamic(() => import("./maps/netherlandsMap"));
const NewYorkMap = dynamic(() => import("./maps/newYorkMap"));
const NewZilandMap = dynamic(() => import("./maps/newZilandMap"));
const NorthAmericaMap = dynamic(() => import("./maps/northAmericaMap"));
const NorwayMap = dynamic(() => import("./maps/norwayMap"));
const OceaniaMap = dynamic(() => import("./maps/oceaniaMap"));
const PolandMap = dynamic(() => import("./maps/polandMap"));
const PortugalMap = dynamic(() => import("./maps/portugalMap"));
const RussiaMap = dynamic(() => import("./maps/russiaMap"));
const RussiaDistrictsMap = dynamic(() => import("./maps/russiaDistrictsMap"));
const SouthAfricaMap = dynamic(() => import("./maps/southAfricaMap"));
const SouthAmericaMap = dynamic(() => import("./maps/southAmericaMap"));
const SouthKoreaMap = dynamic(() => import("./maps/southKoreaMap"));
const SpainMap = dynamic(() => import("./maps/spainMap"));
const SwedenMap = dynamic(() => import("./maps/swedenMap"));
const SwitzerlandMap = dynamic(() => import("./maps/switzerlandMap"));
const ThailandMap = dynamic(() => import("./maps/thailandMap"));
const TurkeyMap = dynamic(() => import("./maps/turkeyMap"));
const UkRegionsMap = dynamic(() => import("./maps/ukRegionsMap"));
const UnitedKingdomCountriesMap = dynamic(() => import("./maps/unitedKingdomCountriesMap"));
const UnitedStatesMap = dynamic(() => import("./maps/unitedStatesMap"));
const VenezuelaMap = dynamic(() => import("./maps/venezuelaMap"));
const WholeWorldMap = dynamic(() => import("./maps/wholeWorldMap"));

export default function WorldMap({ setRegion, setLengthOfCountriesToFinishGaming }){
    const routerGetParams = useSearchParams();
    const routerCode  = routerGetParams.get("code");
    const map = useGettingPlaceToPlay(routerCode);

    if(map === "africaMill"){
        return <AfricaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    };

    if(map === "dzMill"){
        return <AlgeriaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    };

    if(map === "arMill"){
        return <ArgentinaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} /> 
    };

    if(map === "asiaMill"){
        return <AsiaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "auMill"){
        return <AustraliaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "atMill"){
        return <AustriaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "beMill"){
        return <BelgiumMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "brMill"){
        return <BrazilMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "caMill"){
        return <CanadaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "usIlChicagoMill"){
        return <ChicagoMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "cnMill"){
        return <ChinaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "coMill"){
        return <ColombiaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "dkMill"){
        return <DenmarkMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "europeMill"){
        return <EuropeMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "frMill"){
        return <FranceMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "frRegionsMill"){
        return <FranceRegionsMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "frRegions_2016Mill"){
        return <FrancePastRegionsMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "deMill"){
        return <GermanyMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "inMill"){
        return <IndiaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "iranMill"){
        return <IranMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "itMill"){
        return <ItalyMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "itRegionsMill"){
        return <ItalyRegionsMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "nlMill"){
        return <NetherlandsMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "usNyNewYorkMill"){
        return <NewYorkMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "nzMill"){
        return <NewZilandMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "northAmericaMill"){
        return <NorthAmericaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "noMill"){
        return <NorwayMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "oceaniaMill"){
        return <OceaniaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "plMill"){
        return <PolandMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "ptMill"){
        return <PortugalMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "ruMill"){
        return <RussiaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "ruFdMill"){
        return <RussiaDistrictsMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "zaMill"){
        return <SouthAfricaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "southAmericaMill"){
        return <SouthAmericaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "krMill"){
        return <SouthKoreaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "esMill"){
        return <SpainMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "seMill"){
        return <SwedenMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "chMill"){
        return <SwitzerlandMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "thMill"){
        return <ThailandMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "trMill"){
        return <TurkeyMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "ukRegionsMill"){
        return <UkRegionsMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "ukCountriesMill"){
        return <UnitedKingdomCountriesMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "usMill"){
        return <UnitedStatesMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "veMill"){
        return <VenezuelaMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }

    if(map === "worldMill"){
        return <WholeWorldMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
    }
};