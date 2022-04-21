import React from 'react';
import PropTypes from 'prop-types'

export default function Footer(props) {
  return (
    <div className="container-fluid footer fixed-bottom text-center" 
      style={{backgroundColor: "#FFF56D", color: "#3E065F"}}>
        {props.footNote}
    </div>
  )
}

Footer.propTypes = {
    footNote: PropTypes.string.isRequired
}

Footer.defaultProps = {
    footNote: "Your Footer Text goes here ..."
}