import { NavDropdown } from "react-bootstrap";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

const TopNavWork = () => {
  return (
    <div className="d-flex">
      <div className="d-flex flex-column align-items-center pl-3">
        <BsFillGrid3X3GapFill size={20} />
        <NavDropdown title="Work" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </div>
      <div>
        <a href="#" id="trypremium">
          Try Premium for free
        </a>
      </div>
    </div>
  );
};
export default TopNavWork;
