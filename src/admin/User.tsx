import store, { StoreType } from '@/stores'
import { Avatar } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Productlist() {
    const dispatch = useDispatch();
    const store = useSelector(store => store) as StoreType;
    return (
        <div style={{ width: "100%" }}>

            <div style={{display: 'flex', justifyContent:"space-between",fontSize:"24px", color:"gray", marginBottom: "10px", marginTop: "10px"}}>
                <div style={{}}>
                    User
                </div>
              
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td><Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngDLxVdX-4fhpWyG8hDPxUWyGV1B9uOXJ3Q&usqp=CAU" alt="avatar" /> Mark</td>
                        <td>Otto</td>
                        <td >
                            <div style={{
                                background: "rgba(0, 128, 0, 0.05)",
                                color: "green",
                                width: "50px",
                                textAlign: "center"
                            }}>active</div>
                        </td>
                        <td>
                            <button type="button" className='button-danger' >DELETE</button>
                            <button type="button" className='button-success'>UPDATE</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td><Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngDLxVdX-4fhpWyG8hDPxUWyGV1B9uOXJ3Q&usqp=CAU" alt="avatar" /> Mark</td>
                        <td>Thornton</td>
                        <td> <div style={{
                            background: "rgba(255, 0, 0, 0.05)",
                            color: "crimson",
                            width: "60px",
                            textAlign: "center"
                        }}>passive</div></td>
                        <td>
                            <button type="button" className='button-danger' >DELETE</button>
                            <button type="button" className='button-success'>UPDATE</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td><Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngDLxVdX-4fhpWyG8hDPxUWyGV1B9uOXJ3Q&usqp=CAU" alt="avatar" /> Mark</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        <td>
                            <button type="button" className='button-danger' >DELETE</button>
                            <button type="button" className='button-success'>UPDATE</button>
                        </td>
                    </tr>
                </tbody>
            </table >
        </div>

    )
}
