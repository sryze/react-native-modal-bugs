import React, {Component} from 'react';
import {ActionSheetIOS, Alert, Button, Modal, StyleSheet, Text, View} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      bug: 0,
      backButtonTitle: `<- Back`,
      modalVisible: false,
      secondModalVisible: false
    };
  }

  activateBug(bugNumber) {
    this.setState({bug: bugNumber});
    switch (bugNumber) {
      case 1:
        this.setState({modalVisible: true});
        setTimeout(() => {
          Alert.alert('Test alert', 'This is a test alert. It will disappear shortly...');
        }, 500);
        setTimeout(() => {
          // This will cause the alert box to go away (UIAlertViewController will be dismissed).
          this.setState({modalVisible: false});
        }, 1000);
        break;
      case 2:
        this.setState({modalVisible: true});
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Cancel', 'Remove'],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            this.setState({backButtonTitle: `<- Back (haha, you can't! 😂😂😂)`});
            console.log('Clicked action sheet button ' + buttonIndex);
          }
        );
        break;
      case 3:
        //
        // Real-life scenario 1:
        // User clicks on a button that triggers a modal multiple times in a row very fast.
        //
        // Scenario 2:
        // While a modal is opening an event occurs that triggers another modal to show up.
        //
        this.setState({modalVisible: true});
        setTimeout(() => {
          this.setState({secondModalVisible: true});
        }, 200);
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.bug == 0 ?
          <View>
            <Button title="Bug #1: Alert disappears by itself" style={styles.bugButton} onPress={() => this.activateBug(1)}/>
            <Button title="Bug #2: Invisible blocking view" style={styles.bugButton} onPress={() => this.activateBug(2)}/>
            <Button title="Bug #3: Modal race" style={styles.bugButton} onPress={() => this.activateBug(3)}/>
          </View>
          :
          <Button title={this.state.backButtonTitle} onPress={() => this.activateBug(0)}/>
        }

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Hi, I'm a modal!</Text>
            <Button title="Hide"
              style={styles.bugButton}
              onPress={() => this.setState({modalVisible: !this.state.modalVisible})}/>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.secondModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Another modal!</Text>
            <Button title="Hide 2"
              style={styles.bugButton}
              onPress={() => this.setState({secondModalVisible: !this.state.secondModalVisible})}/>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  bugButton: {
    marginVertical: 20,
    fontSize: 24
  },
  modalContent: {
    margin: 40
  },
  modalText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
