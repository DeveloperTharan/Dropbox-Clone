import DragAndDrop from '@/components/DragAndDrop'
import FilesList from '@/components/FilesList'
import React from 'react'

export default function Home() {
  return (
    <>
      <DragAndDrop/>
      <div className='mt-14'>
        <FilesList/>
      </div>
    </>
  )
}