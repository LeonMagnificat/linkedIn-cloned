import { Badge, Row } from 'react-bootstrap'
import { BsDot, BsDash } from 'react-icons/bs'
import { FcLike, FcRating } from 'react-icons/fc'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import { BiRepost } from 'react-icons/bi'
import { IoIosSend } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Comments from './Comments'
import '@shoelace-style/shoelace/dist/themes/light.css'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path'
import { SlButton, SlDialog } from '@shoelace-style/shoelace/dist/react'
import { useSelector } from 'react-redux'
import { nextDay } from 'date-fns/esm'
import { current } from '@reduxjs/toolkit'

const NewsFeedItem = ({ post }) => {
  setBasePath(
    'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/',
  )

  const [liked, setliked] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [showComments, setshowComments] = useState(false)
  const [open, setOpen] = useState(false)
  const currentUserData = useSelector((state) => state.user.currentUser)

  const handleShowComments = () => {
    if (showComments === true) {
      setshowComments(false)
    } else {
      setshowComments(true)
    }
  }

  const handleLikes = async () => {
    const alreadyLiked = likes.some((like) => {
      if (like._id === currentUserData._id) {
        return true
      }

      return false
    })
    console.log(alreadyLiked)

    if (alreadyLiked === true) {
      const options = {
        method: 'DELETE',
      }
      const fetchURL = `https://fs0422-epicode-build-week-4-production.up.railway.app/posts/${post._id}/like`

      try {
        let response = await fetch(fetchURL, options)
      } catch (error) {
        console.log(error)
      }
    } else {
      const like = { userId: currentUserData._id }

      const options = {
        method: 'POST',
        body: JSON.stringify(like),
        headers: {
          'Content-type': 'application/json',
        },
      }

      const fetchURL = `https://fs0422-epicode-build-week-4-production.up.railway.app/posts/${post._id}/like`

      try {
        const response = await fetch(fetchURL, options)
        if (response.ok) {
          console.log(`Post liked`)
        }
      } catch (error) {}
    }
  }

  const showLikes = () => {
    const options = {
      method: 'GET',
    }
  }

  return (
    <>
      <div className="news-feed-post mt-3">
        <Row>
          <div>
            <Link to={'/profile'}>
              <img
                className="news-post-profile-image ml-2"
                src={post.user.image}
              />
            </Link>
          </div>

          <div className="">
            <div>
              <small>
                <strong>
                  {post.user.name} {post.user.surname}
                </strong>
              </small>{' '}
              <BsDot className="mt-1" /> <small>3rd+</small>
            </div>
            <div>
              <small>{post.user.title}</small> <BsDash className="mt-1" />{' '}
              <small>{post.user.email}</small>
            </div>
          </div>
        </Row>
        <Row>
          <div
            className="d-flex flex-column px-2 pb-2"
            /*style={{ paddingLeft: ".5em", paddingRight: ".5em" }}*/
          >
            {post.text}
          </div>

          {post.image !== '' && (
            <div style={{ width: '100%' }}>
              <img
                className="mb-3 img-fluid"
                src={`${post.image}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
          <div className="d-flex mt-2 ml-2 justify-content-between w-100">
            <div onClick={() => setOpen(true)} className="openLikes">
              <AiFillLike className="like-icon" />
              {post.likes.length}
            </div>

            <SlDialog
              label="Who liked your post?"
              open={open}
              onSlAfterHide={() => setOpen(false)}
            >
              {post.likes.map((like) => (
                <div className="d-flex justify-content-between mt-3">
                  {like.name} {like.surname}
                  <SlButton size="small" variant="primary">
                    Add Friend
                  </SlButton>
                </div>
              ))}
              <SlButton
                slot="footer"
                variant="danger"
                onClick={() => setOpen(false)}
              >
                Close
              </SlButton>
            </SlDialog>

            <div>
              <div className="commentLink" onClick={handleShowComments}>
                <small className="mr-3">
                  {post.comments.length} comment(s)
                </small>
              </div>
            </div>
          </div>
          <hr className="bottom-post-divider" />
          <div className="post-action-buttons d-flex justify-content-between w-100 mx-3">
            <span className="footer-icons-new-post" onClick={handleLikes}>
              {liked ? <AiFillLike /> : <AiOutlineLike />} Like
            </span>
            <span
              className="footer-icons-new-post"
              onClick={handleShowComments}
            >
              <FaRegCommentDots /> Comment
            </span>
            <span className="footer-icons-new-post">
              <BiRepost /> Repost
            </span>
            <span className="footer-icons-new-post">
              <IoIosSend /> Send
            </span>
          </div>
        </Row>
        {showComments && <Comments post={post} />}
      </div>
    </>
  )
}

export default NewsFeedItem
