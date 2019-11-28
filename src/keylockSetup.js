import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { baseFont, colorPrimary, colorPrimaryAccent, white } from './assets/fruits';
import { RFValue } from 'react-native-responsive-fontsize';
import Pinkeypad from './pinkeypad/index';

export default class keylockSetup extends Component {

	state = {
		selectedFocusPosition: "",
		isPinSet: false,
		showFruit: false,
		pin: ""
	}

	async componentDidMount() {
		let selectedFocusPosition = await AsyncStorage.getItem("FOCUS_POSITION");
		this.setState({ selectedFocusPosition })
	}

	getPinKeyPadValue = (val) => {
		if (val.length == 4 && !this.state.isPinSet) {
			this.setState({ isPinSet: true, pin: val });
		}
	}

	_continue = () => {
		AsyncStorage.setItem("PIN", this.state.pin)
			.then(() => {
				Alert.alert("Pin Set", "Pin set successfully", [{
					text: 'Ok', style: "default"
				}]);
			})
			.catch(err => {
				return Alert.alert("Pin Failed", "Pin set failed", [{
					text: 'Dismiss', style: "cancel"
				}])
			});
		this.props.navigation.navigate("LockScreen");
	}

	render() {
		const { selectedFocusPosition, showFruit } = this.state;
		return (
			<SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>

				<View style={{
					borderRadius: 20,
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: 10
					},
					shadowOpacity: 0.2,
					shadowRadius: 10,
					elevation: 10,
					backgroundColor: '#fff',
					height: "90%",
					width: '95%',
					// paddingVertical: RFValue(18)
				}}>
					<TouchableOpacity onPress={() => this.setState((prevState) => ({ showFruit: !prevState.showFruit }))}
						style={{ alignItems: 'flex-end', padding: RFValue(8), margin: RFValue(8), backgroundColor: colorPrimaryAccent, alignSelf: "flex-end", borderRadius: 8 }}>
						<Text style={{ fontFamily: baseFont, fontSize: RFValue(8) }}>TOGGLE FRUITS</Text>
					</TouchableOpacity>

					{selectedFocusPosition ? <Pinkeypad
						subTitle={"SET PIN"}
						subtitleStyle={{ color: colorPrimary, fontFamily: baseFont }}
						getPinKeyPadValue={this.getPinKeyPadValue}
						focusPosition={selectedFocusPosition}
						showDot={false}
						showInputedValue={showFruit}
						keyBackColor={"#f4f4f4"}
						activePinInputColor={colorPrimary}
						inactivePinInputColor={colorPrimaryAccent}
					/> : <View />}
				</View>
				<TouchableOpacity onPress={() => this._continue()} style={{ backgroundColor: colorPrimaryAccent, padding: RFValue(16), borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: RFValue(20) }}>
					<Text style={{ ...styles.text, color: colorPrimary, fontSize: RFValue(14) }}>CONTINUE</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
	text: {
		fontFamily: baseFont,
		fontWeight: 'bold'
	}
});
