import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { baseFont, colorPrimary } from '../assets/fruits';
import { mapKeysToFruitTrio, matchNumberToFruit, matchNumberToColor } from '../utils/keyboardFruitMap';

/**
 * @props getButtonValue Function returns value of pressed button
 * @props keypadButtonTextStyle styles keypad text
 * @props keyBackColor styles keypad button back color
 * @props numOfPinChars styles pin input default 4
 * @props activePinInputColor styles keypad button back color
 * @props inactivePinInputColor styles keypad button back color
 */
export default class PinKeyPad extends Component {
	state = {
		pin: [],
		pinLength: null,
		inputWidth: 0
	};

	UNSAFE_componentWillMount() {
		let keypadKeys = mapKeysToFruitTrio(this.props.focusPosition);
		this.setState({ keypadKeys });
		let arrayLength = this.props.pinLength;
		if (arrayLength) {
			let pinLength = [];
			let count = 0;
			do {
				pinLength.push('');
				count++;
			} while (count < arrayLength);
			this.setState({ pinLength });
		}
	}

	componentDidUpdate(nextProps) {
		let pin = this.state.pin;
		this.props.getPinKeyPadValue(pin.join().replace(/,/g, ''));
	}

	onLayout = (e) => {
		const { width, y, x, height } = e.nativeEvent.layout;
		this.setState({ inputWidth: width });
	};

	render() {
		let { pin, inputWidth, keypadKeys } = this.state;
		let formattedInput;
		let decimal;
		if (this.props.moneyInput) {
			// formattedInput = formatMoney(pin.join().replace(/,/g, ""));
			// decimal = formattedInput.split(".");
			// formattedInput = [decimal[0]];
			// decimal = decimal[1];
			formattedInput = ""
		} else {
			formattedInput = pin;
		}
		return (
			<View
				style={{
					flex: 1
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "space-around",
						//alignItems: "center",
						paddingVertical: RFValue(20),
						paddingHorizontal: RFValue(16)
					}}
				>
					{!this.props.customHeader && <Text
						style={{
							...style.subTitle,
							...this.props.subtitleStyle,
							marginTop: RFValue(10)
						}}
					>
						{this.props.subTitle}
					</Text>}
					{this.props.customHeader && this.props.customHeader()}
					<View
						style={{
							marginVertical: RFValue(20),
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						{/* Empty fields */}
						{!this.props.moneyInput && (
							<View
								style={{
									flexDirection: "row"
								}}
								onLayout={this.onLayout}
							>
								{this.state.pinLength &&
									this.state.pinLength.map((item, i) => (
										<View
											key={i + 50}
											style={{
												height: RFValue(10),
												width: RFValue(10),
												borderRadius: RFValue(5),
												backgroundColor:
													this.props.inactivePinInputColor || "#F9F9F999",
												marginHorizontal: RFValue(10)
											}}
										/>
									))}
								{!this.state.pinLength &&
									["", "", "", ""].map((item, i) => (
										<View
											key={i + 10}
											style={{
												height: RFValue(10),
												width: RFValue(10),
												borderRadius: RFValue(5),
												backgroundColor:
													this.props.inactivePinInputColor || "#F9F9F999",
												marginHorizontal: RFValue(10)
											}}
										/>
									))}
							</View>
						)}
						{/* Inputed fields */}
						<View style={{
							position: "absolute",
							width: inputWidth
						}}>
							{!this.props.showInputedValue && (
								<View
									style={{
										flexDirection: "row",
										alignSelf: 'flex-start'
									}}
								>
									{this.state.pin.length > 0 &&
										this.state.pin.map((item, i) => (
											<View
												key={i + 20}
												style={{
													height: RFValue(10),
													width: RFValue(10),
													borderRadius: RFValue(5),
													backgroundColor:
														this.props.activePinInputColor || "#ffffff",
													marginHorizontal: RFValue(10)
												}}
											/>
										))}
								</View>
							)}
						</View>
						{/* show inputed fields when color */}
						<View style={{
							position: "absolute",
							width: inputWidth
						}}>
							{this.props.showInputedValue && !this.props.useFruit && (
								<View
									style={{
										flexDirection: "row",
										alignSelf: 'flex-start'
									}}
								>
									{this.state.pin.length > 0 &&
										this.state.pin.map((item, i) => (
											<View
												key={i + 20}
												style={{
													height: RFValue(10),
													width: RFValue(10),
													borderRadius: RFValue(5),
													backgroundColor: matchNumberToColor(item),
													// this.props.activePinInputColor || "#ffffff",
													marginHorizontal: RFValue(10)
												}}
											/>
										))}
								</View>
							)}</View>
						{/* Show inputed fields when is fruit */}
						{this.props.showInputedValue && this.props.useFruit && (
							<View
								style={{
									flexDirection: "row",
									position: "absolute",
									justifyContent: "flex-start",
									backgroundColor: "#ffffff",
									width: inputWidth
								}}
							>
								{this.props.moneyInput && (
									<Text
										style={{
											color: this.props.activePinInputColor,
											fontFamily: baseFont,
											fontSize: RFValue(20),
											lineHeight: RFValue(30)
										}}
									>
										{"\u20A6"}
									</Text>
								)}
								{this.props.showInputedValue &&
									this.state.pin.length > 0 &&
									this.state.pin.map((item, i) => {
										let fruit = matchNumberToFruit(item);
										return <Image
											source={fruit}
											key={i + 30}
											style={{
												marginHorizontal: RFValue(3),
												width: RFValue(22), height: RFValue(22), resizeMode: 'contain'
											}}
										/>
									})}
								{/* {this.props.showInputedValue &&
									formattedInput.length > 0 &&
									formattedInput.map((item, i) => (
										<Text
											key={i + 30}
											style={{
												color: this.props.activePinInputColor,
												fontFamily: baseFont,
												fontSize: RFValue(30),
												marginHorizontal: this.props.moneyInput ? 0 : RFValue(6)
											}}
										>
											{item}
										</Text>
									))} */}
								{this.props.moneyInput && (
									<Text
										style={{
											color: this.props.activePinInputColor,
											fontFamily: baseFont,
											fontSize: RFValue(20),
											lineHeight: RFValue(25)
										}}
									>
										.{decimal}
									</Text>
								)}
							</View>
						)}
					</View>
				</View>
				<View
					style={{
						flex: 3,
						paddingHorizontal: RFValue(20),
						justifyContent: "center"
					}}
				>
					<FlatList
						data={keypadKeys || []}
						numColumns={3}
						columnWrapperStyle={{
							justifyContent: "center",
							alignContent: "center",
							alignItems: 'center'
						}}
						scrollEnabled={false}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item, ind) => (ind * 20).toString()}
						renderItem={item => {
							return <_KeyPadItem
								xColor={this.props.xColor}
								keyBackColor={this.props.keyBackColor}
								keyVal={item}
								showDot={this.props.showDot}
								getButtonValue={this.props.getButtonValue}
								getPinKeyPadValue={this.props.getPinKeyPadValue}
								setPin={this._setPin}
								resetPin={this._resetPin(this.props.resetPin)}
								deletePin={this._deletePin}
								keypadButtonStyle={this.props.keypadButtonStyle}
								keypadButtonTextStyle={this.props.keypadButtonTextStyle}
							/>
						}}
					/>
				</View>
			</View>
		);
	}

