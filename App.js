import React, {Component} from 'react';
import {Alert, Button, Modal, StyleSheet, Text, View} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      bug: 0,
      modalVisible: false
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
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.bug == 0 ?
          <View>
            <Button title="Bug #1 - alert disappears by itself" style={styles.bugButton} onPress={() => this.activateBug(1)}/>
            <Button title="Bug #2" style={styles.bugButton} onPress={() => this.activateBug(2)}/>
            <Button title="Bug #3" style={styles.bugButton} onPress={() => this.activateBug(3)}/>
          </View>
          :
          <Button title="<- Back" onPress={() => this.activateBug(0)}/>
        }

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text style={styles.modalText}>Hello World!</Text>
              <Button title="Hide modal" style={styles.bugButton} onPress={() => this.setState({modalVisible: !this.state.modalVisible})}/>
            </View>
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
  modalText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
