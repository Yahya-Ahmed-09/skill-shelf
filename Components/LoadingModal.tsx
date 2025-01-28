import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/ColorConstants'

interface Props{
    visibility: boolean,
}
const LoadingModal:React.FC<Props> = ({visibility}) => {
  return (
    
      <Modal transparent={true} visible={visibility}>
            <View style={styles.overlay}>
                <ActivityIndicator color={Colors.Primary} size={50} />
            </View>
      </Modal>
    
  )
}

export default LoadingModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
})