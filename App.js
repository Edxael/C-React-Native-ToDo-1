import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import dismissKeyboard from 'react-native-dismiss-keyboard'


export default class App extends React.Component {

  state = { data: [], text: '', showcf: false, dialogVisible: false, itemToDel: '' }

  questionDelete = (x) => {
    console.log("Delete: ", x );
    this.setState({ itemToDel: x, dialogVisible: true, showcf: true })
  }

  deleteItem = () => {
      let arr = this.state.data;
      let pos = arr.indexOf( this.state.itemToDel );
      arr.splice(pos, 1);
      this.setState({ data: arr, itemToDel: '', dialogVisible: false });
  }

  renderTodos = () => {
    return this.state.data.map( (x) => { return (<Text style={styles.item} key={x} onPress={() => { this.questionDelete(x) } } > { x } </Text>) } )
  }

  addTodo = () =>{
    console.log( "Adding to the list: " + this.state.text )
    var arr = this.state.data;
    arr.push( this.state.text );
    this.setState({ data: arr, text: '' });
    dismissKeyboard()
  }

  render() {

    return (
      <View style={styles.container}>

        <Text>Edxael Todo App 1.4</Text>
        <TextInput style={styles.myinput} onChangeText={ (text) => { this.setState({ text: text }) } } value={this.state.text} underlineColorAndroid={'transparent'}/>
        <Button title="Add To-Do" onPress={this.addTodo} />

        <ConfirmDialog
          title={ `Delete: ${this.state.itemToDel} ???` }
          message="Are you sure about that?"
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          positiveButton={{
              title: "YES",
              onPress: () => { this.deleteItem() }
          }}
          negativeButton={{
              title: "NO",
              onPress: () => this.setState({dialogVisible: false})
          }}
        /> 

        <Text> - - - - - - - - - - - - - - - - - - - - - - - </Text>

        { this.renderTodos() }

        <Text> - - - - - - - - - - - - - - - - - - - - - - - </Text>
        <Text> By: Edmundo Rubio. </Text>
        
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#B39DDB',
    alignItems: 'center'
  }, 
  myinput: {
    height: 40,
    width: 200,
    paddingLeft: 7,
    borderColor: "black",
    backgroundColor: '#BBDEFB',
    borderWidth: 1,
    marginBottom: 5
  },
  item: {
    marginBottom: 5,
    backgroundColor: '#64B5F6',
    justifyContent: 'center',
    borderColor: 'black',
    width: 200,
    height: 30,
    borderWidth: 1
  }
});






// { this.state.showcf ? <ConfirmDialog
//   title={ `Delete: ${this.state.itemToDel} ???` }
//   message="Are you sure about that?"
//   visible={this.state.dialogVisible}
//   onTouchOutside={() => this.setState({dialogVisible: false})}
//   positiveButton={{
//       title: "YES",
//       onPress: () => { this.deleteItem() }
//   }}
//   negativeButton={{
//       title: "NO",
//       onPress: () => this.setState({dialogVisible: false})
//   }}
// /> : <Text>...</Text> }