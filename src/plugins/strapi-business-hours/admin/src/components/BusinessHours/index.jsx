import React, { 
    forwardRef,
    useEffect,
    useReducer,
    useState,
} from 'react';
import { useIntl } from 'react-intl';
import {
    Accordion,
    AccordionContent,
    AccordionGroup,
    AccordionToggle,
} from '@strapi/design-system';

import HoursRow from './HoursRow';
import HoursReducer from './HoursReducer';

const BusinessHours = forwardRef((props, ref) => {
    const { attribute, disabled, intlLabel, name, onChange, required, value } =
        props; // these are just some of the props passed by the content-manager

    const { formatMessage } = useIntl();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [state, dispatch] = useReducer(HoursReducer, value, (data) => JSON.parse(data) ?? days.reduce(
        (acc, day) => { 
            acc[day.toLowerCase()] = { closed: false, hours: [{ from: '', to: '' }] };
            return acc;
        }, {}));

    const [clipboard, setClipboard] = useState({});
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        onChange({
            target: {
                name,
                type: attribute.type,
                value: JSON.stringify(state),
            },
        });
    }, [state]);

    const createSlice = (day) => [
        state[day] ?? {},
        (action) => {
            dispatch({...action, day });
        },
    ];

    const rows = days.map((day, i) => (
        <HoursRow
            label={day}
            clipboard={clipboard}
            setClipboard={setClipboard}
            slice={createSlice(day.toLowerCase())}
            key={i}
        />
    ));

    return (
        <AccordionGroup label={name}>
            <Accordion expanded={expanded} onToggle={() => setExpanded(!expanded)}>
                <AccordionToggle title="Opening Hours" />
                <AccordionContent>
                    {rows}
                </AccordionContent>
            </Accordion>
        </AccordionGroup>
    );  
});

export default BusinessHours;