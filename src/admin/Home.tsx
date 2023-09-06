import React from 'react'
import product from '../public/imgs/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313735393739342f313237373639342f30313234646530302d326564392d313165332d386132342d3431346431363639386237332e676966.gif'
import { BiSolidUserBadge } from "react-icons/bi";
import { BsCoin } from "react-icons/bs";

export default function Home() {
    return (
        <div>Home

            <ul className="box-info">
                <li>
                    <img src={product} alt="" style={{ width: "30px" }}
                    />
                    <span className="text">
                        <h3>1020</h3>
                        <p>Products</p>
                    </span>
                </li>
                <li>
                    <BiSolidUserBadge />
                    <span className="text">
                        <h3>2834</h3>
                        <p>Users</p>
                    </span>
                </li>
                <li>
                    <BsCoin />
                    <span className="text">
                        <h3>$2543</h3>
                        <p>Total Sales</p>
                    </span>
                </li>
            </ul>

        </div>
    )
}
