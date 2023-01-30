import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { mainContext } from '../Contexts/MainContext';

const AddingModal = ({ edit, setEdit, setModal }) => {
    const { setRow, reFresh, setReFresh, } = useContext(mainContext);
    const handleAdding = (e) => {
        e.preventDefault()
        setRow(null)
        const submitData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            payableAmount: e.target.payableAmount.value
        }

        setRow({
            _id: "Generating...",
            name: submitData.name,
            email: submitData.email,
            phone: submitData.phone,
            payableAmount: submitData.payableAmount
        })
        setModal(false)
        fetch('https://power-hack-one.vercel.app/api/add-billing/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('powerToken')
            },
            body: JSON.stringify(submitData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success(data.message)
                    setReFresh(!reFresh)

                } else {
                    toast.error(data.message)
                }
                setRow(null)
            })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const submitData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            payableAmount: e.target.payableAmount.value
        }
        fetch(`https://power-hack-one.vercel.app/api/update-billing/${edit._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('powerToken')
            },
            body: JSON.stringify(submitData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success(data.message)
                    setReFresh(!reFresh)
                    setModal(false)
                    setEdit(null)
                } else {
                    toast.error(data.message)
                }
            })
    }

    return (
        <div>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" onClick={() => setEdit(null)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="">
                        <h1>Adding Billing Details</h1>
                        <form onSubmit={edit ? handleUpdate : handleAdding}>
                            <div className="md:flex justify-between mt-2">
                                <div>
                                    <label className='label'>
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text" name='name' defaultValue={edit && edit.name} placeholder="Ex. Jhankar Mahbub" className="input input-primary placeholder:text-gray-500" />
                                </div>
                                <div>
                                    <label className='label'>
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' defaultValue={edit && edit.email} placeholder="example@gmail.com" className="input input-primary placeholder:text-gray-500" />
                                </div>
                            </div>

                            <div className="md:flex justify-between mb-5 mt-2">
                                <div>
                                    <label className='label'>
                                        <span className="label-text">Phone</span>
                                    </label>
                                    <input type="text" name='phone' defaultValue={edit && edit.phone} placeholder="+88017744**10445" className="input input-primary placeholder:text-gray-500" />
                                </div>
                                <div>
                                    <label className='label'>
                                        <span className="label-text">Payable Amount  </span>
                                    </label>
                                    <input type="number" defaultValue={edit && edit.payableAmount} name='payableAmount' placeholder="Ex. 500bdt" className="input input-primary placeholder:text-gray-500" />
                                </div>
                            </div>
                            {
                                edit ? <input type="submit" value="Update" className='btn flex w-full ' /> :
                                    <input type="submit" value="Add" className='btn flex w-full ' />
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddingModal;