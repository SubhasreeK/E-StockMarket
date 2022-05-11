import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Home from '../components/Home';
Enzyme.configure({adapter: new Adapter()});
describe("Home",() => {
    it("should render Home Component",()=>{
        const wrapper = shallow(<Home/>);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
});