import React from 'react'
import { Dropdown, Menu, Form, Icon } from 'semantic-ui-react'

const filterOptions = [
  {
      key: 'active',
      text: 'Active Jobs',
      value: 'active'
  },
  {
    key: 'closed',
    text: 'Closed Jobs',
    value: 'closed'
  },
  {
    key: 'drafts',
    text: 'Drafts',
    value: 'drafts'
  }
];

const dateOptions = [
  {
    key: 'expired',
    text: 'Expired Jobs',
    value: 'expired'
  },
  {
    key: 'unexpired',
    text: 'Unexpired Jobs',
    value: 'unexpired'
  }
];


const JobFilterDropdown = () => (
  <div>
    <div>
      <label><Icon name='filter' /><b>Filter: </b></label>
      <Dropdown style={{paddingLeft: "3px"}} placeholder='Select filter' scrolling options={filterOptions} />
      <label style={{paddingLeft: "2rem"}}><Icon name='calendar alternate' /><b>Sort by date: </b></label>
      <Dropdown style={{paddingLeft: "3px"}} placeholder='Select date' scrolling options={dateOptions} />
    </div>
  </div>  
)


export default JobFilterDropdown

