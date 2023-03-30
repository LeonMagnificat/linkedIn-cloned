import { Container } from "react-bootstrap";
import { HiUserCircle } from "react-icons/hi";
import { useScrollPosition } from "../redux/actions/useScrollPosition";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const HiddenNav = () => {
  const usersData = useSelector((state) => state.user.currentUser);
  const scrollPosition = useScrollPosition();
  const location = useLocation();

  return (
    <div
      id="NavBottom"
      className={
        location.pathname === "/Profile" && scrollPosition > 400
          ? "translateYAnimation"
          : ""
      }
    >
      {usersData !== null && (
        <Container>
          <div className="d-flex justify-content-between">
            <div id="bottomNavLeft" className="d-flex align-itmes-center">
              <div className="d-flex align-items-center">
                <div id="bottomNavProfilePicBox">
                  <img
                    src={usersData.image}
                    className="img-fluid"
                    alt="profile-pic"
                  />
                </div>
              </div>
              <div
                id="bottomNavUserInfoBox"
                className="ml-3 d-flex flex-column justify-content-center"
                style={{ lineHeight: "16px" }}
              >
                <p className="m-0" style={{ fontWeight: "500" }}>
                  {usersData.name} {usersData.surname}
                </p>
                <p
                  className="m-0"
                  style={{ fontSize: "10pt", fontWeight: "300" }}
                >
                  {usersData.title}
                </p>
              </div>
            </div>
            <div id="bottomNavRight" className="d-flex align-items-center">
              <div>
                <button
                  id="moreBtn"
                  className=" rounded-pill bottomNavButtons mr-2"
                >
                  More
                </button>
              </div>
              <div>
                <button
                  id="addToProfileBtn"
                  className=" rounded-pill bottomNavButtons mr-2"
                >
                  Add profile section
                </button>
              </div>
              <div>
                <button
                  id="openBtn"
                  className="rounded-pill bottomNavButtons mr-2"
                >
                  Open to
                </button>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default HiddenNav;