	_setPin = (pin) => {
		let newPin = this.state.pin;
		if (this.state.pinLength) {
			if (newPin.length > this.state.pinLength.length - 1) return;
		} else {
			if (newPin.length > 3) return;
		}
		newPin.push(pin);
		let dotOccurrence = 0;
		pin = newPin
			.map((am) => {
				if (am === '.' && dotOccurrence < 1) {
					dotOccurrence = 1;
					return am;
				}
				if (am !== '.') {
					return am;
				}
			})
			.filter((i) => i != undefined);
		this.setState({ pin });
	};

	_resetPin = (shouldResetPin) => {
		let keypadKeys = mapKeysToFruitTrio(this.props.focusPosition);
		shouldResetPin && this.setState({ pin: [], keypadKeys });
	};

	_deletePin = () => {
		if (this.state.pin.length < 1) return;
		let newPin = this.state.pin;
		if (newPin[newPin.length - 1] === '.') {
			newPin.splice(newPin.length - 2, 2);
		} else {
			newPin.pop();
		}
		this.setState({ pin: newPin });
	};
}

const style = StyleSheet.create({
	title: {
		fontFamily: baseFont,
		fontSize: RFValue(16),
		color: 'white',
		textAlign: 'center',
		lineHeight: RFValue(20)
	},
	subTitle: {
		fontFamily: baseFont,
		fontSize: RFValue(16),
		color: 'white',
		textAlign: 'center'
	}
});

