import React, { Component } from 'react';
import { View, SafeAreaView, Image, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { FOCUS_POSITION } from './utils/keyboardFruitMap';
import { baseFont, colorPrimary, white, colorPrimaryAccent } from './assets/fruits';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Onboarding extends Component {

    state = {
        selectedFocusPosition: FOCUS_POSITION.CENTER,
        colorSetUp: true
    }

    componentDidMount() { }

    resetFocusPosition(focus) {
        this.setState({ selectedFocusPosition: focus })
    }

    _keylockSetup = async () => {
        const { selectedFocusPosition, colorSetUp } = this.state;
        if (!selectedFocusPosition) return Alert.alert("Hello There", "Please select position of focus fruit", [{ text: 'Dismiss', style: 'cancel' }])
        await AsyncStorage.setItem("FOCUS_POSITION", selectedFocusPosition);
        await AsyncStorage.setItem("COLOR_SETUP", colorSetUp ? '1' : '0');
        this.props.navigation.navigate("KeylockSetup");
    }

    render() {
        const { selectedFocusPosition, colorSetUp } = this.state;
        return (
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>

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
                    height: "80%",
                    width: '95%',
                    padding: RFValue(18)
                }}>
                    <View style={{ flex: 1.5, justifyContent: 'space-evenly' }}>
                        <Text style={{ ...styles.text, fontSize: RFValue(28), color: colorPrimaryAccent }}>Get Started</Text>
                        <Text style={{ ...styles.text, fontSize: RFValue(24), color: "#4f4f4f" }}>Welcome to Fruit Lock</Text>
                        <Text style={{ ...styles.text, fontSize: RFValue(16), color: "#4f4f4f" }}>Please select position of focus fruit</Text>
                    </View>
                    <FlatList
                        style={{ flex: 1 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        data={Object.keys(FOCUS_POSITION).map(ky => ky)}
                        keyExtractor={(k, i) => (i + 64).toString()}
                        numColumns={3}
                        extraData={selectedFocusPosition}
                        renderItem={focusPosition => {
                            return <TouchableOpacity onPress={() => this.resetFocusPosition(focusPosition.item)} style={{ width: "28%", marginHorizontal: RFValue(4), backgroundColor: focusPosition.item == this.state.selectedFocusPosition ? colorPrimary : colorPrimaryAccent, marginVertical: RFValue(8), paddingVertical: RFValue(12), alignItems: 'center', justifyContent: 'center', borderRadius: RFValue(8) }}>
                                <Text style={{ color: focusPosition.item == this.state.selectedFocusPosition ? white : colorPrimary, fontSize: RFValue(12), ...styles.text }}>{focusPosition.item}</Text>
                            </TouchableOpacity>
                        }}
                    />
                    <TouchableOpacity onPress={() => this.setState((prevState) => ({ colorSetUp: !prevState.colorSetUp }))}
                        style={{ flexDirection: 'row', padding: RFValue(16), justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: baseFont, fontSize: RFValue(16), color: colorPrimary }}>USE COLOR ?</Text>
                        <Text style={{ fontFamily: baseFont, color: colorSetUp ? colorPrimary : colorPrimaryAccent }}>{colorSetUp ? "YES" : "NO"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._keylockSetup()} style={{ backgroundColor: colorPrimaryAccent, padding: RFValue(16), borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ ...styles.text, color: colorPrimary, fontSize: RFValue(14) }}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: baseFont,
        fontWeight: 'bold'
    }
});
