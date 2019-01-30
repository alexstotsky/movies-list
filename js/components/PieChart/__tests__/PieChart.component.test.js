import React from 'react'
import { shallow } from 'enzyme'

import PieChart from '../PieChart.component'

describe('Testing PieChart component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <PieChart />,
    )
    expect(wrapper).toMatchSnapshot()
    wrapper.setProps({
      data: [
        {
          number: 15,
          name: '15',
        },
      ],
      selectedPadding: 10,
      innerRadius: 20,
      pieHeight: 15,
      pieWidth: 15,
    })
    expect(wrapper).toMatchSnapshot()
  })
})
