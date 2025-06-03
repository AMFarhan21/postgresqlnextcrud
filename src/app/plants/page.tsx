"use server"
import InventoryTable from '@/components/InventoryTables'
import { stackServerApp } from '@/stack'
import { SignIn } from '@stackframe/stack'
import React from 'react'
import { getPlants } from '../actions/plant.action'

const page = async () => {
    const user = await stackServerApp.getUser()
    // const app = stackServerApp.urls
    const plants = await getPlants()
    // console.log(plants)
    return (
        <div>
            {
                user ? (
                    <div className='max-w-7xl mx-auto mt-7'>
                        <InventoryTable plants={plants} />
                    </div>
                ) : (
                    <div className='flex justify-center mt-20'>

                        <SignIn />
                    </div>

                )
            }
        </div>
    )
}

export default page