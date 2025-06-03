import React from 'react'
import PlantCard from './PlantCard'
import { getPlantsById } from '@/app/actions/plant.action'
import { stackServerApp } from '@/stack'
import { SignIn } from '@stackframe/stack'

export async function generateMetadata({params}: {params: {slug: string}}) {
    const [id] = params.slug.split("--")
    const plant = await getPlantsById(id)

    return {
        title: plant ? plant.plantById?.name : "Plant Details",
        description: plant ? plant.plantById?.description : "Plant Details Descriptions"
    }
}

const page = async({params}: {params: {slug: string}}) => {
    const user = await stackServerApp.getUser()
    const [id] = params.slug.split("--")
    const plant = await getPlantsById(id)

    if(!user) return <div className='flex justify-center mt-20'><SignIn /></div>

    return (
        <div>
            <PlantCard plant={plant} />
        </div>
    )
}

export default page