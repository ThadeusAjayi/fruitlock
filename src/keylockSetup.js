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
		showInput: false,
		pin: "",
		useFruit: true
	}

	async componentDidMount() {
		let selectedFocusPosition = await AsyncStorage.getItem("FOCUS_POSITION");
		let isColorSetUp = await AsyncStorage.getItem('COLOR_SETUP');
		this.setState({ selectedFocusPosition, isColorSetUp });
	}

	getPinKeyPadValue = (val) => {
		if (val.length == 4 && !this.state.isPinSet) {
			this.setState({ isPinSet: true, pin: val });
		}
	}

	_continue = async () => {
		await AsyncStorage.setItem("SETUP_WITH_FRUIT", this.state.useFruit ? "1" : "0");
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
		const { selectedFocusPosition, showInput, useFruit, isColorSetUp } = this.state;
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
					height: "85%",
					width: '95%',
					// paddingVertical: RFValue(18)
				}}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<TouchableOpacity onPress={() => this.setState((prevState) => ({ showInput: !prevState.showInput }))}
							style={{ alignItems: 'flex-end', padding: RFValue(8), margin: RFValue(8), backgroundColor: colorPrimaryAccent, alignSelf: "flex-end", borderRadius: 8 }}>
							<Text style={{ fontFamily: baseFont, fontSize: RFValue(8) }}>SHOW INPUT</Text>
						</TouchableOpacity>
						{isColorSetUp == "1" && <TouchableOpacity onPress={() => this.setState((prevState) => ({ useFruit: !prevState.useFruit }))}
							style={{ alignItems: 'flex-end', padding: RFValue(8), margin: RFValue(8), backgroundColor: colorPrimaryAccent, alignSelf: "flex-end", borderRadius: 8 }}>
							<Text style={{ fontFamily: baseFont, fontSize: RFValue(8) }}>USING {useFruit ? "FRUITS" : "COLOR"}</Text>
						</TouchableOpacity>}
					</View>
					{selectedFocusPosition ? <Pinkeypad
						subTitle={"SET PIN"}
						subtitleStyle={{ color: colorPrimary, fontFamily: baseFont }}
						getPinKeyPadValue={this.getPinKeyPadValue}
						focusPosition={selectedFocusPosition}
						showDot={false}
						showInputedValue={showInput}
						useFruit={useFruit}
						keyBackColor={"#f4f4f4"}
						activePinInputColor={colorPrimary}
						inactivePinInputColor={colorPrimaryAccent}
					/> : <View />}
				</View>
				<TouchableOpacity onPress={() => this._continue()} style={{ backgroundColor: colorPrimaryAccent, padding: RFValue(16), borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: RFValue(15) }}>
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
