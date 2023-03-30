import { Badge } from "react-bootstrap";
import { RxDividerVertical } from "react-icons/rx";
import EditModal from "./EditModal";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const ExperienceContactItem = ({ data }) => {
  const experiences = useSelector((state) => state.user.currentUser);

  return (
    <div id="profileContainer">
      <div id="lowerProfileCardExperience">
        <div>
          <h3>Experience</h3>
        </div>
        <div className="d-flex">
          <div className="companylogo">
            <img
              src="https://www.pngitem.com/pimgs/m/189-1895934_i-clipart-building-clipart-of-a-building-hd.png"
              alt="buisiness logo"
              className="img-fluid"
            />
          </div>
          <div>
            <p>
              <small>Role:</small>
              <Badge variant="light">
                {data.role}
              </Badge> <RxDividerVertical /> <small>Company:</small>
              <Badge variant="light">{data.company}</Badge>
            </p>
            <p>
              <small>Date:</small>
              <Badge variant="light">
                {format(new Date(data.startDate), "MMM yyyy")}
              </Badge>{" "}
              -{" "}
              <Badge variant="light">
                {data.endDate === undefined
                  ? "Current"
                  : format(new Date(data.endDate), "MMM yyyy")}
              </Badge>
            </p>
            <p>
              <Badge variant="dark">{data.description}</Badge>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExperienceContactItem;