const _KeyPadItem = (props) => {
	const { item } = props.keyVal;
	if (item.buttonValue === '.') {
		return props.showDot ? (
			<View
				style={{
					flex: 1,
					//borderColor: props.borderColor || "#F9F9F999",
					...props.keypadButtonStyle,
					alignItems: 'center'
				}}
			>
				<TouchableOpacity
					style={{
						flex: 1,
						margin: RFValue(8),
						paddingVertical: RFValue(2),
						...buttonBorderStyle(item.index)
					}}
					onPress={() => props.setPin(item.buttonValue)}
				>
					<Text
						style={{
							textAlign: 'center',
							fontFamily: baseFont,
							color: 'white',
							fontSize: RFValue(30),
							...props.keypadButtonTextStyle
						}}
					>
						{item.buttonValue}
					</Text>
				</TouchableOpacity>
			</View>
		) : (
				<View style={{
					flex: 1,
					alignItems: 'center'
				}} />
			);
	} else if (item.buttonValue == 'DELETE') {
		return (
			<View
				style={{
					flex: 1,
					...props.keypadButtonStyle,
					justifyContent: 'center'
				}}
			>
				<TouchableOpacity
					style={{
						flex: 1,
						margin: RFValue(8),
						paddingVertical: RFValue(2),
						...buttonBorderStyle(item.index),
						justifyContent: 'center'
					}}
					onPress={() => props.deletePin()}
				>
					<Text
						style={{
							textAlign: 'center',
							fontFamily: baseFont,
							color: colorPrimary,
							fontSize: RFValue(12),
							...props.keypadButtonTextStyle
						}}
					>
						{item.buttonValue}
					</Text>
				</TouchableOpacity>
			</View>
		);
	} else {
		return (
			<View
				style={{
					flex: 1,
					...props.keypadButtonStyle,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<TouchableOpacity
					style={{
						margin: RFValue(8),
						padding: RFValue(8),
						backgroundColor: item.color || 'rgba(255,255,255,0.2)',
						...buttonBorderStyle(item.buttonValue),
						flexDirection: 'row',
						alignItems: 'center'

					}}
					onPress={() => {
						props.getButtonValue && props.getButtonValue(item.buttonValue);
						props.setPin(item.buttonValue);
					}}
				>
					{item.fruitOrder.map((fruitImage, ind) => <Image key={ind * 20} source={fruitImage}
						style={{ width: RFValue(22), height: RFValue(22), resizeMode: 'contain' }} />)}
				</TouchableOpacity>
			</View>
		);
	}
};

const buttonBorderStyle = (index) => {
	if (index == 1 || index == 4 || index == 7) {
		return {
			justifyContent: 'center',
			alignSelf: 'center',
			alignContent: 'center',
			height: RFValue(70),
			width: RFValue(70),
			borderRadius: RFValue(35)
		};
	} else if (index == 10) {
		return {
			justifyContent: 'center',
			alignSelf: 'center',
			alignContent: 'center',
			height: RFValue(70),
			width: RFValue(70),
			borderRadius: RFValue(35)
		};
	} else if (index == 0 || index == 3 || index == 6) {
		return {
			justifyContent: 'center',
			// alignSelf: 'flex-start',
			alignContent: 'center',
			height: RFValue(70),
			width: RFValue(70),
			borderRadius: RFValue(35)
		};
	} else if (index == 2 || index == 5 || index == 8) {
		return {
			justifyContent: 'center',
			// alignSelf: 'flex-end',
			alignContent: 'center',
			height: RFValue(70),
			width: RFValue(70),
			borderRadius: RFValue(35)
		};
	} else if (index == 11) {
		return {
			justifyContent: 'center',
			// alignSelf: 'flex-end',
			alignContent: 'center',
			height: RFValue(70),
			width: RFValue(70),
			borderRadius: RFValue(35)
		};
	} else {
		return {
			justifyContent: 'center',
			alignSelf: 'center',
			alignContent: 'center',
			height: RFValue(70),
			width: RFValue(70),
			borderRadius: RFValue(35)
		};
	}
};

const keyPadValAlign = (index) => {
	if (index == 1 || index == 4 || index == 7 || index == 10) {
		return {
			textAlign: 'center'
		};
	} else if (index == 0 || index == 3 || index == 6 || index == 9) {
		return {
			textAlign: 'center'
		};
	} else {
		return {
			textAlign: 'center'
		};
	}
};
