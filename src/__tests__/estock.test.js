import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import "@testing-library/jest-dom";
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/Navbar/NewNavbar';
import Login from '../components/Login/Login';
import Home from '../components/Home';
import AddCompany from '../components/pages/AddCompany';
import ListCompany from '../components/pages/ListCompany';
import ViewCompany from '../components/pages/ViewCompany';
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
describe("Login",() => {
    it("should render Login Component",()=>{
        const wrapper = shallow(<Login/>);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
});
describe("Home",() => {
    it("should render Home Component",()=>{
        const wrapper = shallow(<Home/>);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
});
describe("AddCompany",() => {
    it("should render AddCompany Component",()=>{
        const wrapper = shallow(<AddCompany/>);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
});
describe("ListCompany",() => {
    it("should render ListCompany Component",()=>{
        const wrapper = shallow(<ListCompany/>);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
});
describe("ViewCompany",() => {
    it("should render ViewCompany Component",()=>{
        const wrapper = shallow(<ViewCompany/>);
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