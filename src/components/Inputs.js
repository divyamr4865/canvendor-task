import React, { useEffect, useState } from 'react'
import { Button, Input } from "antd";
export default function InputComp({ placeholder, value, onChange, labelname,type,disabled}) {

   
    return (
        <div>
            <label style={{fontWeight:600}}>{labelname}</label>
            <Input type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} />
        </div>
    )
}