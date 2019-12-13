import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render correct title and image', () => {
    const cost = 'Lorem ipsum';
    const name = 'image.jpg';
    const component = shallow(<TripSummary titleText={cost} imageSrc={name} />);

    const renderedTitle = component.find('.title').text();
    expect(renderedTitle).toEqual(expectedTitle);
    expect(component.find('.image').prop('src')).toEqual(expectedImage);
  });
  //   it('should throw error without required props', () => {
  //     expect(() => shallow(<TripSummary />)).toThrow();
  //   });
  it('should throw error', () => {
    const component = shallow(<TripSummary id image name cost days />);
    expect(component).toThrow();
    console.log(component.debug());
  });
});