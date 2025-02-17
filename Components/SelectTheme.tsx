import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { themes } from '@/ThemeColor'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '@/ColorConstants';

interface Props {
    theme: string,
    index: number,
    selectedTheme: string,
    setSelectedTheme: any
}

const SelectTheme = ({ theme, index, selectedTheme, setSelectedTheme }: Props) => {

    const handleSelectTheme = (item: string) => {
        if(selectedTheme === item){
            return
        }else{
            setSelectedTheme((prevTheme:any) => (prevTheme === item ? null : item));
        }
    };

    return (
        <View
            key={index}
            style={[
                styles.container,
                selectedTheme === theme && { backgroundColor: '#60A5FA', borderRadius: 20 }
            ]}
        >
            {selectedTheme === theme && (
                <View style={styles.checkIcon}>
                    <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24} color="white" />
                </View>
            )}

            <View style={[styles.themeCard, { backgroundColor: themes[theme].primary }]} >
                <Text style={[styles.themeText, { color: themes[theme].secondary }]}>{theme}</Text>

                <TouchableOpacity
                    style={[styles.selectButton, { backgroundColor: themes[theme].accent }]}
                    onPress={() => handleSelectTheme(theme)}
                >
                    <Text style={styles.selectButtonText}>
                        {selectedTheme === theme ? "Selected" : "Select"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SelectTheme;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkIcon: {
        position: 'absolute',
        top: -hp(0.5),
        right: -wp(0.5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#60A5FA',
        padding: hp(0.10),
        borderRadius: 50,
        zIndex: 10,
    },
    themeCard: {
        width: wp(35),
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    themeText: {
        fontSize: hp(1.6),
        fontFamily: 'poetsen',
        fontWeight: '600',
        marginBottom: hp(1),
    },
    selectButton: {
        marginTop: hp(1),
        paddingVertical: hp(1),
        paddingHorizontal: wp(5),
        borderRadius: 10,
    },
    selectButtonText: {
        fontSize: hp(1.2),
        fontFamily: 'montserratMed',
        color: Colors.White
    },
});
