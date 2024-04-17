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

const colors = {
    offWhite: '#fafafa',
    offBlack: '#272727',

    extraLightGrey: '#e0e0e0',
    lightGrey: '#9b9b9b',
    mediumGrey: '#6b6b6b',
    darkGrey: '#4d4d4d',

    transGrey: '#eaeaeacc',
    transWhite: '#ffffff89',
};

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: colors.offWhite,
        fontSize: 11,
        // padding: 50,
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
        marginTop: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    logoImage: {
        marginLeft: 50,
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
        color: colors.offWhite,
    },

    orderInfo: {
        paddingLeft: 50,
        paddingRight: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        height: 'auto',
    },
    configurationInfo: {
        paddingLeft: 50,
        paddingRight: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        height: 'auto',
    },

    customerInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 'auto',
        marginTop: 10,
        gap: 10,
    },
    customerInfoTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 700,
        color: colors.offWhite,
        backgroundColor: colors.offBlack,
        padding: 10,
        borderRadius: 7.5,
        width: '100%',
    },
    customerInfoValues: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 10,
        width: '100%',
        height: 'auto',
        marginTop: 10,
    },

    configurationChoices: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        height: 'auto',
        marginTop: 10,
    },
    configurationChoice: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 10,
    },
    configurationChoiceValues: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 5,
    },
    configurationChoiceValueName: {
        fontFamily: 'Roboto',
        fontSize: 10,
        fontWeight: 700,
        color: colors.offBlack,
    },
    configurationChoiceValueValue: {
        fontSize: 8,
        color: colors.lightGrey,
    },
    configurationChoiceValueImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    configurationChoiceTitle: {
        fontFamily: 'Roboto',
        fontSize: 10,
        fontWeight: 700,
        color: colors.lightGrey,
        paddingTop: 10,
        borderRadius: 7.5,
        height: 'auto',
    },

});

export function MyDocument({ props }) {

    const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const moduleOptions = [
        { name: 'module(s)', value: props.chosenModules },
        { name: 'finish', value: props.bevelled },
        { name: 'material', value: props.ralColor ? 'ral color ' + props.ralColor.code : props.mainMaterial.name }
    ];


    const countertopOptions = [
        { name: 'inset', value: props.tableTopInset },
        { name: 'thickness', value: props.tableTopHeight },
        { name: 'edge', value: props.tableTopEdge },
        { name: 'material', value: props.tableTopMaterial.name }
    ];

    const extraOptions = [
        { name: 'tower appliance', value: props.applianceType },
        { name: 'winestand', value: props.wineStandSize },
        { name: 'cooking fire', value: props.stoveType },
        { name: 'faucet', value: props.tapType },
        { name: 'drawers', value: props.mainDrawers },
        { name: 'accent material', value: props.accentMaterial.name },
    ];

    const customerOptions = {
        'order number': Math.floor(Math.random() * 1000000),
        'order date': currentDate,
        'order time': currentTime,
        'customer name': 'John Doe',
        'customer email': 'placeholder@somewhere.com',
        'customer phone': '+1234567890',
        'customer address': '1234 Somewhere St, 2800 Mechelen',
    }


    console.log('props', props.imageRender);
    console.log(props.ralColor)

    const renderedImage = props.imageRender[0] ? props.imageRender[0] : '';

    const renderedImage2 = props.imageRender[1] ? props.imageRender[1] : '';

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
                    style={styles.orderInfo}
                >
                    <View
                    >
                        <Text>{customerOptions['order date']}   {customerOptions['order time']}</Text>
                    </View>
                    <View
                        style={styles.customerInfo}
                    >
                        <View>
                            <Image
                                src={renderedImage}
                                style={{ width: 'auto', height: '150' }}
                            />
                        </View>
                        <View>
                            <Text
                                style={styles.customerInfoTitle}
                            >Your information:</Text>
                            <View
                                style={styles.customerInfoValues}
                            >
                                <Text>{customerOptions['customer name']}</Text>
                                <Text>{customerOptions['customer email']}</Text>
                                <Text>{customerOptions['customer phone']}</Text>
                                <Text>{customerOptions['customer address']}</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View
                    style={styles.configurationInfo}
                >
                    <Text
                        style={styles.customerInfoTitle}
                    >
                        Your configuration:
                    </Text>

                    <View
                        style={styles.configurationChoices}
                    >

                        {/* <Image
                            src={renderedImage2}
                            style={{ width: 'auto', height: '150', border: '1px solid #757575' }}
                        /> */}
                        <View
                            style={styles.configurationChoice}
                        >
                            <Text
                                style={styles.configurationChoiceTitle}
                            >Modules</Text>
                            {moduleOptions.map((option, index) => (
                                <View
                                    key={index}
                                    style={styles.configurationChoiceValues}
                                >
                                    <Text
                                        key={index}
                                        style={styles.configurationChoiceValueName}
                                    >{option.name}</Text>
                                    <Text
                                        key={index}
                                        style={styles.configurationChoiceValueValue}
                                    >{option.value}</Text>
                                </View>
                            ))}
                            {props.ralColor &&
                                <View
                                    style={{ backgroundColor: props.ralColor.hex, width: 40, height: 40, borderRadius: 5 }}
                                />
                            }
                            {!props.ralColor &&
                                <Image
                                    style={styles.configurationChoiceValueImage}
                                    src={props.mainMaterial.url + 'preview.jpg'}
                                />
                            }
                        </View>
                        <View
                            style={styles.configurationChoice}
                        >
                            <Text
                                style={styles.configurationChoiceTitle}
                            >Countertop</Text>
                            {countertopOptions.map((option, index) => (
                                <View
                                    key={index}
                                    style={styles.configurationChoiceValues}
                                >
                                    <Text
                                        key={index}
                                        style={styles.configurationChoiceValueName}
                                    >{option.name}</Text>
                                    <Text
                                        key={index}
                                        style={styles.configurationChoiceValueValue}
                                    >{option.value}</Text>
                                </View>
                            ))}
                            <Image
                                style={styles.configurationChoiceValueImage}
                                src={props.tableTopMaterial.url + 'preview.jpg'}
                            />
                        </View>
                        <View
                            style={styles.configurationChoice}
                        >
                            <Text
                                style={styles.configurationChoiceTitle}
                            >Extras</Text>
                            {extraOptions.map((option, index) => (
                                <View
                                    key={index}
                                    style={styles.configurationChoiceValues}
                                >
                                    <Text
                                        key={index}
                                        style={styles.configurationChoiceValueName}
                                    >{option.name}</Text>
                                    <Text
                                        key={index}
                                        style={styles.configurationChoiceValueValue}
                                    >{option.value}</Text>
                                </View>
                            ))}
                            <Image
                                style={styles.configurationChoiceValueImage}
                                src={props.accentMaterial.url + 'preview.jpg'}
                            />
                        </View>

                    </View>

                </View>


            </Page>
        </Document >
    );
};

export default MyDocument;