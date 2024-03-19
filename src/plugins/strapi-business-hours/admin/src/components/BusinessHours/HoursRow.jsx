import React, { useState } from 'react';

import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import {
    Box,
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
        <Grid padding={2}>
            <GridItem col={3} padding={4}>
                <Typography fontWeight="bold">{label}</Typography>
            </GridItem>
            <GridItem col={9} padding={4}>
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

                {!state.closed &&
                    <Checkbox
                        checked={state.allDay}
                        onChange={() => dispatch({type: 'TOGGLE_24'})}
                    >Open 24 Hours</Checkbox>
                }

                {!state.closed && !state.allDay &&
                    <Flex direction="row" gap={4} marginTop={4}>
                        <Box>
                            {slots}
                        </Box>
                        <Box style={{alignSelf: 'end'}}>
                            <IconButton 
                                onClick={() => dispatch({type: 'ADD_SLOT'})}
                                label="Add a time slot"
                                icon={<Plus />}
                            />
                        </Box>
                        <Box style={{alignSelf: 'start'}}>
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
                        </Box>
                    </Flex>
                }
            </GridItem>
        </Grid>
    );
};

function HoursSlot({from, to, dispatch, allowRemove}) {
    return (
        <Flex direction="row" gap={4}>
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
            <Box style={{width: 50}}>
                {allowRemove &&
                    <IconButton 
                        onClick={() => dispatch({type: 'REMOVE_SLOT'})}
                        label="Remove this time slot"
                        icon={<Cross />}
                    />
                }
            </Box>
        </Flex>
    );
}

export default HoursRow;