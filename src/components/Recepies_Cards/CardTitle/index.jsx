import PropTypes from 'prop-types'


export const CardTitle = ({ children }) => {
    return (
      <h2 className="text-lg font-semibold text-gray-800">
        {children}
      </h2>
    )
  }



  CardTitle.propTypes = {
    children: PropTypes.node.isRequired
  }