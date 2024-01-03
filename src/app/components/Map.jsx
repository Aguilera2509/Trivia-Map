import { useSearchParams } from "next/navigation";
import { useGettingPlaceToPlay } from "../hooks/useCustoms";

import AfricaMap from "./maps/africaMap";
import AlgeriaMap from "./maps/algeriaMap";
import ArgentinaMap from "./maps/argentinaMap";
import AsiaMap from "./maps/asiaMap";
import AustraliaMap from "./maps/australiaMap";
import AustriaMap from "./maps/austriaMap";
import BelgiumMap from "./maps/belgiumMap";
import BrazilMap from "./maps/brazilMap";
import CanadaMap from "./maps/canadaMap";
import ChicagoMap from "./maps/chicagoMap";
import ChinaMap from "./maps/chinaMap";
import ColombiaMap from "./maps/colombiaMap";
import DenmarkMap from "./maps/denmarkMap";
import EuropeMap from "./maps/europeMap";
import FranceMap from "./maps/franceMap";
import FranceRegionsMap from "./maps/franceRegionsMap";
import FrancePastRegionsMap from "./maps/francePastRegionsMap";
import GermanyMap from "./maps/germanyMap";
import IndiaMap from "./maps/indiaMap";
import IranMap from "./maps/iranMap";
import ItalyMap from "./maps/italyMap";
import ItalyRegionsMap from "./maps/italyRegionsMap";
import NetherlandsMap from "./maps/netherlandsMap";
import NewYorkMap from "./maps/newYorkMap";
import NewZilandMap from "./maps/newZilandMap";
import NorthAmericaMap from "./maps/northAmericaMap";
import NorwayMap from "./maps/norwayMap";
import OceaniaMap from "./maps/oceaniaMap";
import PolandMap from "./maps/polandMap";
import PortugalMap from "./maps/portugalMap";
import RussiaMap from "./maps/russiaMap";
import RussiaDistrictsMap from "./maps/russiaDistrictsMap";
import SouthAfricaMap from "./maps/southAfricaMap";
import SouthAmericaMap from "./maps/southAmericaMap";
import SouthKoreaMap from "./maps/southKoreaMap";
import SpainMap from "./maps/spainMap";
import SwedenMap from "./maps/swedenMap";
import SwitzerlandMap from "./maps/switzerlandMap";
import ThailandMap from "./maps/thailandMap";
import TurkeyMap from "./maps/turkeyMap";
import UkRegionsMap from "./maps/ukRegionsMap";
import UnitedKingdomCountriesMap from "./maps/unitedKingdomCountriesMap";
import UnitedStatesMap from "./maps/unitedStatesMap";
import VenezuelaMap from "./maps/venezuelaMap";
import WholeWorldMap from "./maps/wholeWorldMap";

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