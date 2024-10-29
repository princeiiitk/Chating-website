
import { useState } from 'react';
import { TbEdit } from "react-icons/tb";
import { BsCheck2 } from "react-icons/bs";
import PropTypes from 'prop-types';

function InputEdit({ type, handleChange, input, handleSubmit }) {
    const [editable, setEditable] = useState(false);

    const submitButton = () => {
        handleSubmit();
        setEditable(false);
    }
    if (type === "name") {
        return (
            <div className='flex flex-col py-4 mt-4 bg-[#ffff] shadow-md px-4 gap-y-3'>
                <p className='text-[12px] text-[#166e48] font-medium tracking-wide'>Your name</p>
                {
                    !editable ? (
                        <div className='flex justify-between items-center'>
                            <p className='text-[14.5px] text-[#3b4a54]'>{input}</p>
                            <button onClick={() => setEditable(true)}>
                                <TbEdit className='w-[21px] h-[21px]' />
                            </button>
                        </div>
                    ) : (
                        <div className='flex items-center justify-between'>
                            <input
                                name={type}
                                onChange={handleChange}
                                className='text-[14.5px] text-[#3b4a54] outline-0'
                                type="text"
                                value={input}
                            />
                            <button onClick={submitButton}>
                                <BsCheck2 className='w-[21px] h-[21px]' />
                            </button>
                        </div>
                    )
                }
            </div>
        );
    }
    if (type === "bio") {
        return (
        <div className='flex flex-col py-4 mt-4 bg-[#ffff] shadow-md px-4 gap-y-3'>
            <p className='text-[12px] text-[#166e48] font-medium tracking-wide'>Your name</p>
            {
                !editable ? (
                    <div className='flex justify-between items-center'>
                        <p className='text-[14.5px] text-[#3b4a54]'>{input}</p>
                        <button onClick={() => setEditable(true)}>
                            <TbEdit className='w-[21px] h-[21px]' />
                        </button>
                    </div>
                ) : (
                    <div className='flex items-center justify-between'>
                        <input
                            name={type}
                            onChange={handleChange}
                            className='text-[14.5px] text-[#3b4a54] outline-0'
                            type="text"
                            value={input}
                        />
                        <button onClick={submitButton}>
                            <BsCheck2 className='w-[21px] h-[21px]' />
                        </button>
                    </div>
                )
            }
        </div>
    );
    }
    

    
}


InputEdit.propTypes = {
    type: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    input: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default InputEdit;
