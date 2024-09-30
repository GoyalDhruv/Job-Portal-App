import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { clearUser, setLoading } from '@/redux/authSlice'
import { toast } from 'sonner'

function Navbar() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            dispatch(setLoading(true));

            const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, {
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(clearUser());
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed. Please try again.");
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <Link to='/'>
                    <h1 className='text-2xl font-bold'>Job
                        <span className='text-[#F83002]'>Portal</span>
                    </h1>
                </Link>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/jobs'>Jobs</Link></li>
                        <li><Link to='/browse'>Browse</Link></li>
                    </ul>
                    {
                        user ? (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar>
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn" className='cursor-pointer' />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar>
                                            <AvatarImage
                                                src="https://github.com/shadcn.png"
                                                alt="@shadcn" className='cursor-pointer' />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>User</h4>
                                            <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant='link'>
                                                <Link to='/profile'>
                                                    View Profile
                                                </Link>
                                            </Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button variant='link' onClick={handleLogout}>
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <Link to='/login'>
                                    <Button variant='outline'>Login</Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button>Sign Up</Button>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default Navbar;
