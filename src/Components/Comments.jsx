import { Modal, Button, Row, Container, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nextDay } from 'date-fns/esm'
import { useEffect } from 'react'
import SingleComment from './SingleComment'

function Comments({ post }) {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [postText, setPostText] = useState('')
  const currentUserData = useSelector((state) => state.user.currentUser)
  const [comment, setComment] = useState('')
  const [postsComments, setPostsComments] = useState('')
  const postID = post._id
  const [commentsLoaded, setCommentsLoaded] = useState(false)
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [])

  useEffect(() => {
    fetchComments()
  }, [commentSubmitted])

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const fetchComments = async () => {
    const options = {
      method: 'GET',
    }
    const fetchURL = `https://fs0422-epicode-build-week-4-production.up.railway.app/posts/${postID}/comment`

    try {
      let response = await fetch(fetchURL, options)

      if (response.ok) {
        const comments = await response.json()
        setTimeout(() => {
          setPostsComments(comments)
          if (commentsLoaded === false) {
            setCommentsLoaded(true)
          } else {
            setCommentsLoaded(false)
          }
        }, 500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const submitComment = async (event) => {
    event.preventDefault()

    const post = {
      comment: comment,
      userId: currentUserData._id,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const fetchURL = `https://fs0422-epicode-build-week-4-production.up.railway.app/posts/${postID}/comment`

    try {
      let response = await fetch(fetchURL, options)

      if (response.ok) {
        const post = await response.json()
        setComment('')
        setTimeout(() => {
          setCommentsLoaded(true)
        }, 1000)
        if (commentSubmitted === false) {
          setCommentSubmitted(true)
        } else {
          setCommentSubmitted(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="commentsContainer">
      <div className="d-flex">
        <img
          className="commentsAvatar mt-3"
          src={post.user.image}
          alt="Avatar"
        />
        <input
          type="text"
          value={comment}
          className="commentInput"
          placeholder="Add a comment"
          onChange={(e) => {
            handleChange(e)
          }}
        ></input>
      </div>
      {comment && (
        <Button className="ml-5 mt-2 btn-sm" onClick={submitComment}>
          Post
        </Button>
      )}
      {commentsLoaded &&
        postsComments.map((comment) => (
          <SingleComment comment={comment} key={comment._id} postID={postID} />
        ))}
    </div>
  )
}

export default Comments
