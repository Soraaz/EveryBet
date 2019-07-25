import {StyleSheet} from 'react-native';

const editProfilePageStyleSheet = StyleSheet.create({
    container:{
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    avatarContainer:{
        marginRight: 30,
        marginLeft: 30
    },
    image:{
        width: 80,
        height: 80,
        alignSelf: 'center',
        borderRadius: 40
    },
    deliveryContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginRight: 50
    }
});

export default editProfilePageStyleSheet;
