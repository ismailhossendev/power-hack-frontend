import React from 'react';

const TableHeader = ({ setModal, setSearch }) => {
    return (
        <div className='h-16 bg-gray-200 flex items-center p-5 justify-between rounded my-3'>
            <div className="flex ">
                <label className='label '>
                    <span className='label-text text-black font-semibold font-serif text-xl'>Billing:</span>
                </label>
                <input type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search' className='input input-primary bg-gray-200 ' />
            </div>
            <div className="">
                <label htmlFor="my-modal-3" onClick={() => setModal(true)} className="btn">Add New</label>
            </div>
        </div>
    );
};

export default TableHeader;