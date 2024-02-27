import PropTypes from 'prop-types'


export const Input = ({ name, label, error, ...props }) => (
  <div className="flex flex-col">

    <label htmlFor={name} className="p-1 font-semibold mb-2">{label}</label>

    <input name={name} id={name} {...props} className={`rounded-xl border-2 border-solid border-gray-300 outline-gray-500 outline-1 p-1 hover:bg-gray-200 ${error && 'border-red-300'} `} />

    <span className="p-1 text-red-500 text-sm">{error}</span>
  </div>
)

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string
}