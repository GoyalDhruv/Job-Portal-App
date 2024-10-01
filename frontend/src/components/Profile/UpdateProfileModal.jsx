import React, { useState } from 'react'
import { Dialog, DialogFooter, DialogHeader } from '../ui/dialog'
import PropTypes from 'prop-types';
import { DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';

function UpdateProfileModal({ openModal, setOpenModal, user, updateProfile }) {


    const [fullName, setFullName] = useState(user?.fullName);
    // const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [bio, setBio] = useState(user?.profile?.bio);
    
    const userskills = user?.profile?.skills.join(',')
    const [skills, setSkills] = useState(userskills);
    // const [resume, setIsResume] = useState('');
    const [loading, setLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updateProfile) {
            const formData = {
                fullName,
                phoneNumber,
                bio,
                skills,
                // resume
            }
            try {
                setLoading(true)
                const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                )
                if (res.data.success) {
                    dispatch(setUser(res.data.user))
                    toast.success(res.data.message)
                    setOpenModal(false)
                }
            } catch (error) {
                toast.error(error.response.data.message)
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }
        else {
            const formData = {
                currentPassword,
                newPassword,
                confirmPassword,
            }
            try {
                setLoading(true)
                const res = await axios.post(`${USER_API_END_POINT}/changePassword`, formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                )
                if (res.data.success) {
                    dispatch(setUser(res.data.user))
                    toast.success(res.data.message)
                    setOpenModal(false)
                }
            } catch (error) {
                toast.error(error.response.data.message)
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }
    }

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal} >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{updateProfile ? 'Update Profile' : 'Change Password'}</DialogTitle>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='grid gap-4 py-4'>
                            {
                                updateProfile ?
                                    <>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label htmlFor='fullName'>Full Name</Label>
                                            <Input
                                                type='text'
                                                id='fullName'
                                                className='col-span-3'
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </div>
                                        {/* <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label htmlFor='email'>Email</Label>
                                            <Input
                                                type='email'
                                                id='email'
                                                className='col-span-3'
                                                name={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div> */}
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label htmlFor='phoneNumber'>Phone Number</Label>
                                            <Input
                                                type="tel"
                                                id='phoneNumber'
                                                className='col-span-3'
                                                name={phoneNumber}
                                                maxLength="10"
                                                value={phoneNumber}
                                                pattern="^\d{10}$"
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label htmlFor='bio'>Bio</Label>
                                            <Input
                                                type="text"
                                                id='bio'
                                                className='col-span-3'
                                                name={bio}
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                            />
                                        </div>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label htmlFor='skills'>Skills</Label>
                                            <Input
                                                type="text"
                                                id='skills'
                                                className='col-span-3'
                                                name={skills}
                                                value={skills}
                                                onChange={(e) => setSkills(e.target.value)}
                                            />
                                        </div>
                                        {/* <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label htmlFor='resume'>Resume</Label>
                                            <Input
                                                type='file'
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => setIsResume(e.target.files[0])}
                                                id='resume'
                                                className='col-span-3'
                                                name={resume}
                                            />
                                        </div> */}
                                    </>
                                    :
                                    <>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label htmlFor='currentPassword'>Current Password</Label>
                                            <Input
                                                type="password"
                                                id='currentPassword'
                                                className='col-span-3'
                                                name={currentPassword}
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label htmlFor='newPassword'>New Password</Label>
                                            <Input
                                                type="password"
                                                id='newPassword'
                                                className='col-span-3'
                                                name={newPassword}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <Label htmlFor='confirmPassword'>Confirm Password</Label>
                                            <Input
                                                type="password"
                                                id='confirmPassword'
                                                className='col-span-3'
                                                name={confirmPassword}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                    </>
                            }
                        </div>
                        <DialogFooter>
                            {
                                loading ?
                                    <Button className='w-full my-4'><Loader2 className='mr-2 w-4 h-4 animate-spin' />Please Wait</Button>
                                    :
                                    <Button type='submit' className='w-full my-4'>
                                        Update
                                    </Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

UpdateProfileModal.propTypes = {
    openModal: PropTypes.bool.isRequired,
    setOpenModal: PropTypes.func.isRequired,
    user: PropTypes.object,
    updateProfile: PropTypes.bool.isRequired,
};

export default UpdateProfileModal