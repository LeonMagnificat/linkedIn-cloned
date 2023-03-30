import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import BarLoader from 'react-spinners/BarLoader'

import {
  fetchUsers,
  fetchProfile,
  currentUser,
  fetchExperiences,
  fetchPostsList,
} from '../redux/actions'

import { Container, Row, Col } from 'react-bootstrap'
import HomePageLeft from './HomePageLeft'
import CreateNewPost from './CreateNewPost'
import HomePageRight from './HomePageRight'
import NewsFeedItem from './NewsFeedItem'
import { AiFillCaretDown } from 'react-icons/ai'
import ProfileRight from './ProfileRight'

import LinkedInFooter from './LinkedInFooter'

const Home = () => {
  const dispatch = useDispatch()
  const usersData = useSelector((state) => state.user.users)
  const currentUserData = useSelector((state) => state.user.currentUser)
  const usersLoaded = useSelector((state) => state.user.usersLoaded)
  const contact = useSelector((state) => state.user.contact)

  const postsList = useSelector((state) => state.posts.posts.postsList)
  const postsLoaded = useSelector((state) => state.posts.posts.postsLoaded)

  const [displayPosts, setDisplayPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [slice, setSlice] = useState(8)

  //const profilePostsList = useSelector((state) => state.posts.posts.profilePosts.slice().reverse());

  const profilePosts = useSelector((state) => state.posts.posts.profilePosts)

  //console.log("the profile posts are: ", profilePostsList);
  //console.log("the profile posts are: ", reverseProfilePostsList);

  useEffect(() => {
    setTimeout(() => {
      setSlice(6)

      setDisplayPosts(
        postsList[0]
          .slice(0, slice)
          .map((post) => <NewsFeedItem key={post._id} post={post} />),
      )

      setHasMore(true)
    }, 2000)
  }, [postsList])

  const addSlice = () => {
    setTimeout(() => {
      setDisplayPosts([...displayPosts, nextSlice()])

      setSlice(slice + 6)
      if (slice >= postsList[0].length) setHasMore(false)
    }, 1000)
  }

  const nextSlice = () => {
    return postsList[0]
      .slice(slice, slice + 6)
      .map((post) => <NewsFeedItem key={post._id} post={post} />)
  }

  const barloader = (isLoading) => {
    return (
      <div className="loader ml-5">
        loading={isLoading}
        height={5}
        width={'60vw'}
      </div>
    )
  }

  useEffect(() => {
    dispatch(fetchProfile())
    dispatch(fetchUsers())
    dispatch(fetchProfile())
    dispatch(fetchPostsList())
  }, [usersLoaded, profilePosts])

  return (
    <>
      {postsLoaded ? (
        <Container>
          <Row className="mt-4">
            <Col lg={3} className="pr-0">
              <HomePageLeft />
            </Col>
            <Col lg={5} className="px-0">
              <Row
                className="d-flex flex-column align-items-left mb-3"
                id="scroll"
              >
                <CreateNewPost className="main-feed-content px-0" />
                <div className="d-flex align-items-center">
                  <hr className="mt-3" />
                  <span>
                    Sort by: Top{' '}
                    <a href="#">
                      <AiFillCaretDown />
                    </a>
                  </span>
                </div>

                <InfiniteScroll
                  dataLength={displayPosts.length}
                  next={addSlice}
                  scrollThreshold={1.0}
                  hasMore={hasMore}
                  loader={BarLoader(hasMore)}
                >
                  <div className="feed mb-5">{displayPosts}</div>
                </InfiniteScroll>
              </Row>
            </Col>
            <Col lg={3} className="px-0">
              <ProfileRight />
              <LinkedInFooter />
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="grow" variant="secondary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  )
}

export default Home
