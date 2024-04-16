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

    },

    options: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignContent: 'space-between',
        gap: 20,

    },
    chapter: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignContent: 'space-between'
    },
    chapterTitle: {
        width: 100,
    },
    chapterOptions: {
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid black',
        width: '100%', // Set width to 100%
    },
    chapterOption: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid black',
        padding: 5,
        gap: 10,
    },
    optionValue: {
        textAlign: 'right',
    },


    table: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    row: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    cell: {
        width: '100%',
        height: '100%',
        border: '1px solid black',
    },
    cellContent: {
        paddingLeft: 8,
        paddingTop: 6,
        textAlign: 'left',
    },

    orderTitle: {
        // fontFamily: 'Helvetica',
        fontFamily: 'Roboto',
        fontWeight: 700,
    }

});

export function MyDocument({ props }) {

    const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const moduleOptions = [
        { name: 'module name(s)', value: props.chosenModules },
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



                <View
                    style={styles.heading}
                >
                    <Image
                        src='/images/UI/bg2.png'
                        source={'./images/UI/bg2.png'}
                        style={styles.backgroundImage}
                    />

                    <Image
                        src={renderedImage}
                        style={{ width: '100%', height: 'auto' }}
                    />


                    <View
                        style={styles.table}
                    >
                        <View
                            style={[styles.row, { width: '100%', height: 75 }]}
                        >
                            <View
                                style={[styles.cell, { width: 200, height: 'auto' }]}
                            >
                                <Image
                                    style={{ padding: 10 }}
                                    src='/images/UI/Logo_SR_Black.png'
                                    source={'./images/UI/Logo_SR_Black.png'}
                                />
                            </View>

                            <View
                                style={styles.cell}
                            >
                                <View
                                    style={styles.row}
                                >
                                    <View
                                        style={styles.cell}
                                    >
                                        <Text
                                            style={[styles.cellContent, styles.orderTitle]}
                                        >
                                            PURCHASE ORDER IL GIRO
                                        </Text>
                                    </View>

                                    <View
                                        style={styles.cell}
                                    >
                                        <Text
                                            style={styles.cellContent}
                                        >
                                            {currentDate}   {currentTime}
                                        </Text>
                                    </View>

                                </View>
                                <View
                                    style={styles.row}
                                >
                                    <View
                                        style={styles.cell}
                                    >
                                        <Text
                                            style={styles.cellContent}
                                        >
                                            reference :
                                        </Text>
                                    </View>


                                </View>
                            </View>

                        </View>

                    </View>

                </View>

                <View
                    style={styles.options}
                >

                    <View
                        style={styles.chapter}
                    >
                        <Text
                            style={styles.chapterTitle}
                        >
                            materials :
                        </Text>

                        <View
                            style={styles.chapterOptions}
                        >
                            {materialOptions.map((option, index) => (
                                <View
                                    key={index}
                                    style={styles.chapterOption}
                                >
                                    <Text>
                                        {option.name} :
                                    </Text>
                                    <Text
                                        style={styles.optionValue}
                                    >
                                        {option.value}
                                    </Text>
                                </View>
                            ))}
                        </View>

                    </View>

                    <View
                        style={styles.chapter}
                    >
                        <Text
                            style={styles.chapterTitle}
                        >
                            modules :
                        </Text>

                        <View
                            style={styles.chapterOptions}
                        >
                            {moduleOptions.map((option, index) => (
                                <View
                                    key={index}
                                    style={styles.chapterOption}
                                >
                                    <Text>
                                        {option.name} :
                                    </Text>
                                    <Text
                                        style={styles.optionValue}
                                    >
                                        {option.value}
                                    </Text>
                                </View>
                            ))}
                        </View>

                    </View>

                    <View
                        style={styles.chapter}
                    >
                        <Text
                            style={styles.chapterTitle}
                        >
                            countertop :
                        </Text>

                        <View
                            style={styles.chapterOptions}
                        >
                            {countertopOptions.map((option, index) => (
                                <View
                                    key={index}
                                    style={styles.chapterOption}
                                >
                                    <Text>
                                        {option.name} :
                                    </Text>
                                    <Text
                                        style={styles.optionValue}
                                    >
                                        {option.value}
                                    </Text>
                                </View>
                            ))}
                        </View>

                    </View>

                    <View
                        style={styles.chapter}
                    >
                        <Text
                            style={styles.chapterTitle}
                        >
                            appliances :
                        </Text>

                        <View
                            style={styles.chapterOptions}
                        >
                            {applianceOptions.map((option, index) => (
                                <View
                                    key={index}
                                    style={styles.chapterOption}
                                >
                                    <Text>
                                        {option.name} :
                                    </Text>
                                    <Text
                                        style={styles.optionValue}
                                    >
                                        {option.value}
                                    </Text>
                                </View>
                            ))}
                        </View>

                    </View>

                </View>
            </Page>
        </Document >
    );
};

export default MyDocument;