"use server"
import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { Prisma } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export const getPlants = async () => {
    try {
        const currentUserId = await getUserId()
        const whereClause: Prisma.PlantWhereInput = {
            userId: currentUserId
        }

        // if (searchTerm) {
        //     whereClause.name = {
        //         contains: searchTerm,
        //         mode: "insensitive"
        //     }
        // }

        const userPlants = await prisma.plant.findMany({
            where: whereClause
        })

        // revalidatePath("/")
        return { success: true, userPlants }
    } catch (error) {
        console.error("Error to fetch plants: ", error)
        throw new Error("Failed to fetch plants")
    }
}


export async function getPlantsById(id: string) {
    const plantById = await prisma.plant.findUnique({
        where: {
            id
        }
    })

    return { success: true, plantById }
}

export async function createPlants(plantsData: Prisma.PlantCreateInput) {
    console.log("Creating plant")
    // console.log(plantsData)
    try {
        const currentUserId = await getUserId()
        if(!currentUserId) return
        const newPlant = await prisma.plant.create({
            data: {
                ...plantsData,
                userId: currentUserId
            }
        })
        revalidatePath("/plants")
        return newPlant
    } catch (error) {
        console.error("Error creating plant", error)
    }

}



export async function editPlant(id: string, data: Prisma.PlantUpdateInput) {
    try {
        const currentUserId = await getUserId()
        const updatePlant = await prisma.plant.update({
            where: {
                id
            }, 
            data: {
                ...data,
                userId: currentUserId
            }
        })
        revalidatePath("/plants")
        return updatePlant
    } catch (error) {
        console.error("Failed to update the plant", error)
    }
}

export async function deletePlant(id: string) {
    try {
        const deletedPlant = await prisma.plant.delete({
            where: {
                id
            }
        })
        revalidatePath("/plants")
        return deletedPlant
    } catch (error) {
        console.error("Error deleting plant: ", error)
    }
}