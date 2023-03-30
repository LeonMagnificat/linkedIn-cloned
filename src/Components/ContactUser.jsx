import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'

const ContactUser = () => {
  const contact = useSelector((state) => state.user.contact)
  const contactExperiences = useSelector(
    (state) => state.user.contactExperiences,
  )
  console.log("contact's experiences: ", contactExperiences)
  const usersLoaded = useSelector((state) => state.user.usersLoaded)
  return (
    <>
      <div id="profileContainer">
        <div id="upperCardBackgroundImage"></div>
        <div id="userProfilePic">
          <img
            className="profile-image img-fluid"
            src={contact.image}
            alt={contact.name}
          />
        </div>
        <div id="lowerProfileCard">
          <b>
            {contact.name} {contact.surname}
          </b>
          <br />
          {contact.title}
          <br />
          {contact.area} - <a href="#">Contact Info</a>
          <br />
          <a href="#">1 Connection</a>
          <br />
          <br />
          <Button className="mr-3" variant="primary">
            Connect
          </Button>
          <Button className="mr-3" variant="outline-primary">
            Send Message
          </Button>
          <Button variant="outline-dark">More</Button>
        </div>
      </div>
    </>
  )
}
export default ContactUser
