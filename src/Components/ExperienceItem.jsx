import { Badge } from 'react-bootstrap'
import { RxDividerVertical } from 'react-icons/rx'
import EditModal from './EditModal'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import EditExperienceModal from './EditExperienceModal'
import AddExperience from './AddExperience'
import { useState } from 'react'

const ExperienceItem = ({ data }) => {
  const [hasImage, sethasImage] = useState(data.image)
  const me = useSelector((state) => state.user.currentUser)
  const meId = me._id

  return (
    <div id="profileContainer">
      <div id="lowerProfileCardExperience">
        <>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <h3>Experience</h3>
            </div>
            <div className="d-flex align-items-center">
              <AddExperience />
              <EditExperienceModal experience={data} />
            </div>
          </div>
        </>
        {meId !== data._id ? (
          <>
            <div className="d-flex">
              <div className="companylogo">
                {hasImage && (
                  <img
                    src={data.image}
                    alt="company logo"
                    className="img-fluid"
                  />
                )}
              </div>
              <div className="pl-2">
                <p>
                  <small>Role:</small>
                  <Badge variant="light">{data.role}</Badge>{' '}
                  <RxDividerVertical /> <small>Company:</small>
                  <Badge variant="light">{data.company}</Badge>
                </p>
                <p>
                  <small>Date:</small>
                  <Badge variant="light">
                    {format(new Date(data.startDate), 'MMM yyyy')}
                  </Badge>{' '}
                  -{' '}
                  <Badge variant="light">
                    {format(new Date(data.endDate), 'MMM yyyy')}
                  </Badge>
                </p>
                <p>{data.description}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className="companylogo">
                <img
                  src="https://www.pngitem.com/pimgs/m/189-1895934_i-clipart-building-clipart-of-a-building-hd.png"
                  alt="company logo"
                  className="img-fluid"
                />
              </div>
              <div>
                <p>
                  <small>Role:</small>
                  <Badge variant="light">{data.role}</Badge>{' '}
                  <RxDividerVertical /> <small>Company:</small>
                  <Badge variant="light">{data.company}</Badge>
                </p>
                <p>
                  <small>Date:</small>
                  <Badge variant="light">{data.startDate}</Badge> -{' '}
                  <Badge variant="light">{data.endDate}</Badge>
                </p>
                <p>
                  <Badge variant="dark">{data.description}</Badge>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default ExperienceItem
