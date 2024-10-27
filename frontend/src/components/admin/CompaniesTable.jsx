import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'

function CompaniesTable() {
    return (
        <Table>
            <TableCaption>A list of your recent registered companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[1, 2, 3, 4].map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage />
                            </Avatar>
                        </TableCell>
                        <TableCell>Company Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell className='text-right'>
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    <div className='flex gap-2 justify-center items-center w-fit'>
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

export default CompaniesTable