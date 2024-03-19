import React, { useState } from 'react';

import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import {
    Box,
    Button,
    Checkbox,
    Flex,
    Grid,
    GridItem,
    IconButton,
    TextInput,
    ToggleInput,
    Typography,
} from '@strapi/design-system';

import {
    Cross,
    Duplicate,
    Magic,
    Plus,
} from '@strapi/icons';

const HoursRow = (props) => {
    const {
        label,
        clipboard,
        setClipboard,
        slice,
    } = props;

    const [state, dispatch] = slice;
    const { formatMessage } = useIntl();
    console.log(state);

    const slots = state.hours?.map(({from, to}, slotNumber) => (
        <HoursSlot 
            from={from}
            to={to}
            dispatch={(action) => { dispatch({...action, slot: slotNumber}) }}
            allowRemove={state.hours.length > 1}
            key={slotNumber} 
        />
    ))

    return (
        <Grid padding={6}>
            <GridItem col={3} padding={[3, 2]}>
                <Typography fontWeight="bold">{label}</Typography>
            </GridItem>
            <GridItem col={5} padding={[3, 2]}>
                <ToggleInput 
                    onLabel={
                        formatMessage({
                            id: getTrad('HoursRow.openLabel'),
                            defaultMessage: 'Open',
                        })
                    }
                    offLabel={
                        formatMessage({
                            id: getTrad('HoursRow.closedLabel'),
                            defaultMessage: 'Closed',
                        })
                    }
                    checked={!state.closed}
                    onChange={() => dispatch({type: 'TOGGLE_CLOSED'})}
                />
            </GridItem>
            <GridItem col={4} padding={[3, 2]} style={{
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                }}>
                <Box>
                    {!state.closed &&
                        <Checkbox
                            checked={state.allDay}
                            onChange={() => dispatch({type: 'TOGGLE_24'})}
                        >24 Hours?</Checkbox>
                    }
                </Box>

                <Flex gap={2}>
                    <IconButton
                        onClick={() => setClipboard(state)}
                        label="Copy"
                        disabled={state.closed}
                        icon={<Duplicate />}
                    />
                    <IconButton
                        disabled={Object.keys(clipboard).length === 0 || state.closed}
                        onClick={() => dispatch({ type: 'REPLACE', value: clipboard })}
                        label="Paste"
                        icon={<Magic />}
                    />
                </Flex>
            </GridItem>
            
            {!state.closed && !state.allDay &&
                <>
                    {slots}
                    <GridItem col={3} />
                    <GridItem col={5} padding={[3, 2]}>
                        <Button 
                            onClick={() => dispatch({type: 'ADD_SLOT'})}
                            startIcon={<Plus />}
                        >Add hours</Button>
                    </GridItem>
                </>
            }
        </Grid>
    );
};

function HoursSlot({from, to, dispatch, allowRemove}) {
    return (
        <>
            <GridItem col={3} /> {/*empty offset*/}
            <GridItem col={3} padding={[3, 2]}>
                <TextInput
                    label="Opens"
                    style={{width: 120}}
                    value={from}
                    onChange={
                        (e) => {
                            dispatch({
                                type: 'EDIT',
                                side: 'from',
                                value: e.target.value,
                            });
                        }
                    }
                    type="time"
                />
            </GridItem>
            <GridItem col={3} padding={[3, 2]}>
                <TextInput
                    label="Closes" 
                    style={{width: 120}}
                    value={to}
                    onChange={
                        (e) => {
                            dispatch({
                                type: 'EDIT',
                                side: 'to',
                                value: e.target.value,
                            });
                        }
                    }
                    type="time"
                />
            </GridItem>
            <GridItem col={3} padding={[3, 2]} style={{display: 'flex', alignItems: 'center'}}>
                {allowRemove &&
                    <IconButton 
                        onClick={() => dispatch({type: 'REMOVE_SLOT'})}
                        label="Remove this time slot"
                        icon={<Cross />}
                    />
                }
            </GridItem>
        </>
    );
}

export default HoursRow;