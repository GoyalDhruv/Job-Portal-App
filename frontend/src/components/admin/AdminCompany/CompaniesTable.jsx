import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
// import { Avatar } from '@radix-ui/react-avatar'
// import { AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent } from '../../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

function CompaniesTable({ companies }) {

    const navigate = useNavigate()
    function formatDate(string) {
        const date = new Date(string);
        return format(date, 'MMMM do, yyyy')
    }

    return (
        <Table>
            <TableCaption>A list of your recent registered companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {companies?.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <img src={item?.logo} className="h-10 w-auto" />
                        </TableCell>
                        <TableCell>{item?.name}</TableCell>
                        <TableCell>{item?.location}</TableCell>
                        <TableCell>{formatDate(item?.createdAt)}</TableCell>
                        <TableCell className='text-right'>
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    <div className='flex gap-2 justify-center items-center w-fit cursor-pointer'
                                        onClick={() => navigate(`/admin/company/edit/${item?._id}`)}
                                    >
                                        <Edit2 className='w-4' />
                                        <span>Edit</span>
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

CompaniesTable.propTypes = {
    companies: PropTypes.arrayOf(PropTypes.object),
}

export default CompaniesTable