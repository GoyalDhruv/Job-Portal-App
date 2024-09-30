import React, { useState } from 'react'
import { Dialog, DialogFooter, DialogHeader } from '../ui/dialog'
import PropTypes from 'prop-types';
import { DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

function UpdateProfileModal({ openModal, setOpenModal }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState('');
    const [resume, setIsResume] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <form>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name'>Name</Label>
                                <Input
                                    type='text'
                                    id='name'
                                    className='col-span-3'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    type='email'
                                    id='email'
                                    className='col-span-3'
                                    name={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='phoneNumber'>Phone Number</Label>
                                <Input
                                    type="tel"
                                    id='phoneNumber'
                                    className='col-span-3'
                                    name={phoneNumber}
                                    maxLength="10"
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
                                    onChange={(e) => setSkills(e.target.value)}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='resume'>Resume</Label>
                                <Input
                                    type='file'
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setIsResume(e.target.files[0])}
                                    id='resume'
                                    className='col-span-3'
                                    name={resume}
                                />
                            </div>
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
};

export default UpdateProfileModal