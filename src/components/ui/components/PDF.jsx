import React from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider, Image, Font } from '@react-pdf/renderer';

// Font.register({ family: 'Kaisei Decol', src: '/fonts/KaiseiDecol-Regular.ttf' });
// Font.register({ family: 'calibri', src: '/fonts/calibri.ttf' });

Font.register(
    {
        family: 'Roboto', fonts: [
            { src: '/fonts/Roboto-regular.ttf' },
            { src: '/fonts/Roboto-Bold.ttf', fontWeight: 700 },
        ]
    },
    {
        family: 'Kaisei Decol', src: '/fonts/KaiseiDecol-Regular.ttf'
    },
);

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fafafa',
        fontSize: 11,
        padding: 50,
        width: '100%',
        gap: 40,
    },

    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
    },

    heading: {
        position: 'absolute',
        top: 50,
        left: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    logoImage: {
        padding: 10,
        width: 'auto',
        height: 75,
    },

    orderNumber: {
        height: 75,
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 15,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },

    orderTitle: {
        fontFamily: 'Roboto',
        fontSize: 26,
        fontWeight: 700,
        color: 'white',
    },

    customerInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        padding: 10,
    },

    modulesSelection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        height: 'auto',
        padding: 10,
        marginTop: 100,
    },

});

export function MyDocument({ props }) {

    const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const moduleOptions = [
        { name: 'module(s)', value: props.chosenModules },
        { name: 'module finish', value: props.bevelled },
    ];

    const materialOptions = [
        { name: 'material for modules', value: props.ralColor ? 'ral color ' + props.ralColor.code : props.mainMaterial.name },
        { name: 'material for countertops', value: props.tableTopMaterial.name },
    ];

    const countertopOptions = [
        { name: 'countertop inset', value: props.tableTopInset },
        { name: 'countertop thickness', value: props.tableTopHeight },
        { name: 'countertop edge', value: props.tableTopEdge },
    ];

    const applianceOptions = [
        { name: 'type of tower appliance', value: props.applianceType },
        { name: 'size of winestand', value: props.wineStandSize },
        { name: 'type of cooking fire', value: props.stoveType },
        { name: 'type of faucet', value: props.tapType },
    ];

    const customerOptions = {
        'order number': Math.floor(Math.random() * 1000000),
        'order date': currentDate,
        'order time': currentTime,
    }


    // console.log('props', props.imageRender);

    const renderedImage = props.imageRender[0] ? props.imageRender[0] : '';

    return (

        <Document
            title="Order Overview"
            author="Arne Samson"
            subject="Order Overview"
            keywords="order, overview, il giro"
            language='en'
        >
            <Page size="A4" style={styles.page} wrap={true}>

                {/* <View
                >
                    <Image
                        src='/images/UI/bg2.png'
                        source={'./images/UI/bg2.png'}
                        style={styles.backgroundImage}
                    />

                </View> */}

                <View
                    style={styles.heading}
                >
                    <Image
                        style={styles.logoImage}
                        src='/images/UI/Logo_SR_Black.png'
                        source={'./images/UI/Logo_SR_Black.png'}
                    />

                    <View
                        style={styles.orderNumber}
                    >
                        <Text
                            style={styles.orderTitle}
                        >
                            Order #{customerOptions['order number']}
                        </Text>
                    </View>
                </View>

                <View
                    style={styles.modulesSelection}
                >

                    <Image
                        src={renderedImage}
                        style={{ width: 'auto', height: '150', border: '1px solid #757575' }}
                    />
                    <View>
                        <Text>Modules:</Text>
                        {moduleOptions.map((option, index) => (
                            <Text key={index}>{option.name}: {option.value}</Text>
                        ))}
                    </View>

                </View>


            </Page>
        </Document >
    );
};

export default MyDocument;