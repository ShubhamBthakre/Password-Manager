import './index.css'

const PasswordItem = props => {
  const {deletePassword, passwordDetails, isShowPasswordChecked} = props
  const {id, website, username, password} = passwordDetails

  const initial = website[0]

  const onDeletePassword = () => {
    deletePassword(id)
  }

  return (
    <li className="list-item">
      <div className="initial-and-password-details-container">
        <div className="website-initial-container">
          <p className="initial">{initial}</p>
        </div>
        <div className="website-text-container">
          <p className="website-text">{website}</p>
          <p className="website-text">{username}</p>
          {isShowPasswordChecked ? (
            <p className="website-text">{password}</p>
          ) : (
            <p className="website-text">*********</p>
          )}
        </div>
      </div>
      <div className="delete-icon">
        <button
          type="button"
          className="delete-button"
          onClick={onDeletePassword}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
