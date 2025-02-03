import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Toast from "react-native-toast-message";

 const showToast = (message:string, type:string) => {
    Toast.show({
        type: type,
        text1: message,
        visibilityTime: 1500,
        position: 'bottom',
        topOffset: 20, 
        bottomOffset: 20,
        text1Style: {
            fontSize: hp(1.4),
            fontFamily: 'monitoricaBold',
            textAlign: 'center',
        }
    });
}
export default showToast