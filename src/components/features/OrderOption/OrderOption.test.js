import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption.js';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name='Lorem ipsum' type='blabla' />);
    expect(component).toBeTruthy();
    //console.log(component.debug());
  });
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });
  it('it should contain correct title in props "name"',() => {

    const component = shallow(<OrderOption name={'halo'} type={'dropdown'}/>);
    expect(component.find('h3').text()).toEqual('halo');
    //console.log(component.debug());
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
    { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: { currentValue: [mockProps.currentValue] },
  number: { currentValue: 1 },
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;

    beforeEach(() => {
      component = shallow(<OrderOption 
        type={type}
        {...mockProps}
        {...mockPropsForType[type]} />);
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });
      
    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
      
      console.log(component.debug());
      console.log(subcomponent.debug());
      //console.log(renderedSubcomponent.debug());
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        break;
      }
    }
  });
}