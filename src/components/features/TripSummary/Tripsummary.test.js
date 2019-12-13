import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate correct adress /trip/abc', () => {
    const id = 'abc';
    const component = shallow(<TripSummary id={id}/>);

    expect(component.find('.link').prop('to').toEqual('/trip/${id}'));
  });

  it('should <src> have correct src and alt', () => {
    const exSrc = 'image';
    const exAlt = 'imagetext';
    const component = shallow(<TripSummary image={exSrc} name={exAlt} />);

    expect(component.find('img').prop('src').toEqual('exSrc'));
    expect(component.find('img').prop('alt').toEqual('exAlt'));
  });
  it('should render correct props name, cost, days', () => {
    
  });
});