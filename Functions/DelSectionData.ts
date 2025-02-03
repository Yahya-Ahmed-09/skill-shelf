import app from "@/firebaseConfiguration";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { arrayRemove, doc, getFirestore, updateDoc } from "firebase/firestore";

const delSectionData = async(item:any, sectionName:string) => {
    try {
        const user = await AsyncStorage.getItem('user');
        if(user){
            const db =getFirestore(app);
            const docRef =doc(db, 'Section-Data', user)
            await updateDoc(docRef,{
                [sectionName]: arrayRemove(item)
            })
            console.log("deleted",item, sectionName)
        }

    } catch (error) {
        console.log(error)
    }
}

export default delSectionData