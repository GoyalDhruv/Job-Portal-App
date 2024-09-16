import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Signup() {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form className='w-1/2 border border-gray-200 rounded rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={fullName}
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
                            placeholder="********"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center justify-between gap-10 mt-5 mb-2'>
                        <RadioGroup className='flex items-center gap-4' defaultValue="Student">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Student" id="r1" />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Recruiter" id="r2" />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                className='cursor-pointer'
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