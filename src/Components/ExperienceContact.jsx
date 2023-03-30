import { Button } from "react-bootstrap";
import { EditModal } from "./EditModal";
import { useSelector } from "react-redux";
import ExperienceContactItem from "./ExperienceContactItem";
const ExperienceContact = () => {
  const contact = useSelector((state) => state.user.contact);
  const experiences = useSelector((state) => state.user.contactExperiences);
  const experiencesLength = experiences.length;
  console.log("the current experience is:", experiences);
  const usersLoaded = useSelector((state) => state.user.usersLoaded);
  return (
    <>
      {/* <div id="profileContainer">
        <div id="lowerProfileCard"> */}
      {/* <EditModal /> */}

      <ul id="experienceList">
        {experiencesLength > 0 ? (
          experiences[0].map((exp) => (
            <li key={exp._id} className="formListItems line-clamp">
              <ExperienceContactItem data={exp} />
            </li>
          ))
        ) : (
          <h2>No experience</h2>
        )}
      </ul>
      {/* </div>
      </div> */}
    </>
  );
};
export default ExperienceContact;
