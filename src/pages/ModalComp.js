import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { Button, Input } from "antd";
import axios from 'axios'
import InputComp from '../components/Inputs';
export default function ModalComp(props) {

    const [enable,setenable]=useState(false)
    const [state, setStates] = useState({
        title: "",
        brand: "",
        category: "",
        price: "",
    })
    useEffect(() => {
        
        Object.keys(state).map((key) => {
            state[key] = props?.FilterData?.[key]
        })
        setStates((prev)=>({
            ...prev,
        }))
    }, [props.FilterData])

    useEffect(()=>{
        if(props.title==="View"){
        setenable(true)
        }else{
            setenable(false)
        }
    },[props.title])

    const OnChangeData=(data,key)=>{
        setStates((prev)=>({
            ...prev,
            [key]:data.target.value
        }))
    }

   

    const UpdateApi=()=>{
        axios({
            method: "PUT",
            url: `https://dummyjson.com/products/${props?.FilterData?.id}`,
            data:{
                title:state.title,
                brand:state.brand,
                category:state.category,
                price:state.price
            }
        }).then((response) => {
            if(response.status===200){
                props.CallBackFun(response)
                props.onClose()
            }
        })
    }


    return (
        <Modal
            centered
            open={props.open}
            title={props.title}
            closable
            okText={"Next"} 
            cancelText="Close"
            onOk={UpdateApi}
            onCancel={props.onClose}

        >
            <div className='modal-input'>

            <InputComp type="text" labelname={"Title"} value={state.title} disabled={enable} onChange={(data)=>OnChangeData(data,"title")}/>
            <InputComp type="text" labelname={"Brand"} value={state.brand} disabled={enable} onChange={(data)=>OnChangeData(data,"brand")}/>
            <InputComp type="text" labelname={"Category"} value={state.category} disabled={enable} onChange={(data)=>OnChangeData(data,"category")}/>
            <InputComp type="text" labelname={"Price"} value={state.price} disabled={enable} onChange={(data)=>OnChangeData(data,"price")}/>
            </div>

        </Modal>
    )
}