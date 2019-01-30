import React from 'react'
import { shallow } from 'enzyme'

import SortControls from '../SortControls.component'

describe('Testing SortControls component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <SortControls />,
    )
    expect(wrapper).toMatchSnapshot()
    wrapper.setProps({
      containerStyle: {
        width: '100%',
      },
      direction: 'column',
      controls: [
        {
          iconUp: {
            name: 'triangle-up',
          },
          iconDown: {
            name: 'triangle-up',
          },
          asc: true,
          active: true,
          label: 'asd',
          onPress: () => {},
          containerStyle: {
            width: '100%',
          },
          labelStyle: {
            width: '100%',
          },
        },
      ],
    })
    expect(wrapper).toMatchSnapshot()
  })
})
