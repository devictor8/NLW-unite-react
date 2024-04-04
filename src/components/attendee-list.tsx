import { Search, MoreHorizontal, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { IconButton } from './icon-button';
import { Table } from './table/table';
import { TableHeader } from './table/table-header';
import { TableCell } from './table/table-cell';
import { TableRow } from './table/table-row';
import { ChangeEvent, useState } from 'react';
import { attendees } from './data/attendees';

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList () {
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  
  const TotalPages = Math.ceil(attendees.length / 10)

  const onSearchInputChanged = (event:ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
  }

  const goToNextPage = () => {
    setPage(page + 1)
  }

  const goToPreviousPage = () => {
    setPage(page - 1)
  }

  const goToLastPage = () => {
    setPage(TotalPages)
  }

  const goToFirstPage = () => {
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
          <Search className='size-4 text-emerald-300' />
          <input
            onChange={onSearchInputChanged}
            placeholder="Buscar participantes..."
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"/>
        </div>
      </div>
      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{width: 48}}>
              <input type="checkbox" className="size-4 bg-black/20 rounded border-white/10" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{width: 64}}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
          return <TableRow key={attendee.id}>
            <TableCell>
              <input type="checkbox" className="size-4 bg-black/20 rounded border-white/10" />
            </TableCell>
            <TableCell>{attendee.id}</TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-white">{attendee.name}</span>
                <span>{attendee.email}</span>
              </div>
            </TableCell>
            <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
            <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
            <TableCell>
              <IconButton transparent={true}>
                <MoreHorizontal className='size-4' /> 
              </IconButton>
            </TableCell>
          </TableRow>
          })}
        </tbody>
        <tfoot>
          <TableCell colSpan={3}>
            Mostrando 10 de {attendees.length} itens
          </TableCell>
          <TableCell className="text-right" colSpan={3}>
            <div className="inline-flex items-center gap-8">
              <span>página {page} de {TotalPages}</span>
              <div className="flex gap-1.5">
                <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className='size-4' />
                </IconButton>
                <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className='size-4' />
                </IconButton>
                <IconButton onClick={goToNextPage} disabled={page === TotalPages}>
                    <ChevronRight className='size-4' />
                </IconButton>
                <IconButton onClick={goToLastPage} disabled={page === TotalPages}>
                    <ChevronsRight className='size-4' />
                </IconButton>
              </div>
            </div>
          </TableCell>
        </tfoot>
      </Table>
    </div>
  );
}