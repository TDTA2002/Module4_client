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
                    message.warning(res.data.message);
                } else {
                    message.success(res.data !== undefined ? res.data.message : res.data.message);
                    localStorage.setItem("token", res.data.token);
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 2000)
                }
            })
            .catch(_err => {
                message.error('An error occurred during registration. Please try again.');
                setLoad(false);
            })

        setLoad(false)
    }
    return (

        <Components.Form onSubmit={(e: React.FormEvent<Element>) => {
            login(e)
        }} className="space-y-4 md:space-y-6" action="#">
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="test" placeholder="Email" name="userName" />
            <Components.Input type="password" placeholder="Password" name="password" />
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            {/* <Components.Button>Sign In</Components.Button> */}
            {
                load && <Loading />
            }
            <button
                type="submit"
                className={`${load && 'active'} btn_submit w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
            >
                Login
                <div className='btn_loading'>
                    <Spin indicator={antIcon} />
                </div>
            </button>
        </Components.Form>
    )
}

export default memo(Register)