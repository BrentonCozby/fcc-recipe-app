import React from 'react'

import './Overlay.css'

const Overlay = ({ hideOverlayThings }) => (
    <div onClick={hideOverlayThings} className="Overlay"></div>
)

Overlay.propTypes = {
    hideOverlayThings: React.PropTypes.func.isRequired
}

export default Overlay
