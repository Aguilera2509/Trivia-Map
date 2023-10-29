import Image from "next/image";

export function Loader(){
    return(
        <div className="text-center">
            <Image
                src="/rings.svg"
                width={90}
                height={85}
                alt="Loading..."
                className="text-center"
            />
        </div>
    );
};