import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"


const Order = props => {

  document.title = "Dashboard | Skote - React Admin & Dashboard Template"

  return (
    <React.Fragment>
      <div className="page-content">
        <h1>this is order component</h1>
      </div>
    </React.Fragment>
  )
}

Order.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Order)
