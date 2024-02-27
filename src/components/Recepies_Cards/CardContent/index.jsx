import PropTypes from 'prop-types'

export const CardContent = ({ children }) => {
    return (
      <div>
        {children}
      </div>
    )
  }

  
  CardContent.propTypes = {
    children: PropTypes.node.isRequired
  }