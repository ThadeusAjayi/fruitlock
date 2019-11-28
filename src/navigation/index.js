import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import KeylockSetup from '../keylockSetup';
import LockScreen from '../lockScreen';
import Onboarding from '../onboarding';

const routeNavigation = createSwitchNavigator(
	{
		Onboarding,
		KeylockSetup,
		LockScreen
	},
	{
		initialRouteName: 'Onboarding'
	}
);

const rootNavigation = createAppContainer(routeNavigation);

export default rootNavigation;
