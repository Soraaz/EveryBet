import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});


import chai from "chai";
import chaiJestSnapshot from "chai-jest-snapshot";
import chaiAsPromised from "chai-as-promised";
import sinonChai from "sinon-chai";

chai.use(chaiJestSnapshot);
chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);
global.sinon = require("sinon");
global.expect = require("chai").expect;


/* eslint-disable */
jest.mock('react-navigation', () => {
    return {
        createAppContainer: jest.fn().mockReturnValue(function NavigationContainer(props) {
            return null;
        }),
        createDrawerNavigator: jest.fn(),
        createMaterialTopTabNavigator: jest.fn(),
        createStackNavigator: jest.fn(),
        createBottomTabNavigator: jest.fn(),
        withNavigation: jest.fn((object) => {
            return object;
        }),
        NavigationEvents: jest.fn(() => {
            return null;
        }),
        StackActions: {
            push: jest.fn().mockImplementation(x => ({...x, "type": "Navigation/PUSH"})),
            replace: jest.fn().mockImplementation(x => ({...x, "type": "Navigation/REPLACE"})),
        },
        NavigationActions: {
            navigate: jest.fn().mockImplementation(x => x),
        }
    };
});
jest.mock('expo', ()=>({
    Permissions: {
        askAsync: jest.fn()
    },
    Notifications: {
        getExpoPushTokenAsync: jest.fn(),
        addListener: jest.fn()
    }
}));
/* eslint-enable */

jest.mock('../services/BetsService');
jest.mock('../services/UsersService');
jest.mock('../services/APIToolsService');
