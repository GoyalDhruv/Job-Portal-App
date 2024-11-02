import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Popover, PopoverContent } from '../../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { updateStatus } from '@/utils/ApplicationApiService'

const ShortListing = {
    Accepted: 'Accepted',
    Rejected: 'Rejected'
};

function ApplicantsTable({ applicants }) {

    function formatDate(string) {
        const date = new Date(string);
        return format(date, 'MMMM do, yyyy')
    }

    async function handleStatus(status, id) {
        const data = {
            status
        }
        try {
            const res = await updateStatus(id, data)
            toast.success(res.data.message);
        } catch (error) {
            console.error('Submit Error:', error);
            toast.error(error.response?.data?.message || 'Submission failed.');
        }
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
                {applicants?.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item?.applicant?.fullName}</TableCell>
                        <TableCell>{item?.applicant?.email}</TableCell>
                        <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                        <TableCell>{
                            item?.applicant?.profile?.resume ?
                                <a href={item?.applicant?.profile?.resume} className='text-blue-600' target='_blank'>{item?.applicant?.profile?.resumeOriginalName}</a> :
                                <span>NA</span>
                        }</TableCell>
                        <TableCell>{formatDate(item?.createdAt)}</TableCell>
                        <TableCell className='text-right'>
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    {/* Example actions */}
                                    <button className="w-full text-left pb-1" onClick={() => handleStatus('Accepted', item?._id)}>Accepted</button>
                                    <button className="w-full text-left pt-1" onClick={() => handleStatus('Rejected', item?._id)}>Rejected</button>
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
    applicants: PropTypes.arrayOf(PropTypes.object),
}

export default ApplicantsTable