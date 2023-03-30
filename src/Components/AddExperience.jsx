import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, fetchProfile, fetchExperiences } from "../redux/actions";
import { BsPlus } from "react-icons/bs";
import axios from "axios";

function AddExperienceModal() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.currentUser);

  const [show, setShow] = useState(false);
  const [role, setrole] = useState("");
  const [company, setcompany] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [description, setdescription] = useState("");
  const [area, setarea] = useState("");
  const [selectedFile, setselectedFile] = useState();
  const [isFilePicked, setisFilePicked] = useState(false);

  const changeFileHandler = (event) => {
    setselectedFile(event.target.files[0]);
    setisFilePicked(true);
  };

  const handleRole = (event) => {
    setrole(event.target.value);
    console.log(role);
  };

  const handleCompany = (event) => {
    setcompany(event.target.value);
    console.log(company);
  };

  const handleStartDate = (event) => {
    setstartdate(event.target.value);
    console.log(startdate);
  };

  const handleEndDate = (event) => {
    setenddate(event.target.value);
    console.log(enddate);
  };

  const handledescription = (event) => {
    setdescription(event.target.value);
    console.log(description);
  };

  const handlearea = (event) => {
    setarea(event.target.value);
    console.log(area);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("We are editing users here");

    const experience = {
      role: role,
      company: company,
      startDate: startdate,
      endDate: enddate,
      description: description,
      area: area,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(experience),
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjBhOWM5NmRmYjAwMTUyMWE1YmMiLCJpYXQiOjE2NzA4MzYzOTMsImV4cCI6MTY3MjA0NTk5M30.tjYtW0usDncqSVyv5tqHhm6jzx297N87wMwUmb9BuAs",
      },
    };
    const fetchURL = `https://fs0422-epicode-build-week-4-production.up.railway.app/users/${usersData._id}/experiences`;

    try {
      let response = await fetch(fetchURL, options);
      console.log(response);
      if (response.ok) {
        console.log("Edit was successful");
        let experienceData = await response.json();

        if (isFilePicked) {
          const url = `https://fs0422-epicode-build-week-4-production.up.railway.app/profile/${usersData._id}/experiences/${experienceData._id}/picture`;
          const formData = new FormData();
          formData.append("picture", selectedFile);
          const config = {
            headers: {
              "content-Type": "multipart/form-data",
            },
          };
          axios.post(url, formData, config).then((response) => {
            console.log(response.data);
          });
        }

        console.log(experienceData);
        dispatch(fetchExperiences(usersData._id));
      }
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button id="editButton" onClick={handleShow}>
        <BsPlus size={30} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* * Indicates required */}
          <Form onSubmit={handleSubmit}>
            <Form.Label>Role:</Form.Label>
            <Form.Control type="text" onChange={handleRole} value={role} />
            <Form.Label>Company</Form.Label>
            <Form.Control type="text" onChange={handleCompany} value={company} />
            <Form.Label>Start Date: </Form.Label>
            <Form.Control type="date" value={startdate} onChange={handleStartDate} />
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" value={enddate} onChange={handleEndDate} />
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" value={description} onChange={handledescription} />
            <br />
            <Form.Label>Company Logo</Form.Label>
            <Form.Control type="file" onChange={changeFileHandler} />
            <br />
            <Form.Label>Area</Form.Label>
            <Form.Control type="text" value={area} onChange={handlearea} />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button type="Submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddExperienceModal;
