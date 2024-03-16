import React, { 
    forwardRef,
    useEffect,
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

const BusinessHours = forwardRef((props, ref) => {
    const { attribute, disabled, intlLabel, name, onChange, required, value } =
        props; // these are just some of the props passed by the content-manager

    const { formatMessage } = useIntl();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [state, setState] = useState(JSON.parse(value) ?? days.reduce(
        (acc, day) => { 
            acc[day.toLowerCase()] = { closed: false };
            return acc;
        }, {}));

    const [clipboard, setClipboard] = useState({});
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        console.log(state);
        onChange({
            target: {
                name,
                type: attribute.type,
                value: JSON.stringify(state),
            },
        });
    }, [state]);

    const createSlice = (name) => [
        state[name] ?? {},
        (slice) => {
            const newState = {...state, [name]: slice};
            setState(newState);
        }
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