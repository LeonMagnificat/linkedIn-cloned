import { useState, useSelector } from "react";
import { Button, ResponsiveEmbed } from "react-bootstrap";
import axios from "axios";
import { BsFillImageFill } from "react-icons/bs";

const ImageUpload = () => {
  const [selectedFile, setselectedFile] = useState();
  const [isFilePicked, setisFilePicked] = useState(false);

  const changeHandler = (event) => {
    setselectedFile(event.target.files[0]);
    console.log(selectedFile);
    setisFilePicked(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    // const url =
    //   'https://striveschool-api.herokuapp.com/api/profile/6396f0a9c96dfb001521a5bc/picture'
    const myProfileId = process.env.REACT_APP_MY_PROFILE_ID;
    const url = `${process.env.REACT_APP_BE_URL}/users/${myProfileId}/picture`;
    const formData = new FormData();
    // formData.append("post", selectedFile);
    formData.append("userPicture", selectedFile);
    const config = {
      headers: {

        "content-Type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <>
      <label for="actual-btn">
        <BsFillImageFill
          className="ml-3 mr-2 upload-post-image"
          onChange={changeHandler}
        />
      </label>
      <input id="actual-btn" type="file" onChange={changeHandler} hidden />
      {isFilePicked && <span>{selectedFile.name}</span>}
    </>
  );
};

export default ImageUpload;
