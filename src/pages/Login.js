import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
function LoginComp() {
    const [visible, setvisible] = useState(false)
    const [states, setStates] = useState({
        username: "",
        password: "",
    })
    let navigate = useNavigate()
    const handlefun = (data, key) => {
        setStates((prev) => ({
            ...prev,
            [key]: data.target.value
        }))
    }
    return (
        <div className="login-parent">
            <div className="login-child">
                <div className="log-sub-child">
                    <h3>LOGIN</h3>
                    <Input type="text" placeholder="Username" onChange={(data) => handlefun(data, "username")} value={states.username} />
                    <Input type="text" placeholder="Password" suffix={<span>{visible ? <EyeOutlined onClick={() => setvisible(!visible)} /> : <EyeInvisibleOutlined onClick={() => setvisible(!visible)} />}</span>} value={states.password}
                     onChange={(data) => handlefun(data, "password")} />
                    <Button onClick={() => navigate("/table")}>SUBMIT</Button>
                </div>
            </div>
        </div>
    )
}
export default LoginComp;