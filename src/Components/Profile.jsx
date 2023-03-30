import { Col, Container, Row } from 'react-bootstrap'
import ProfileHeader from './ProfileHeader'
import ProfileRight from './ProfileRight'
import EditExperienceModal from './EditExperienceModal'
import AddExperienceModal from './AddExperience'
import Experience from './Experience'

import ProfileSeePosts from './ProfileSeePosts'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchExperiences } from '../redux/actions'

import LinkedInFooter from './LinkedInFooter'
import Analytics from './Analytics'

const Profile = () => {
  const dispatch = useDispatch()
  const currentUserData = useSelector((state) => state.user.currentUser)
  const usersLoaded = useSelector((state) => state.user.usersLoaded)

  if (usersLoaded) {
    dispatch(fetchExperiences(currentUserData._id))
  }

  return (
    <>
      <Container className="mt-3">
        <div className=" d-flex justify-content-between">
          <div>
            <ProfileHeader />
            <Analytics />
            <Experience />
          </div>
          <Col xl={3}>
            <ProfileRight />
          </Col>
        </div>
        <div className="mt-4">
          <LinkedInFooter />
        </div>
      </Container>
    </>
  )
}

export default Profile
