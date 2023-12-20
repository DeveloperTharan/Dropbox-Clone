import React from 'react'
import DragAndDrop from '@/components/DragAndDrop'
import TableWrapper from '@/components/table/table-wrapper'

export default function Home() {
  return (
    <>
      <DragAndDrop/>
      <div className='mt-14'>
      <TableWrapper/>
      </div>
    </>
  )
}