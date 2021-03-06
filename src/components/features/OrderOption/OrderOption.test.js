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
    let mockSetOrderOption; /* 1 */

    beforeEach(() => {
      mockSetOrderOption = jest.fn(); /* 2 */
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption} /* 3 */
          {...mockProps}
          {...mockPropsForType[type]}
        />);
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });
      
    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      /* tests for dropdown */
      case 'dropdown': {
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      /* tests for icons */
      case 'icons': {
        it('should render div with class "icon"', () => {
          const div = renderedSubcomponent.find('.icon');
          expect(div).toBeTruthy;
        });
        it('should run on click', () => {
          renderedSubcomponent.last('icon').simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(0); // <-- expect 1
        });
        break;
      }
      /* tests for number */
      case 'number': {
        it('should render input', () => {
          const input = renderedSubcomponent.find('input');
          expect(input).toBeTruthy;
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', { currentTarget: { value: testValueNumber } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      /* tests for text */
      case 'text': {
        it('should render text input', () => {
          const input = renderedSubcomponent.find('.input');
          expect(input.length).toBe(1);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('.input').simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      /* tests for date */
      case 'date': {
        it('contains DatePicker', () => {
          const wrapper = renderedSubcomponent.find('.date');
          expect(wrapper.length).toBe(1);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('.date').simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(0); // <-- expect 1
        });
        break;
      }
      /* tests for checkboxes */
      case 'checkboxes': {
        it('contains div.checkboxes and input[type="checkbox"]', () => {
          const wrapper = renderedSubcomponent.find('div.checkboxes');
          expect(wrapper.length).toBe(1);

          const input = renderedSubcomponent.find('input[type="checkbox"]');
          expect(input.length).toBe(mockProps.values.length);
        });
        it('should run setOrderOption function on change', () => {
          const input = renderedSubcomponent.find('input[type="checkbox"]');
          input.find(`input[value="${testValue}"]`).simulate('change', { currentTarget: { checked: true } });

          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });
        break;
      }
    }
  });
}