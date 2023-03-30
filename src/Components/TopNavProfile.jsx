import { Button, NavDropdown } from 'react-bootstrap'
import { HiHome, HiUserCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TopNavProfile = () => {
  const navigate = useNavigate()
  // const currentUserData = useSelector((state) => state.user.currentUser)

  return (
    <>
      <div className="d-flex justify-content-center">
        <HiUserCircle size={20} />
      </div>
      <NavDropdown title="Me" id="basic-nav-dropdown">
        <div className="dropdown-item">
          <div className="d-flex flex-column firstnavitem">
            <div className="d-flex mb-2">
              <div>
                <HiUserCircle size={48} />
              </div>
              <div>
                <p className="m-0">
                  {/* {currentUserData.name} {currentUserData.surname} */}
                </p>
                <p className="m-0">
                  {/* <small>{currentUserData.title}</small> */}
                </p>
              </div>
            </div>
            <Button
              className="rounded-pill"
              onClick={() => {
                navigate('/Profile')
              }}
            >
              View Profile
            </Button>
          </div>
        </div>
        <NavDropdown.Divider />
      </NavDropdown>
    </>
  )
}
export default TopNavProfile
