import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import AddingModal from '../../components/AddingModal';
import Pagination from '../../components/Pagination';
import TableHeader from '../../components/TableHeader';
import UserData from '../../components/UserData';
import { mainContext } from '../../Contexts/MainContext';
const Home = () => {
    const [edit, setEdit] = useState(null)
    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState('')
    // pagination 
    const [currentPage, setCurrentPage] = useState(0);


    const { user, loading, row, reFresh, setTotal, } = React.useContext(mainContext)
    const { data, isLoading, refetch } = useQuery("billing-list", async () => {
        const res = await fetch(`https://power-hack-one.vercel.app/api/billing-list?limit=10&page=${currentPage}&search=${search}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('powerToken')
            }
        })
        const data = await res.json()
        return data
    })

    // pagination
    const pages = parseInt(data?.count / 10) || 0;

    if (loading | isLoading) return <div>Loading...</div>
    if (!user) {
        return <Navigate to='/login' />
    }
    refetch(reFresh)
    setTotal(data.data.reduce((acc, item) => acc + parseInt(item.payableAmount), 0))



    return (
        <div className="overflow-x-auto p-5 rounded">
            <TableHeader
                setSearch={setSearch}
                setModal={setModal}
            />
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Billing ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Paid Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {row && <UserData data={row} />}
                    {
                        data.data.map((item) => {
                            return <UserData key={item._id} setModal={setModal} edit={setEdit} data={item} />
                        })
                    }
                </tbody>
            </table>
            <Pagination
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />


            {modal && < AddingModal
                edit={edit}
                setEdit={setEdit}
                setModal={setModal}
            />}
        </div>
    );
};

export default Home;