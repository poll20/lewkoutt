import React,{useEffect} from 'react'
import "./DahBoard"
import GlobalAlert from './GlobalAlert'
import { useOrderAlert } from './OrderAlertProvider';

export default function DahBoard() {

  return (
    <div>
         <GlobalAlert/> {/* ✅ Ye ensure karega ki alert har component me dikhe */}
      <h1>hello dash</h1>
    </div>
  )
}
