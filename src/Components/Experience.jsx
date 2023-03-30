import { Button } from 'react-bootstrap'
import { EditModal } from './EditModal'
import { useSelector } from 'react-redux'
import ExperienceItem from './ExperienceItem'
const Experience = () => {
  const usersData = useSelector((state) => state.user.currentUser)
  const experience = useSelector((state) => state.experience.experience.content)
  console.log('the current experience is:', experience)
  const usersLoaded = useSelector((state) => state.user.usersLoaded)
  const experiencesLoaded = useSelector(
    (state) => state.experience.experience.experienceLoaded,
  )
  return (
    <>
      {/* <div id="profileContainer">
        <div id="lowerProfileCard"> */}
      {/* <EditModal /> */}

      <ul id="experienceList">
        {experiencesLoaded &&
          experience[0].map((exp) => (
            <li key={exp._id} className="formListItems line-clamp">
              <ExperienceItem data={exp} />
            </li>
          ))}
      </ul>
      {/* </div>
      </div> */}
    </>
  )
}
export default Experience
