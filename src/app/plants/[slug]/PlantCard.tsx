import { getPlantsById } from "@/app/actions/plant.action";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Sprout } from "lucide-react";
import React from "react";


type Plant = Awaited<ReturnType<typeof getPlantsById>>

interface PlantCardProps {
    plant: Plant
}

const PlantCard = ({plant}: PlantCardProps) => {
   if(!plant.plantById?.name) return <div>This plant doesnt exist</div>

    return (
        <Card className="max-w-6xl shadow-none flex flex-row mx-auto mt-8">
            {
                plant.plantById?.imageUrl ? (
                    <img
                    alt="image"
                    src={plant.plantById?.imageUrl}
                    className="ml-5 w-2xl aspect-auto bg-muted rounded-xl object-cover" />
                ) : (
                    <Sprout className="ml-5 w-full h-full" />
                )
            }

            <div className="w-full">
                <CardHeader className="pt-4 pb-4 px-5 flex-row items-center gap-3 font-semibold">
                    <span className="text-4xl">  {plant.plantById?.name} 🌱 </span>                    
                </CardHeader>

                <CardContent className="space-y-2 px-5">
                    <div className="font-bold text-foreground text-4xl">
                        ${plant.plantById.price}
                    </div>
                    <Button>
                        {plant.plantById?.category}
                    </Button>
                    <p className="text-lg text-muted-foreground">
                        Stock: {plant.plantById?.stock}
                    </p>
                    <p className="text-lg text-foreground">
                        {plant.plantById?.description}
                    </p>
                </CardContent>
            </div>
        </Card>
    );
};

export default PlantCard;
