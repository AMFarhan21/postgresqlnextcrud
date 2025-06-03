"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { ComboBox } from "./ComboBox";
import { Input } from "./ui/input";
import { getPlants } from "@/app/actions/plant.action";
import { useRouter } from "next/navigation";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

export type Plant = Awaited<ReturnType<typeof getPlants>>

interface InventoryTableProps {
    plants: Plant
}



export default function InventoryTable({ plants }: InventoryTableProps) {
    const [selectedCategory, setSelectedCategory] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()

    const filteredPlants = plants.userPlants?.filter((plant) => (
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || plant.category === selectedCategory)
    )).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())


    return plants ? (
        <div className="w-full">
            <div className="flex items-center gap-2 py-4">
                <div className="relative max-w-sm w-full">
                    <Input
                        placeholder="filter plants..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <ComboBox value={selectedCategory} setValue={(val) => setSelectedCategory(val)} />
                <CreateDialog />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Plant ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPlants.map((plant) => {
                        const slugifiedName = plant.name.toLowerCase().replace(/\s+/g, "-")
                        const slug = `${plant.id}--${slugifiedName}`
                        const plantUrl = `/plants/${slug}`

                        return (
                            <TableRow key={plant.id} onClick={() => router.push(`${plantUrl}`)} className="cursor-pointer">
                                <TableCell className="font-medium">{plant.id}</TableCell>
                                <TableCell>{plant.name}</TableCell>
                                <TableCell>{plant.category}</TableCell>
                                <TableCell>{plant.stock}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-5" onClick={(e) => e.stopPropagation()}>
                                        <EditDialog plant={plant} />
                                        <DeleteDialog plantId={plant.id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    ) : (
        <div className="justify-center flex mt-20 font-bold text-4xl font-mono">
            There is no plant here
        </div>
    );
}

