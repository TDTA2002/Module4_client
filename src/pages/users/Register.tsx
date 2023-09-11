import React, { FormEvent, memo, useState } from 'react'
import './user.scss'
import { useTranslation } from 'react-i18next'
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

    async function register(event: FormEvent) {
        event.preventDefault();

        if (load) return

        let newUser = {
            email: (event.target as any).email.value,
            userName: (event.target as any).userName.value,
            password: (event.target as any).password.value,
            firstName: (event.target as any).firstName.value,
            lastName: (event.target as any).lastName.value,
        }

        setLoad(true)

        await api.userApi.register(newUser)
            .then(res => {
                setLoad(false);
                if (res.status != 200) {
                    message.warning(res.data.message);
                } else {
                    message.success(res.data !== undefined ? res.data.message : res.status);
                    
                }
            })
            .catch(err => {
                message.error('An error occurred during registration. Please try again.');
                setLoad(false);
            })

        setLoad(false)
    }
    return (

        <Components.Form onSubmit={(e: React.FormEvent<Element>) => {
            register(e)
        }} action="#">
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" placeholder="firstName" name="firstName" required />
            <Components.Input type="text" placeholder="lastName" name="lastName" required />
            <Components.Input type="text" placeholder="userName" name="userName" required />
            <Components.Input type="email" placeholder="email" name="email" required />
            <Components.Input type="password" placeholder="password" name="password" required />
            {
                load && <Loading />
            }
            <button
                type="submit"
                className={`${load && 'active'} btn_submit w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
            >
                Create an account
                <div className='btn_loading'>
                    <Spin indicator={antIcon} />
                </div>
            </button>

        </Components.Form>



    )
}

export default memo(Register)