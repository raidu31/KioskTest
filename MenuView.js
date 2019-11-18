import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { StatusBar } from 'react-native';

const MENU_API  = "http://localhost:3001/api/menu"
const IMAGE_URL = "https://via.placeholder.com/300.png?text=Lavu%20POS"


export default class SecondView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      selectCategoryIndex:0,
      selectedSubCategoryIndex:0
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    fetch(MENU_API)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson.data.MenuGroups
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }


  // For Rendering Main Category
  renderMainCategory = (data) => {
    
    return(
    <TouchableOpacity style={styles.list} onPress={()=>this.setState({selectCategoryIndex: data.index,selectedSubCategoryIndex:0})}>
      {
      this.state.selectCategoryIndex == data.index?
      
      <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 ,textDecorationLine: 'underline'}}>{data.item.name.toUpperCase()}</Text>
      :
      <Text style={{ fontWeight: "bold", color: "white", fontSize: 20}}>{data.item.name.toUpperCase()}</Text>
      }
    </TouchableOpacity>)
  }

  // For Rendering Sub Category based on Main Category
  renderSubCategory = (data1) => {
  this.selectedSubCategoryIndex = data1.index
  return (
    <TouchableOpacity style={styles.list} onPress={()=>this.setState({selectedSubCategoryIndex: data1.index})}>
      {
        this.state.selectedSubCategoryIndex == data1.index ?
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 ,textDecorationLine: 'underline'}}>{data1.item.name.toUpperCase()}</Text>
        :
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>{data1.item.name.toUpperCase()}</Text>
      }
      
    </TouchableOpacity>)
  }

  // For Rendering Items based on Sub Category selection
  renderMenu = (data2) =>
    <TouchableOpacity style={styles.list}>
      <View style={{ flexDirection: "row",borderRadius:5 ,backgroundColor:"white"}}>

        <View style={{ flexDirection: "column" }}>
          <Text style={{ paddingTop:5,width: 200 ,fontWeight:"bold",paddingLeft:10}} numberOfLines={2} multiline={true}>{data2.item.name.toUpperCase()}</Text>
          <Text  style={{paddingTop:10, width: 200 ,paddingLeft:10}} numberOfLines={2} multiline={true}>{data2.item.description}</Text>
          <Text style={{paddingLeft:10}}> Price: {data2.item.price}</Text>
        </View>
       
        <View >
          <Image source={{ uri: IMAGE_URL }}
            style={{ width: 100, height: 100, alignContent: "flex-end" ,borderRadius:5}}
          />
        </View>
      
      </View>
    </TouchableOpacity>

  // Main Render 
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#07f707" />
        </View>
      )
    }
    return (

      <View style={{ flex: 1}}>

        <View style={styles.container}>
        
          <FlatList
            data={this.state.dataSource}
            horizontal={true}
            renderItem={item => this.renderMainCategory(item)}
            keyExtractor={item => item.id.toString()} />
        </View>

        <View style={{ height: 60, backgroundColor: "#216e21" }}>
          <FlatList
            data={this.state.dataSource[this.state.selectCategoryIndex].categories}
            horizontal={true}
            renderItem={item => this.renderSubCategory(item)}
            keyExtractor={item => item.id.toString()} />
        </View>

        <View style={{ backgroundColor: "#d6d9d4", flex: 1 }}>
          <FlatList
            numColumns={2}
            data={this.state.dataSource[this.state.selectCategoryIndex].categories[this.state.selectedSubCategoryIndex].items}
            renderItem={item => this.renderMenu(item)}
            keyExtractor={item => item.id.toString()} />
        </View>

      </View>
    )
  }
}



// style sheet
const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#088508"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    margin: 15,
    alignContent: 'center',
    justifyContent: 'center'
  }
});