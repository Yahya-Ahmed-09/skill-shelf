import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface Props{
    title: string
}
const Header:React.FC<Props> = ({title}) => {
  return (
    <View style={styles.container} >
      <Text style={styles.heading}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    heading:{
        fontFamily: 'montserratBold',
        fontSize: hp(2.2),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    container:{
        paddingTop: 20,
    },
})