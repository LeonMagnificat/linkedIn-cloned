import { BsFillEyeFill } from 'react-icons/bs'
import { MdPeopleAlt } from 'react-icons/md'

const Analytics = () => {
  return (
    <div id="analyticsContainer" className="mt-3 mb-3">
      <div>
        <h3>Analytics</h3>
        <div className="d-flex">
          <div>
            <BsFillEyeFill size={20} />
          </div>
          <p>Private to you</p>
        </div>
      </div>
      <div className="d-flex">
        <div>
          <MdPeopleAlt size={20} />
        </div>
        <div>
          <h6 style={{ paddingLeft: '.5em', margin: '0' }}>
            100 profile views
          </h6>
          <p>Update your profile to attract viewers</p>
        </div>
      </div>
    </div>
  )
}

export default Analytics
