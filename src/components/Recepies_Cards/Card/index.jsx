import PropTypes from 'prop-types'


export const Card = ({ children }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-2 max-w-xs sm:p-4 sm:w-50 md:w-64 lg:w-72 transition duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105 hover:-translate-y-1 ">
        {children}
    </div>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired
}