import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://facebook.com/lebinh2k1" target="_blank" rel="noopener noreferrer">
          Le Binh
        </a>
        <span className="ms-1">&copy; Le Binh</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://facebook.com/lebinh2k1" target="_blank" rel="noopener noreferrer">
          Le Binh
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
