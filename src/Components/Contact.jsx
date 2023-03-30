import ContactUser from "./ContactUser";
import ProfileRight from "./ProfileRight";
import ExperienceContact from "./ExperienceContact";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { getContactExperiences } from "../redux/actions";
import { useParams } from "react-router-dom";

const Contact = () => {
  const params = useParams();
  console.log("params is: ", params);

  return (
    <>
      <Container className="mt-3">
        <div className=" d-flex justify-content-between">
          <div>
            <ContactUser />
            <ExperienceContact />
          </div>
          <Col>
            <ProfileRight />
          </Col>
        </div>
      </Container>
    </>
  );
};
export default Contact;
