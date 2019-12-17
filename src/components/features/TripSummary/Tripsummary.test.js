import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate correct adress /trip/abc', () => {
    const id = 'abc';
    const component = shallow(<TripSummary tags={[]}
      id={id}/>);

    expect(component.find('Link').prop('to')).toEqual(`/trip/${id}`);
  });

  it('should <src> have correct src and alt', () => {
    const imageSrc = 'image';
    const imageAlt = 'imagetext';
    const component = shallow(<TripSummary tags={[]} image={imageSrc} name={imageAlt} />);

    expect(component.find('img').prop('src')).toEqual(imageSrc);
    expect(component.find('img').prop('alt')).toEqual(imageAlt);
  });
  it('should render correct props name, cost, days', () => {
    const component = shallow(<TripSummary tags={[]} name={'correctname'} cost={'correctcost'} days={7}/>);

    expect(component).toBeTruthy();
    // console.log(component.debug());
  });

  it('should throw error if id, image, name, const, days props are missing', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('it should render [tags] with correct sequences', () => {
    const tagsArray = ['sec', 'min', 'hour'];
    const component = shallow(<TripSummary tags={tagsArray} />);

    expect(component.find('.tags span').at(0).text()).toEqual(tagsArray[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(tagsArray[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(tagsArray[2]);
    //console.log(component.debug());
  });
  it('div.tags it should not shown when tags.array is empty or undefined', () => {
    const component = shallow(<TripSummary tags={[]} />);

    expect(component.exists('div.tags')).toEqual(true);
    //console.log(component.debug());
  });
});