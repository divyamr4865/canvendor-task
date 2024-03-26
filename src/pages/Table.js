import { Table, notification, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ModalComp from './ModalComp'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import InputComp from '../components/Inputs';
export default function TableComp() {
    const [rowsData, setRowsData] = useState([])
    const [products, setproducts] = useState([])
    const [filterData, setfilterData] = useState([])
    const [title, setTitle] = useState("")

    const [Modelopen, setModelopen] = useState(false)
    const Columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        }
        , {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        }
        , {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
        }
    ]

    const ModelOpenFun = (data) => {
        setfilterData(data)
        setModelopen(true)
    }


    const GetFun = () => {
        axios({
            method: "GET",
            url: "https://dummyjson.com/products"
        }).then((response) => {
            setRowsData(response.data?.products)
        })
    }
    useEffect(() => {
        GetFun()
    }, [])


    const DeleteFun = (val) => {
        axios({
            method: "DELETE",
            url: `https://dummyjson.com/products/${val.id}`
        }).then((response) => {
            if (response.status === 200) {
                let filterdata = rowsData?.filter((item) => item.id !== val.id)
                setRowsData(filterdata)
                notification.success({
                    message: "Deleted Successfully"
                })
            }
        })
    }




    useEffect(() => {
        let data = []
        rowsData?.map((val, index) => {
            data.push({
                id: index + 1,
                title: val.title,
                brand: val.brand,
                category: val.category,
                price: val.price,
                action: <div className='icons-div'>
                    <EyeOutlined className='view' onClick={() => { ModelOpenFun(val); setTitle("View") }} />
                    <EditOutlined className='edit' onClick={() => { ModelOpenFun(val); setTitle("Edit") }} />
                    <DeleteOutlined className='delete' onClick={() => { setTitle("Delete"); DeleteFun(val) }} />
                </div>
            })
        })
        setproducts(data)
    }, [rowsData])


    const UpdateData = (res) => {
        rowsData.forEach((val, index) => {
            if (val.id === res?.data?.id) {
                Object.keys(res?.data).map((key) => {
                    rowsData[index][key] = res?.data[key]
                })

            }
        })

        setRowsData((prev) => [...prev])

        notification.success({
            message: "Products Edited Successfully"
        })

    }





    return (
        <>

            <div className='table-parent'>
                <div className='serch-cont'>
                    <div>
                        <InputComp type="text" placeholder={"Search...."} /><Button>Search</Button>
                    </div>
                </div>

                <Table columns={Columns} dataSource={products} bordered />
                <ModalComp open={Modelopen} title={title} FilterData={filterData} onClose={() => setModelopen(false)} CallBackFun={(val) => UpdateData(val)} />
            </div>
        </>

    )
}