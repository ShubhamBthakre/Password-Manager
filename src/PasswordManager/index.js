import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem/index'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    inputWebsite: '',
    inputUsername: '',
    inputPassword: '',
    searchInput: '',
    isShowPasswordChecked: false,
  }

  deletePassword = id => {
    const {passwordList} = this.state
    this.setState({
      passwordList: passwordList.filter(eachPassword => eachPassword.id !== id),
    })
  }

  onChangeInputWebsite = event => {
    this.setState({inputWebsite: event.target.value})
  }

  onChangeInputUsername = event => {
    this.setState({inputUsername: event.target.value})
  }

  onChangeInputPassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()

    const {inputWebsite, inputUsername, inputPassword} = this.state

    const passwordDetails = {
      id: v4(),
      website: inputWebsite,
      username: inputUsername,
      password: inputPassword,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, passwordDetails],
      inputWebsite: '',
      inputUsername: '',
      inputPassword: '',
    }))
  }

  renderAddUserPasswordFormView = () => {
    const {inputWebsite, inputUsername, inputPassword} = this.state

    return (
      <div className="add-user-password-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          className="password-manager-img password-manager-img-sm"
          alt="password manager"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="form-heading">Add New Password</h1>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              className="user-input-img"
              alt="website"
            />

            <input
              type="text"
              placeholder="Enter Website"
              className="user-input"
              value={inputWebsite}
              onChange={this.onChangeInputWebsite}
            />
          </div>

          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              className="user-input-img"
              alt="username"
            />

            <input
              type="text"
              placeholder="Enter Username"
              className="user-input"
              value={inputUsername}
              onChange={this.onChangeInputUsername}
            />
          </div>

          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              className="user-input-img"
              alt="password"
            />

            <input
              type="password"
              className="user-input"
              placeholder="Enter Password"
              value={inputPassword}
              onChange={this.onChangeInputPassword}
            />
          </div>

          <button type="submit" className="add-button">
            Add
          </button>
        </form>

        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          className="password-manager-img password-manager-img-lg"
          alt="password manager"
        />
      </div>
    )
  }

  renderNoPasswordView = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-image"
      />
      <p className="no-password-text">No Passwords</p>
    </div>
  )

  showPassword = () => {
    this.setState(prevState => ({
      isShowPasswordChecked: !prevState.isShowPasswordChecked,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderYourPasswordView = () => {
    const {passwordList, searchInput, isShowPasswordChecked} = this.state

    const filteredSearchPasswordList = passwordList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="your-password-container">
        <div className="header-container">
          <div className="header-heading-and-counter-container">
            <h1 className="header-heading">Your Passwords</h1>
            <p className="counter">{passwordList.length}</p>
          </div>
          <div className="search-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              className="search-icon"
              alt="search"
            />
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
          </div>
        </div>
        <div className="show-password-checkbox-container">
          <input
            id="showPassword"
            type="checkbox"
            className="show-password-checkbox"
            checked={isShowPasswordChecked}
            onChange={this.showPassword}
            value={isShowPasswordChecked}
          />
          <label htmlFor="showPassword" className="show-password-label">
            Show Passwords
          </label>
        </div>

        {filteredSearchPasswordList.length < 1 ? (
          this.renderNoPasswordView()
        ) : (
          <ul className="password-list-container">
            {filteredSearchPasswordList.map(eachPassword => (
              <PasswordItem
                passwordDetails={eachPassword}
                key={eachPassword.id}
                isShowPasswordChecked={isShowPasswordChecked}
                deletePassword={this.deletePassword}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="aap-logo"
            alt="app logo"
          />
          {this.renderAddUserPasswordFormView()}
          {this.renderYourPasswordView()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
