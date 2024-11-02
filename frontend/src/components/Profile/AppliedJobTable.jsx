import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import PropTypes from 'prop-types';
import { format } from 'date-fns'

function AppliedJobTable({ appliedJobs }) {

    function formatDate(string) {
        const date = new Date(string);
        return format(date, 'MMMM do, yyyy')
    }

    return (
        <Table>
            <TableCaption>A list of your applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    appliedJobs?.length < 1 ? <span>You haven't applied to any job yet.</span>
                        :
                        appliedJobs.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{formatDate(item?.createdAt)}</TableCell>
                                <TableCell>{item?.job?.title}</TableCell>
                                <TableCell>{item?.job?.company?.name}</TableCell>
                                <TableCell className='text-right'><Badge className={`${item?.status === 'Rejected' ? 'bg-red-400' : item?.status === 'Pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{item?.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                }
            </TableBody>
        </Table>
    )
}

AppliedJobTable.propTypes = {
    appliedJobs: PropTypes.array.isRequired
}

export default AppliedJobTable