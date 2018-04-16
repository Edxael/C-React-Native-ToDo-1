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

        <View style={styles.center1}>

            <Text style={styles.title1}>Edxael: ToDo-App 1.3</Text>
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
        
      </View>
    );
  }
}


  // -----[ STYLING ]-----------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B39DDB',
    alignItems: 'center',
    padding: 30,
    paddingTop: 45
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
    paddingLeft: 5,
    paddingTop: 9,
    width: 200,
    height: 40,
    borderWidth: 1
  }, 
  center1: {
    backgroundColor: 'rgba(254, 254, 254, 0.5)',
    borderWidth: 3,
    borderColor: 'white',
    padding: 20,
    alignItems: 'center'
  },
  title1: {
    fontSize: 22,
    marginBottom: 5
  }
});
