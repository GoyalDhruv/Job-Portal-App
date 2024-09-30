import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileModal from './UpdateProfileModal'

const skills = ['Html', 'CSS', 'JavaScript', 'ReactJS']

function Profile() {
    const [openModal, setOpenModal] = useState(false)
    const [isResume, setIsResume] = useState(true)

    return (
        <>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src='https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg' />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>Name</h1>
                            <p>Add your bio</p>
                        </div>
                    </div>
                    <Button
                        className='text-right'
                        variant='outline'
                        onClick={() => { setOpenModal(true) }}
                    >
                        <Pen />
                    </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail /><span>user@gmail.com</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact /><span>Phone Number</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            skills.length ? skills.map((item, index) => (
                                <Badge key={index}>{item}</Badge>
                            ))
                                : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {isResume ?
                        <a target='blank' href='https://github.com/' className='text-blue-500 w-full hover:underline cursor-pointer'>Github</a>
                        : <span>NA</span>
                    }
                </div>

            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl my-5'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileModal openModal={openModal} setOpenModal={setOpenModal} />
            <Footer />
        </>
    )
}

export default Profile