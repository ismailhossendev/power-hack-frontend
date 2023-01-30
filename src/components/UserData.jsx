import React from 'react';
import { toast } from 'react-hot-toast';

const UserData = ({ data, edit, setModal }) => {
    const { _id, name, email, phone, payableAmount, total, setTotal } = data;
    const handleDelete = async id => {
        const agree = window.confirm("Are you sure to delete this?")
        if (!agree) return
        const res = await fetch(`https://power-hack-one.vercel.app/api/delete-billing/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('powerToken')
            }
        })
        const data = await res.json()
        if (data.success) {
            setTotal(parseInt(total) - parseInt(payableAmount))
            toast.success(data.message)
        } else {
            toast.error("Something went wrong")
        }
    }
    return (
        <tr>
            <th>{_id}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{payableAmount}</td>
            <td>
                <label onClick={() => (edit(data), setModal(true))} htmlFor="my-modal-3" className="btn btn-sm btn-primary mr-2">Edit</label>
                <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-sm btn-danger">Delete</button>
            </td>
        </tr>
    );
};

export default UserData;