import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import "@testing-library/jest-dom";
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/Navbar/NewNavbar';
import AddCompany from '../components/pages/AddCompany';
import Home from '../components/Home';
import {App} from '../App';


Enzyme.configure({adapter: new Adapter()});
test('full app rendering', async()=>{
    const history = createMemoryHistory()
    render(
        <Router location={history.location} navigator={history}>
            <App/>
        </Router>,
    )
    const user = userEvent.setup();
    expect(screen.getByTitle(/E-Stock Market/i)).toBeInTheDocument();
    await user.click(screen.getByText(/Login/i))
    expect(screen.getElements(/NavBar/i)).toBeInTheDocument()

})
describe("Home",() => {
    it("should render Home Component",()=>{
        const wrapper = shallow(<Home/>);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
});
describe("<Navbar/>",()=>{
    it("renders text input correctly",()=>{
        const navcomponent = shallow(<Navbar/>);
        const navLinks = navcomponent.find('Link');
        navLinks.simulate('click');
        const element= navcomponent.find('div div');
        expect (element.length).toBe(0);
        //expect(navcomponent.getElements()).toBeVisible();
    });
});
describe("<AddCompany/>",()=>{
    it("renders text input correctly",()=>{
        const addcomponent = shallow(<AddCompany/>);
        const form = addcomponent.find('input');
        form.props().onChange({target:{
            name: 'companyname',
            value : 'companyname'
        }})
        expect(addcomponent.state('input')).toBeDefined();
    });
});