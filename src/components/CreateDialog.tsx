"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ComboBox } from "./ComboBox";
import { Textarea } from "./ui/textarea";
import { createPlants } from "@/app/actions/plant.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

export default function CreateDialog() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        stock: 1,
        price: 1,
        category: "",
        userId: "",
        imageUrl: ""
    })

    const handleChange = (field: string, value: string | number) => {
        console.log(`Field changed: ${field}, New Value ${value}`)
        setFormData({ ...formData, [field]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const newPlant = await createPlants(formData)
            console.log("Plant created: ", newPlant)
            toast.success("Plant created successfully")

        } catch (error) {
            console.error("Error adding client: ", error)
            toast.error("Failed to create plant")
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="default" className="font-semibold ml-auto">
                    <Sprout className="w-6 h-6" />
                    Add Plant
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add a Plant</AlertDialogTitle>
                        <AlertDialogDescription className="text-[15px]">
                            Fill out the form below to add a new plant to your inventory.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="mb-2 ml-1">Name</Label>
                            <Input required id="name" type="text" placeholder="Enter plant name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="category" className="mb-2 ml-1">Category</Label>
                            <ComboBox value={formData.category} setValue={(val) => handleChange("category", val as string)} />
                        </div>
                        <div>
                            <Label htmlFor="description" className="mb-2 ml-1">Description</Label>
                            <Textarea id="description" placeholder="Enter plant description" rows={5} value={formData.description} onChange={(e) => handleChange("description", e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="stock" className="mb-2 ml-1">Stock</Label>
                            <Input required id="stock" type="number" placeholder="Enter plant stock" value={formData.stock} onChange={(e) => handleChange("stock", e.target.valueAsNumber)} />
                        </div>
                        <div>
                            <Label htmlFor="price" className="mb-2 ml-1">Price</Label>
                            <Input id="price" type="number" placeholder="Enter plant price" value={formData.price} onChange={(e) => handleChange("price", e.target.valueAsNumber)} />
                        </div>
                        <div className="w-60 px-5">
                            <ImageUpload
                                endpoint="postImage"
                                onChange={(url) => handleChange("imageUrl", url)}
                                value={formData.imageUrl}
                            />
                        </div>
                    </div>

                    <AlertDialogFooter className="mt-[-35px]">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">Submit</AlertDialogAction>
                    </AlertDialogFooter>

                </form>
            </AlertDialogContent >
        </AlertDialog >
    );
}
