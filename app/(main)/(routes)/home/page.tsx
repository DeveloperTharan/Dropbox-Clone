import React from 'react'
import DragAndDrop from './_components/DragAndDrop'
import FilesList from './_components/FilesList'

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