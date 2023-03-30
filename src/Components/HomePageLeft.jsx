import { useSelector } from "react-redux";
import { IoMdPersonAdd } from "react-icons/io";
import { BsFillBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const HomePageLeft = () => {
  const currentUserData = useSelector((state) => state.user.currentUser);

  return (
    <>
      <div className="left-feed-box">
        <div id="top-left-home">
          <div id="top-left-home-backgroundImage"></div>
          <div id="top-left-home-userprofile-pic">
            <img
              src={currentUserData.image}
              alt="profile pic"
              className="img-fluid"
            />
          </div>
        </div>
        <div id="top-left-home-bottom" className="text-center">
          <h6 className="m-0">Welcome, {currentUserData.name}!</h6>
          <a href="#" style={{ fontSize: "10pt" }}>
            Add a photo
          </a>
          <div className="top-left-line-breaks my-2"></div>
          <div className="top-left-link-boxes">
            <Link>
              <div className="top-left-home-section d-flex justify-content-between">
                <div className="text-left pl-3">
                  <p className="m-0">Connections</p>
                  <p className="m-0" style={{ color: "black" }}>
                    Grow your network
                  </p>
                </div>
                <div className="mr-4">
                  <IoMdPersonAdd size={30} />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <Link className="NoTextDec">
          <div className="top-left-line-breaks mb-0 mt-2 "></div>
          <div className="px-3 py-3 top-left-direct-link">
            <div>
              <p
                className="m-0"
                style={{ color: "gray", fontSize: "10pt", width: "175px" }}
              >
                Access exclusive tools & insights
              </p>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center mr-2">
                <div id="premiumBox"></div>
              </div>
              <div id="premiumTag">Try Premium for free</div>
            </div>
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }}>
          <div className="top-left-line-breaks my-0 "></div>
          <div className="d-flex px-3 py-3 top-left-direct-link">
            <div
              className="d-flex align-items-center"
              style={{ color: "#5E5E5E" }}
            >
              <BsFillBookmarkFill />
            </div>
            <p className="m-0 pl-2" style={{ color: "black" }}>
              My items
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HomePageLeft;
