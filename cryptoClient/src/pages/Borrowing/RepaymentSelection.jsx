import React from 'react'
import LeftPanel from '../Dashboard/components/LeftPanel'
import LoanRepayment from './LoanRepayment'

function RepaymentSelection() {
  return (
    <div className='flex'>
        <LeftPanel />
        <LoanRepayment />
    </div>
  )
}

export default RepaymentSelection