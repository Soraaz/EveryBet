'use strict';

// modules
import React from 'react';
import {Image} from 'react-native';
import {createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';

// components
import HomePage from './homePage/homePage';
import RegisterPage from './registerPage/registerPage.js';
import ProfilePage from './profilePage/profilePage';
import UserBetsPage from './userBetsPage/userBetsPage';
import BetProposalPage from './betProposalPage/betProposalPage';
import RankingPage from './rankingPage/rankingPage';
import TermsPage from './termsPage/termsPage';
import EditProfilePage from "./editProfilePage/editProfilePage";
import ContactPage from "./contactPage/contactPage";

// style
import commonStyle from './common/styleSheets/commonStyleSheet';

const HomeStack = createStackNavigator({
	Home: {
		screen: HomePage,
		navigationOptions: () => ({
			header: null
		})
	}
});

const ProfileStack = createStackNavigator({
	Profile: {
		screen: ProfilePage,
		navigationOptions: () => ({
			header: null
		})
	},
	Register: {
		screen: RegisterPage,
		navigationOptions: () => ({
			header: null
		})
	},
	EditProfile: {
		screen: EditProfilePage,
		navigationOptions: () => ({
			header: null
		})
	},
	UserBets: {
		screen: UserBetsPage,
		navigationOptions: () => ({
			header: null
		})
	},
	BetProposal: {
		screen: BetProposalPage,
		navigationOptions: () => ({
			header: null
		})
	},
	Terms: {
		screen: TermsPage,
		navigationOptions: () => ({
			header: null
		})
	},
	Contact: {
		screen: ContactPage,
		navigationOptions: () => ({
			header: null
		})
	},
});

const RankingStack = createStackNavigator({
	Ranking: {
		screen: RankingPage,
		navigationOptions: () => ({
			header: null
		})
	}
});

const navigator = createBottomTabNavigator(
	{
		Home: {
			screen: HomeStack,
			navigationOptions: {
				tabBarIcon: ({focused}) => ( //eslint-disable-line react/display-name, react/prop-types
					<Image
						source={focused
							? require('../assets/images/home_tab_active.png')
							: require('../assets/images/home_tab_inactive.png')
						}
						style={commonStyle.tabIcon}
					/>
				)
			}
		},
		Profile: {
			screen: ProfileStack,
			navigationOptions: {
				tabBarIcon: ({focused}) => ( //eslint-disable-line react/display-name, react/prop-types
					<Image
						source={focused
							? require('../assets/images/profile_tab_active.png')
							: require('../assets/images/profile_tab_inactive.png')
						}
						style={commonStyle.tabIcon}
					/>
				)
			}
		},
		Ranking: {
			screen: RankingStack,
			navigationOptions: {
				tabBarIcon: ({focused}) => ( //eslint-disable-line react/display-name, react/prop-types
					<Image
						source={focused
							? require('../assets/images/ranking_tab_active.png')
							: require('../assets/images/ranking_tab_inactive.png')
						}
						style={commonStyle.crownTabIcon}
					/>
				)
			}
		}
	}, {
		tabBarOptions: {
			activeTintColor: '#FFFFFF',
			activeBackgroundColor: '#37597F',
			inactiveTintColor: '#AAAAAA',
			inactiveBackgroundColor: '#37597F',
			showLabel: false,
			showIcon: true
		},
	}
);

export default createAppContainer(navigator);
