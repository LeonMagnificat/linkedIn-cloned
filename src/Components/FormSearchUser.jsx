import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getContactAction, getContactExperiences } from "../redux/actions";

const FormSearchUser = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <Link
      to={`${user.name}-${user.surname}`}
      onClick={() => {
        dispatch(getContactAction(user));
        dispatch(getContactExperiences(user._id));
      }}
    >
      <div>
        <Image src={user.image} fluid id="rightSideUserImg" />
        <span className="ml-3">
          {user.name} {user.surname}
        </span>
      </div>
    </Link>
  );
};
export default FormSearchUser;
