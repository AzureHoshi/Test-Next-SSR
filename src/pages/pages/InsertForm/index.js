import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { GetServerSideProps } from 'next'

const columns = [
  { field: 'co_code', headerName: 'Code', width: 120 },
  { field: 'co_fname_th', headerName: 'First Name', width: 150 },
  { field: 'co_lname_th', headerName: 'Last Name', width: 150 },
  { field: 'co_email', headerName: 'Email', width: 300 },
  { field: 'co_tel', headerName: 'Tel', width: 120 },
  { field: 'cur_name_th', headerName: 'Curriculum', width: 300 },
  {
    headerName: 'Edit',
    width: 300,
    renderCell: cellValues => (
      <Button
        variant='text'
        onClick={() => {
          console.log(cellValues.row)
        }}
      >
        ...
      </Button>
    )
  }
]

function InsertForm({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  return (
    <div>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={row => row.co_id}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } }
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  )
}

export default InsertForm

export async function getServerSideProps(context) {
  // ดึงข้อมูลจากแหล่งข้อมูลภายนอก
  const data = await fetch('http://192.168.1.168:8000/api/method/frappe.help-api.getAllcollegians')
  const jsonData = await data.json()

  // ส่งข้อมูลกลับเพื่อนำไปใช้ในส่วนของเนื้อหาหน้าเว็บ
  return {
    props: {
      data: jsonData.message.Data
    }
  }
}
