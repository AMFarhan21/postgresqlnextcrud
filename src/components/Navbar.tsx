import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Home, LogIn, LogOut, Sprout } from 'lucide-react'
import { ModeToggle } from './ModeToggle'
import { stackServerApp } from '@/stack'
import { getUserDetails } from '@/app/actions/user.action'
import { UserButton } from '@stackframe/stack'

const Navbar = async () => {

    const user = await stackServerApp.getUser()
    const app = stackServerApp.urls
    const userProfile = await getUserDetails(user?.id)

    return (
        <nav className='sticky top-0 w-full border-b z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <Link className='text-xl font-bold text-primary font-mono tracking-wider' href={"/"}>
                        🌱 PlantInventory
                    </Link>
                    {/* Navbar components */}
                    <div className='hidden sm:flex items-center space-x-4'>
                        <Button variant="ghost" className='flex items-center gap-2' asChild>
                            <Link href={"/plants"}>
                                <Sprout className='w-6 h-6' />
                                <span className='hidden lg:inline'>Plant</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" className='flex items-center gap-2' asChild>
                            <Link href={"/"}>
                                <Home className='w-6 h-6' />
                                <span className='hidden lg:inline'>Home</span>
                            </Link>
                        </Button>
                        <ModeToggle />

                        {/* Sign in button */}
                        {
                            userProfile ? (
                                <>
                                    <Button variant="ghost" asChild>
                                        <Link
                                            href={app.signOut}
                                            className="text-[11px]  hover:no-underline"
                                        >
                                            <LogOut className="w-6 h-6" />
                                            <span className='hidden lg:inline'>
                                                Sign Out
                                            </span>
                                        </Link>
                                    </Button>
                                    <UserButton />
                                </>
                            ) : (
                                <Button variant="outline" className='flex items-center gap-2' asChild>
                                    <Link href={app.signIn}>
                                        <LogIn className='w-6 h-6' />
                                        <span className='hidden lg:inline'>Sign In</span>
                                    </Link>
                                </Button>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar