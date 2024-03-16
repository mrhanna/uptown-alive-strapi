import React from 'react';

import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

import {
    Button,
    Flex,
    Grid,
    GridItem,
    TextInput,
    ToggleInput,
    Typography,
} from '@strapi/design-system';

const HoursRow = (props) => {
    const {
        label,
        clipboard,
        setClipboard,
        slice,
    } = props;

    const [state, setState] = slice;

    const { formatMessage } = useIntl();

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
                    onChange={() => setState({closed: !state.closed})}
                />

                { !state.closed &&
                    <Flex direction="row" gap={4} marginTop={4}>
                        <TextInput
                            label="Opens" 
                            value={state.from}
                            onChange={(e) => setState({...state, from: e.target.value})}
                            disabled={state.closed}
                            type="time"
                        />
                        <TextInput
                            label="Closes" 
                            value={state.to}
                            onChange={(e) => setState({...state, to: e.target.value})}
                            disabled={state.closed}
                            type="time"
                        />
                        <Button
                            onClick={() => setClipboard(state)}
                            disabled={state.closed}
                            >Copy</Button>
                        <Button
                            disabled={Object.keys(clipboard).length === 0 || state.closed}
                            onClick={() => setState(clipboard)}
                            >Paste</Button>
                    </Flex>
                }
            </GridItem>
        </Grid>
    );
};

export default HoursRow;