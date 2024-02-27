import PropTypes from 'prop-types'

export const CardHeader = ({ children }) => {
    return (
        <div className="mb-2 sm:mb-4">
            {children}
        </div>
    )
}

CardHeader.propTypes = {
    children: PropTypes.node.isRequired
}