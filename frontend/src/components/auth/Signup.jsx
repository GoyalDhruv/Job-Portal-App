import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

function Signup() {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Student')
    const [profilePhoto, setProfilePhoto] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            fullName,
            email,
            phoneNumber,
            password,
            role,
            profilePhoto
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (error) {
            if (error.response.data.message === 'Email already exists.') {
                toast.error(error.response.data.message)
            }
            console.error(error)
        }
    }

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={fullName}
                            name='fullName'
                            placeholder="John Doe"
                            required
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            name='email'
                            placeholder="john@gmail.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={phoneNumber}
                            name='phoneNumber'
                            placeholder="987654321"
                            maxLength="10"
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={password}
                            name='password'
                            placeholder="********"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center justify-between gap-10 mt-5 mb-2'>
                        <RadioGroup
                            className='flex items-center gap-4'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    id="student"
                                    value="Student"
                                />
                                <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    id="recruiter"
                                    value="Recruiter"
                                />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                type="file"
                                name="profile"
                                accept="image/*"
                                className='cursor-pointer'
                                onChange={(e) => setProfilePhoto(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <Button type='submit' className='w-full my-4'>
                        Signup
                    </Button>
                    <span className='text-sm'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link> </span>
                </form>
            </div>
        </>
    )
}

export default Signup