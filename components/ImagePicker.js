import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import IconButton from './IconButton';

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState();

    //Funcion para pedir permisos para camara en iOS 
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
                'Permisos Insuficientes',
                'Necesitas agregar permisos de la camara y de la Biblioteca de Imagenes para usar la App',
                [{ text: 'Ok' }]
            );
            return false;
        }
        return true;
    };

    //Funcion para usar la Camara
    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    //Funcion para usar el Camara Roll
    const selectImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchImageLibraryAsync();
        setPickedImage(image.uri)
        props.onImageTaken(image.uri);
    };

    return <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {!pickedImage ?
                <Text>No hay Foto tomada aun</Text>
                : <Image
                    source={{ uri: pickedImage }}
                    style={styles.image}
                />}
        </View>
        <View style={styles.buttonSection}>
            <IconButton 
            onPress={takeImageHandler}
            iconName={Platform.OS === 'android' ? 'md-camera' : 'ios-camera'}
            iconText='Camara'
            />
            <Text> </Text>
            <IconButton 
            onPress={selectImageHandler}
            iconName={Platform.OS === 'android' ? 'md-image' : 'ios-image'}
            iconText='Fototeca'
            />
        </View>
    </View>
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
});

export default ImgPicker;