import React from 'react'
import { Dropdown, Menu, Form, Icon } from 'semantic-ui-react'

const getOptions = (number, prefix = 'Choice ') =>
  _.times(number, (index) => ({
    key: index,
    text: `${prefix}${index}`,
    value: index,
  }))

const JobFilterDropdown = () => (
  <div>
    <div>
      <label><Icon name='filter' /><b>Filter: </b></label>
      <Dropdown style={{paddingLeft: "3px"}} placeholder='Select filter' scrolling options={getOptions(15)} />
      <label style={{paddingLeft: "2rem"}}><Icon name='calendar alternate' /><b>Sort by date: </b></label>
      <Dropdown style={{paddingLeft: "3px"}} placeholder='Select date' scrolling options={getOptions(15)} />
    </div>
  </div>  
)


export default JobFilterDropdown

