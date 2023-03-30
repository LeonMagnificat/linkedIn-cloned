import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, fetchProfile } from "../redux/actions";
import { BsPencil } from "react-icons/bs";
import axios from "axios";

function EditModal({ data }) {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.currentUser);

  const [show, setShow] = useState(false);
  const [name, setname] = useState(usersData.name);
  const [email, setemail] = useState(usersData.email);
  const [surname, setsurname] = useState(usersData.surname);
  const [title, settitle] = useState(usersData.title);
  const [bio, setbio] = useState(usersData.bio);
  const [area, setarea] = useState(usersData.area);
  const [username, setUsername] = useState("");

  const [selectedFile, setselectedFile] = useState();
  const [isFilePicked, setisFilePicked] = useState(false);

  const changeFileHandler = (event) => {
    setselectedFile(event.target.files[0]);
    setisFilePicked(true);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handleEditName = (event) => {
    setname(event.target.value);
    console.log(name);
  };

  const handleEditSurname = (event) => {
    setsurname(event.target.value);
    console.log(surname);
  };

  const handleEditEmail = (event) => {
    setemail(event.target.value);
    console.log(email);
  };

  const handleEditTitle = (event) => {
    settitle(event.target.value);
    console.log(title);
  };

  const handleEditBio = (event) => {
    setbio(event.target.value);
    console.log(bio);
  };

  const handleEditArea = (event) => {
    setarea(event.target.value);
    console.log(area);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name: name,
      surname: surname,
      email: email,

      title: title,
      bio: bio,
      area: area,
      image: usersData.image,
    };

    if (username !== "") {
      user.username = username;
    }
    console.log(user);
    console.log("We are editing users here");
    console.log("***************", usersData);

    const options = {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    };
    const fetchURL = `${process.env.REACT_APP_BE_URL}users/63ce71322d24291c669fab27`;
    // const fetchURL = 'https://striveschool-api.herokuapp.com/api/profile/'

    try {
      let response = await fetch(fetchURL, options);
      console.log(response);
      console.log("-------------------", user);
      if (response.ok) {
        console.log("Edit was successful");
        let usersData = await response.json();

        if (isFilePicked) {
          const url = `${process.env.REACT_APP_BE_URL}users/${usersData._id}/picture`;
          const formData = new FormData();
          formData.append("userPicture", selectedFile);
          const config = {
            method: "POST",
            headers: {
              "content-Type": "multipart/form-data",
            },
          };
          axios.post(url, formData, config).then((response) => {
            console.log(response.data);
          });
        }

        console.log(usersData);
        dispatch(fetchProfile());
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
      <div className="d-flex align-items-center">
        <Button id="editButton" onClick={handleShow}>
          <BsPencil size={20} />
        </Button>
        <a href={`https://fs0422-epicode-build-week-4-production.up.railway.app/profile/${usersData.username}/experiences/CSV`}>
          <button id="moreBtn" className="rounded-pill bottomNavButtons">
            Get Experiences as CSV
          </button>
        </a>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Intro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          * Indicates required
          <Form onSubmit={handleSubmit}>
            <Form.Label>First name*</Form.Label>
            <Form.Control type="text" onChange={handleEditName} value={name} />
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" onChange={handleEditSurname} value={surname} />
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={handleEditEmail} />
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={handleEditTitle} />
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={handleUsername} />
            <Form.Label>Bio</Form.Label>
            <Form.Control type="text" value={bio} onChange={handleEditBio} />
            <br />
            <Form.Label>Profile Image</Form.Label>
            <Form.Control type="file" onChange={changeFileHandler} />
            <br />
            <Form.Label>Area</Form.Label>
            <Form.Control type="text" value={area} onChange={handleEditArea} />
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

export default EditModal;
