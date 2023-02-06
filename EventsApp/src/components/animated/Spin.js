import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";

import WheelOfFortune from "react-native-wheel-of-fortune";

const participants = ["10", "20", "30", "40", "50", "60", "70", "90", "100"];
class Spin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
    };
    this.child = null;
  }

  buttonPress = () => {
    this.setState({
      started: true,
    });
    this.child._onPress();
  };

  render() {
    const wheelOptions = {
      rewards: participants,
      knobSize: 30,
      borderWidth: 5,
      borderColor: "#fff",
      innerRadius: 30,
      duration: 6000,
      backgroundColor: "transparent",
      textAngle: "horizontal",
      knobSource: require("../../assets/images/knob.png"),
      onRef: (ref) => (this.child = ref),
    };
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            this.setState({ winnerValue: value, winnerIndex: index });
          }}
        />
        {!this.state.started && (
          <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => this.buttonPress()}
              style={styles.startButton}
            >
              <Text style={styles.startButtonText}>Quay</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.winnerIndex != null && (
          <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
              {participants[this.state.winnerIndex]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({ winnerIndex: null });
                this.child._tryAgain();
              }}
              style={styles.tryAgainButton}
            >
              <Text style={styles.tryAgainText}>Thử lại</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
export default Spin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E74C3C",
  },
  startButtonView: {
    position: "absolute",
  },
  startButton: {
    backgroundColor: "rgba(0,0,0,.5)",
    marginTop: 50,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  winnerView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  winnerText: {
    fontSize: 35,
  },
  tryAgainButton: {
    padding: 5,
    top: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  tryAgainText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",

    alignSelf: "center",
  },
});
