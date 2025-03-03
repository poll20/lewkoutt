import React from 'react'
import "./DahBoard"
import GlobalAlert from './GlobalAlert'
export default function DahBoard() {
  return (
    <div>
         <GlobalAlert/> {/* ✅ Ye ensure karega ki alert har component me dikhe */}
      <h1>hello dash</h1>
    </div>
  )
}
