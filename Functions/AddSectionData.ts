import app from "@/firebaseConfiguration"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"

const addSectionData = async(item:any, sectionName:string) => {
    try {
         const user =  await AsyncStorage.getItem('user')
         if(user){
            const db =getFirestore(app)
            const docRef = doc(db, 'Section-Data', user)
            const itemsArray = Array.isArray(item) ? item : [item];
            await updateDoc(docRef, {
                [sectionName]: arrayUnion(...itemsArray)
            })
            // console.log("sectionName",sectionName, itemsArray)
         }   
    } catch (error) {
        console.log(error)
    }
}
export default addSectionData