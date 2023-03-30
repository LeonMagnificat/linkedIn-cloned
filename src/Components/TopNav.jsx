import { Navbar, Nav, Form, FormControl, Container } from 'react-bootstrap'
import { SiLinkedin } from 'react-icons/si'
import { GoSearch } from 'react-icons/go'
import { HiHome } from 'react-icons/hi'
import { MdPeopleAlt } from 'react-icons/md'
import { BsBriefcaseFill } from 'react-icons/bs'
import { AiFillMessage } from 'react-icons/ai'
import { FaBell } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import TopNavProfile from './TopNavProfile'
import TopNavWork from './TopNavWork'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiDelete } from 'react-icons/fi'
import FormSearchUser from './FormSearchUser'
import ClickAwayListener from '@mui/base/ClickAwayListener'
/*note that Clickawaylistener is installed for the purpose of detecting the user clicking outside of the search bar. It is in use on this page. I installed it using npm i  */
import HiddenNav from './HiddenNav'

const TopNav = () => {
  const [query, setQuery] = useState('')
  const [searchSelected, setSearchSelected] = useState(false)
  const [isQuerySet, setIsQuerySet] = useState(false)
  const [clearInput, setClearInput] = useState(query)

  const handleQuery = (e) => {
    setQuery(e.target.value)
    setIsQuerySet(true)
  }
  const handleClearInput = () => {
    // setClearInput("");
    setQuery('')
    setIsQuerySet(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const usersList = useSelector((state) => state.user.users)
  const users = usersList[0]
  const areUsersLoaded = useSelector((state) => state.user.usersLoaded)
  return (
    <>
      <Navbar expand="lg justify-content-center">
        <Container>
          <div
            className="d-flex justify-content-left align-items-center"
            id="parentDivForm"
          >
            <Link to="/">
              <SiLinkedin size={38} />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <ClickAwayListener onClickAway={() => setSearchSelected(false)}>
              <div
                id="generalSearchArea"
                className={
                  searchSelected === true
                    ? 'd-flex  align-items-center searchSetSelected'
                    : 'd-flex  align-items-center'
                }
              >
                <div className="pl-3 pr-2">
                  <GoSearch />
                </div>
                <Form inline className="searchInput" onSubmit={handleSubmit}>
                  <input
                    value={query}
                    onChange={handleQuery}
                    type="text"
                    placeholder="Search"
                    onClick={() => setSearchSelected(true)}
                  />
                </Form>
                <div id="topNavDeleteInput">
                  <FiDelete onClick={handleClearInput} />
                </div>
                {isQuerySet && (
                  <ul id="topNavFormList">
                    {areUsersLoaded &&
                      users
                        .filter((user) =>
                          user.name.toLowerCase().startsWith(`${query}`),
                        )
                        .slice(0, 10)
                        .map((user) => (
                          <li
                            className="formListItems line-clamp-one pl-2"
                            key={user._id}
                          >
                            <FormSearchUser user={user} />
                          </li>
                        ))}
                    {areUsersLoaded && (
                      <p
                        className="text-center font-weight-bold"
                        style={{ borderTop: 'solid 1pt #c6c5c3' }}
                      >
                        <Link>See all results</Link>
                      </p>
                    )}
                  </ul>
                )}
              </div>
            </ClickAwayListener>
          </div>
          <div
            className="d-flex justify-content-center align-items-center"
            id="topNavRight"
          >
            <Navbar.Collapse id="basic-navbar-nav" className="ml-5">
              <Nav className="mr-auto">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/" className="top-nav-links">
                    <div className="navbar-links">
                      <HiHome className=" navbar-icons" />
                      <p className="mb-0 top-nav-text-icons">Home</p>
                    </div>
                  </Link>
                  <Link href="#link" className="top-nav-links">
                    <div className="navbar-links">
                      <MdPeopleAlt className=" navbar-icons" />
                      <p className="mb-0 top-nav-text-icons">My Network</p>
                    </div>
                  </Link>
                  <Link className="top-nav-links">
                    <div className="navbar-links">
                      <BsBriefcaseFill className=" navbar-icons" />
                      <p className="mb-0 top-nav-text-icons">Jobs</p>
                    </div>
                  </Link>
                  <Link className="top-nav-links">
                    <div className=" navbar-links">
                      <AiFillMessage className=" navbar-icons" />
                      <p className="mb-0 top-nav-text-icons">Messaging</p>
                    </div>
                  </Link>
                  <Link className="top-nav-links">
                    <div className="navbar-links">
                      <FaBell className=" navbar-icons" />
                      <p className="mb-0 top-nav-text-icons">Notifications</p>
                    </div>
                  </Link>
                  <div className="topNavMeBox">
                    <TopNavProfile />
                  </div>
                </div>
                <div className="topNavWorkBox">
                  <TopNavWork />
                </div>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
      <HiddenNav />
    </>
  )
}

export default TopNav
