import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
// import { Avatar } from '@radix-ui/react-avatar'
// import { AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent } from '../../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

function ApplicantsTable({ jobs }) {

    const navigate = useNavigate()
    function formatDate(string) {
        const date = new Date(string);
        return format(date, 'MMMM do, yyyy')
    }

    return (
        <Table>
            <TableCaption>A list of all applicants</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobs?.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item?.company?.name}</TableCell>
                        <TableCell>{item?.title}</TableCell>
                        <TableCell>{formatDate(item?.createdAt)}</TableCell>
                        <TableCell className='text-right'>
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    <div className='flex gap-2 justify-center items-center w-fit cursor-pointer'
                                        onClick={() => navigate(`/admin/job/edit/${item?._id}`)}
                                    >
                                        <Edit2 className='w-4' />
                                        <span>Edit</span>
                                    </div>
                                    <div className='flex gap-2 justify-center items-center w-fit cursor-pointer'
                                        onClick={() => navigate(`/admin/job/applicants/${item?._id}`)}
                                    >
                                        <Eye className='w-4' />
                                        <span>Applicants</span>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

ApplicantsTable.propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.object),
}

export default ApplicantsTable