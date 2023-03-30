import { Modal, Button, Row, Container, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editUser, fetchProfile, fetchExperiences } from '../redux/actions'
import {
  BsPlus,
  BsEmojiSmile,
  BsFillImageFill,
  BsCameraVideoFill,
  BsFillFileArrowUpFill,
} from 'react-icons/bs'
import { IoEarth } from 'react-icons/io5'
import { AiFillCaretDown } from 'react-icons/ai'
import { FaEllipsisH } from 'react-icons/fa'
import EmojiPicker from 'emoji-picker-react'
import ImageUpload from './ImageUpload'
import { profilePostsListAction } from '../redux/actions'
import axios from 'axios'

function AddNewPost() {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [postText, setPostText] = useState('')
  const [selectedFile, setselectedFile] = useState()
  const [isFilePicked, setisFilePicked] = useState(false)
  const currentUserData = useSelector((state) => state.user.currentUser)

  const handleEmojiShow = () => {
    if (showEmoji) {
      setShowEmoji(false)
    } else {
      setShowEmoji(true)
    }
  }

  const changeHandler = (event) => {
    setselectedFile(event.target.files[0])
    setisFilePicked(true)
  }

  const addEmoji = (emoji) => {
    setPostText(postText + emoji.emoji)
  }

  const handlePostText = (e) => {
    setPostText(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const post = {
      text: postText,
      username: 'Prince_Moore',
      image: '',
      user: {
        _id: currentUserData._id,
      },
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const fetchURL = `https://fs0422-epicode-build-week-4-production.up.railway.app/posts/`

    try {
      let response = await fetch(fetchURL, options)
      console.log(currentUserData)

      if (response.ok) {
        const post = await response.json()

        if (isFilePicked) {
          const url = `https://fs0422-epicode-build-week-4-production.up.railway.app/posts/${post._id}/uploadPostImage`
          const formData = new FormData()
          formData.append('postPhoto', selectedFile)
          const config = {
            headers: {
              'content-Type': 'multipart/form-data',
            },
          }
          axios.post(url, formData, config).then((response) => {})
        }

        dispatch(profilePostsListAction(post))
      }
    } catch (error) {
      console.log(error)
    }
    handleClose()
  }

  const handleClose = () => {
    setShow(false)
    setPostText('')
  }
  const handleShow = () => setShow(true)

  return (
    <>
      <Button
        variant="none"
        className="new-post-button text-left"
        onClick={handleShow}
      >
        Start a post
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <small>Create a Post</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <img
                className="news-post-profile-image ml-2"
                src={currentUserData.image}
              />
              <div className="d-flex flex-column">
                <p>
                  <strong>
                    {currentUserData.name} {currentUserData.surname}
                  </strong>
                </p>
                <div className="d-flex">
                  <Button variant="outline-dark" className="privacy-button">
                    <IoEarth className="globe-icon" />
                    Anyone
                    <AiFillCaretDown className="expand-icon-privacy" />
                  </Button>
                </div>
              </div>
              <Form.Group className="mt-3">
                <Form.Control
                  value={postText}
                  onChange={handlePostText}
                  className="new-post-textarea"
                  as="textarea"
                  rows={5}
                  cols={100}
                  placeholder="What would you like to post?"
                />
              </Form.Group>

              <BsEmojiSmile
                onClick={handleEmojiShow}
                className="emoji-picker"
              />
              {showEmoji && (
                <EmojiPicker
                  searchDisabled="true"
                  skinTonesDisabled="true"
                  showPreview="false"
                  onEmojiClick={addEmoji}
                />
              )}
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Row className="w-100 justify-content-between">
            <div className="footer-icons-new-post">
              <label for="actual-btn">
                <BsFillImageFill
                  className="ml-3 mr-2 upload-post-image"
                  onChange={changeHandler}
                />
              </label>
              <input
                id="actual-btn"
                type="file"
                onChange={changeHandler}
                hidden
              />
              {isFilePicked && <span>{selectedFile.name}</span>}
              <BsCameraVideoFill className="ml-5 mr-2" />
              <BsFillFileArrowUpFill className="ml-5 mr-2" />
              <FaEllipsisH className="ml-5 mr-2" />
            </div>
            <Button type="Submit" variant="primary" onClick={handleSubmit}>
              Post
            </Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddNewPost
