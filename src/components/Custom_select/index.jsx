

import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';


export const Custom_select = ({ name, label, placeholder, error, options, initialValue, ...props }) => {

    const [selectedValue, setSelectedValue] = useState(initialValue);

    useEffect(() => {
        setSelectedValue(initialValue);
    }, [initialValue]);

    return (
        <div className='flex flex-col'>
            <label htmlFor={name} className="p-1 font-semibold mb-2">{label}: </label>
            <select id={name} name={name} value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} {...props} className={`rounded-xl border-2 border-solid border-gray-300 outline-gray-500 outline-1 p-1 hover:bg-gray-200 ${error && 'border-red-300'} `} >
                <option value="" >{placeholder}...</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.nombre}
                    </option>
                ))}
            </select>
            <span className="p-1 text-red-500 text-sm">{error}</span>
        </div>
    );
};

Custom_select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    // dataFetcher: PropTypes.func,
    error: PropTypes.string,
    initialValue: PropTypes.number,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            nombre: PropTypes.string.isRequired
        })
    ).isRequired,
}