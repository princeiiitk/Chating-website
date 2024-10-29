import React from 'react';

function NoContacts() {
    return (
        <div className='flex flex-col items-center justify-center my-auto'>
            <img
                className='w-[170px] h-[180px]'
                src="https://www.shutterstock.com/image-vector/no-handshake-vector-icon-stop-260nw-1673718811.jpg"
                alt="No Contacts"
            />
            <h4 className='text-[20px] text-[#166e48] font-semibold tracking-wide'>
                No Contacts Yet
            </h4>
            <span className='text-[13px] text-[#111b21] font-medium tracking-wide'>
                Search for people
            </span>
        </div>
    );
}

export default NoContacts;
