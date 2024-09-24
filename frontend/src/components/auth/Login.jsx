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
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Student')

    const navigate = useNavigate()
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email,
            password,
            role,
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, formData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/')
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.error(error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
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
                    </div>
                    {
                        loading ?
                            <Button className='w-full my-4'><Loader2 className='mr-2 w-4 h-4 animate-spin' />Please Wait</Button>
                            :
                            <Button type='submit' className='w-full my-4'>
                                Login
                            </Button>
                    }
                    <span className='text-sm'>Don't have an account? <Link to='/signup' className='text-blue-600'>Signup</Link> </span>
                </form>
            </div>
        </>
    )
}

export default Login