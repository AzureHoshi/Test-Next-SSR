import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

const columns = [
  { field: 'co_code', headerName: 'Code', width: 120 },
  { field: 'co_fname_th', headerName: 'First Name', width: 150 },
  { field: 'co_lname_th', headerName: 'Last Name', width: 150 },
  { field: 'co_email', headerName: 'Email', width: 300 },
  { field: 'co_tel', headerName: 'Tel', width: 120 },
  { field: 'cur_name_th', headerName: 'Curriculum', width: 300 }
]

export default function Test() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    axios.get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllcollegians').then(response => {
      setRows(response.data.message.Data)
      console.log(response.data.message.Data)
    })
  }, [])

  return (
    <div>
      <DataGrid rows={rows} columns={columns} getRowId={row => row.co_id} />
      <DataGrid rows={rows} columns={columns} getRowId={row => row.co_id} />
      <DataGrid rows={rows} columns={columns} getRowId={row => row.co_id} />
    </div>
  )
}
