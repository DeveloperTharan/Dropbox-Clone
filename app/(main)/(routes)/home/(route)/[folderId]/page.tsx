import React from 'react'
import DragAndDrop from '@/components/DragAndDrop'
import FilesList from '@/components/FilesList'

function FolderId() {
  return (
    <>
    <DragAndDrop/>
    <div className='mt-14'>
      <FilesList/>
    </div>
  </>
  )
}

export default FolderId