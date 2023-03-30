import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useEffect } from 'react'

function SingleComment({ comment, postID }) {
  const [postEdit, setPostEdit] = useState(false)
  const [commentText, setcommentText] = useState(comment.comment)
  const [commentEdit, setcommentEdit] = useState('This is the edit function')
  const currentUserData = useSelector((state) => state.user.currentUser)

  const handleCommentEdit = (e) => {
    setcommentEdit(e.target.value)
  }

  const showEdit = () => {
    if (postEdit === true) {
      setPostEdit(false)
    } else {
      setPostEdit(true)
    }
    setcommentEdit(comment.comment)
  }

  const submitEdit = async () => {
    const post = {
      comment: commentEdit,
    }

    const options = {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const fetchURL = `https://fs0422-epicode-build-week-4-production.up.railway.app/posts/${postID}/comment/${comment._id}`
    try {
      let response = await fetch(fetchURL, options)
      if (response.ok) {
        setTimeout(() => {
          fetchComments(comment._id)
          setcommentText(commentEdit)
          setPostEdit(false)
        }, 1000)
      }
    } catch (error) {}
  }

  const deleteComment = async (commentID) => {
    const options = {
      method: 'DELETE',
    }
    const fetchURL = `https://fs0422-epicode-build-week-4-production.up.railway.app/posts/${postID}/comment/${commentID}`

    try {
      let response = await fetch(fetchURL, options)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComments = async (commentID) => {
    const options = {
      method: 'GET',
    }
    const fetchURL = `https://fs0422-epicode-build-week-4-production.up.railway.app/posts/${postID}/comment/`

    try {
      let response = await fetch(fetchURL, options)

      if (response.ok) {
        const comments = await response.json()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="commentsList">
      <div className="d-flex comment mt-3">
        <img
          className="commentsAvatar mt-2 mr-2"
          src="https://www.scotsman.com/webimg/b25lY21zOjU4N2VlNjM2LTMzYWQtNGM0OS1hMWEzLTBlOTk1NGUyZmVjZDpkNjE5MGE2OS1mOWYyLTQxYmMtOGI4Ny00YzhlMWUxYmM2NzI=.jpg?crop=61:45,smart&width=800"
          alt="Avatar"
        />
        <div className="commentBox">
          <p className="pl-3 pt-1 commentName">
            {comment.userId.name} {comment.userId.surname}
          </p>
          {postEdit === true && (
            <>
              <input
                type="text"
                className="ml-3 mt-2 mb-3 pl-2 py-2 editComment"
                value={commentEdit}
                onChange={(e) => handleCommentEdit(e)}
              ></input>
              <Button className="ml-3 mb-3 btn-sm" onClick={submitEdit}>
                Save changes
              </Button>
            </>
          )}
          {postEdit === false && (
            <span className="pl-3 pt-1 mb-3 commentText">{commentText}</span>
          )}
        </div>
      </div>
      <div className="ml-5 commentActions">
        <span className="ml-1 mr-1 commentAction">Like</span>|
        <span className="ml-1 mr-1 commentAction">Reply</span>
        {currentUserData._id === comment.userId._id && (
          <>
            |
            <span className="ml-1 mr-1 commentAction" onClick={showEdit}>
              Edit
            </span>
            |
            <span
              className="ml-1 commentAction"
              onClick={() => {
                deleteComment(comment._id)
              }}
            >
              Delete
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default SingleComment
