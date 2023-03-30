import { Row, Button } from 'react-bootstrap'
import {
  FcStackOfPhotos,
  FcVideoCall,
  FcCalendar,
  FcKindle,
} from 'react-icons/fc'
import AddNewPost from './AddNewPost'
import { useSelector } from 'react-redux'

const HomePageLeft = () => {
  const currentUserData = useSelector((state) => state.user.currentUser)
  return (
    <>
      <div className="new-post">
        <Row>
          <div className="d-flex">
            <img className="new-post-image" src={currentUserData.image} />
            <AddNewPost />
          </div>
        </Row>
        <Row className="px-4 justify-content-between new-post-type">
          <a href="#">
            <FcStackOfPhotos className="mt-1" />
            <span className="ml-2">Photo</span>
          </a>
          <a href="#">
            <FcVideoCall className="mt-1" />
            <span className="ml-2">Video</span>
          </a>
          <a href="#">
            <FcCalendar className="mt-1" />
            <span className="ml-2">Event</span>
          </a>
          <a href="#">
            <FcKindle className="mt-1" />
            <span className="ml-2">Write Article</span>
          </a>
        </Row>
      </div>
    </>
  )
}

export default HomePageLeft
