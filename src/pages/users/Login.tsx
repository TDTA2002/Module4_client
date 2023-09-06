import React, { FormEvent, memo, useState } from 'react'
import './user.scss'
import { useTranslation } from 'react-i18next'
import DropDown from '@/components/DropDown'
import api from '@services/apis'
import Loading from './components/Loading'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message, Modal } from 'antd';
import * as Components from "./Components";

const Register = () => {
    const [load, setLoad] = useState(false);
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    const { t } = useTranslation();

    async function login(event: FormEvent) {
        event.preventDefault();

        if (load) return

        let data = {
            userName: (event.target as any).userName.value,
            password: (event.target as any).password.value,
        }

        setLoad(true)

        await api.userApi.login(data)
            .then(res => {
                if (res.status != 200) {
                    Modal.confirm({
                        content: res.data.message,
                        okText: "thử lại"
                    })
                } else {
                    Modal.confirm({
                        content: res.data.message,
                        okText: "ok",
                        onOk: () => {
                            localStorage.setItem("token", res.data.token)
                            window.location.href = '/'
                        }
                    })
                }
            })
            .catch(_err => {
                Modal.success({
                    content: "Sập server!",
                    okText: "thử lại"
                })
            })

        setLoad(false)
    }
    return (
     
        <Components.Form onSubmit={(e: React.FormEvent<Element>) => {
            login(e)
        }} className="space-y-4 md:space-y-6" action="#">
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="test" placeholder="Email" name="userName" />
            <Components.Input type="password" placeholder="Password" name="password"/>
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button>Sign In</Components.Button>
        </Components.Form>
    )
}

export default memo(Register)