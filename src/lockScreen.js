import React, { Component } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { baseFont, colorPrimary, colorPrimaryAccent } from './assets/fruits';
import { RFValue } from 'react-native-responsive-fontsize';
import Pinkeypad from './pinkeypad/index';

export default class keylockSetup extends Component {

    state = {
        selectedFocusPosition: "",
        isPinSet: false,
        resetPin: false,
        showFruit: false
    }

    async componentDidMount() {
        let selectedFocusPosition = await AsyncStorage.getItem("FOCUS_POSITION");
        this.setState({ selectedFocusPosition })
    }

    getPinKeyPadValue = (val) => {
        if (val.length == 4 && !this.state.isPinSet) {
            this.setState({ isPinSet: true }, () => {
                this.setState({ resetPin: true }, () => {
                    AsyncStorage.getItem("PIN")
                        .then((res) => {
                            if (res == val) {
                                Alert.alert("UNLOCKED", "Device unlocked successfully", [{
                                    text: 'Ok', style: "default"
                                }])
                            } else {
                                Alert.alert("UNLOCK FAILED", "Invalid pin", [{
                                    text: 'Dismiss', style: "cancel"
                                }])
                            }
                        })
                        .catch(err => {
                            Alert.alert("FAILED", "Invalid pin", [{
                                text: 'Dismiss', style: "cancel"
                            }])
                        })
                    this.setState({ resetPin: false, isPinSet: false })
                })

            })
        }
    }

    render() {
        const { selectedFocusPosition, resetPin, showFruit } = this.state;
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
                    width: '95%'
                }}>
                    <TouchableOpacity onPress={() => this.setState((prevState) => ({ showFruit: !prevState.showFruit }))}
                        style={{ alignItems: 'flex-end', padding: RFValue(8), margin: RFValue(8), backgroundColor: colorPrimaryAccent, alignSelf: "flex-end", borderRadius: 8 }}>
                        <Text style={{ fontFamily: baseFont, fontSize: RFValue(8) }}>TOGGLE FRUITS</Text>
                    </TouchableOpacity>

                    {selectedFocusPosition ? <Pinkeypad
                        subTitle={"UNLOCK DEVICE"}
                        subtitleStyle={{ color: colorPrimary, fontFamily: baseFont }}
                        getPinKeyPadValue={this.getPinKeyPadValue}
                        focusPosition={selectedFocusPosition}
                        showDot={false}
                        showInputedValue={showFruit}
                        resetPin={resetPin}
                        keyBackColor={"#f4f4f4"}
                        activePinInputColor={colorPrimary}
                        inactivePinInputColor={colorPrimaryAccent}
                    /> : <View />}
                </View>
            </SafeAreaView>
        );
    }
}