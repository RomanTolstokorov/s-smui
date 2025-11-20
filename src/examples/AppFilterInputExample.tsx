import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { AppFilterInput } from '../components/task-management/AppFilterInput';
import type { OptionType } from '../components/ui/SSingleSelect';

/**
 * Example demonstrating the AppFilterInput component with equals/not-equals toggle
 */
export const AppFilterInputExample: React.FC = () => {
    // Mock options for filters
    const statusOptions: OptionType[] = [
        { value: 'open', label: 'Open' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'closed', label: 'Closed' },
    ];

    const priorityOptions: OptionType[] = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
    ];

    const assigneeOptions: OptionType[] = [
        { value: 'john', label: 'John Doe' },
        { value: 'jane', label: 'Jane Smith' },
        { value: 'bob', label: 'Bob Johnson' },
    ];

    // Filter 1: Single select (no value initially - button disabled)
    const [filter1Value, setFilter1Value] = useState<OptionType | null>(null);
    const [filter1IsEquals, setFilter1IsEquals] = useState(true);

    // Filter 2: Single select with value (button enabled)
    const [filter2Value, setFilter2Value] = useState<OptionType | null>(priorityOptions[1]);
    const [filter2IsEquals, setFilter2IsEquals] = useState(true);

    // Filter 3: Multi select with values (button enabled, not-equals mode)
    const [filter3Value, setFilter3Value] = useState<OptionType[]>([assigneeOptions[0], assigneeOptions[1]]);
    const [filter3IsEquals, setFilter3IsEquals] = useState(false);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                AppFilterInput Examples
            </Typography>

            <Stack spacing={3} sx={{ maxWidth: 500 }}>
                {/* Filter 1: Single select without value (button disabled) */}
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Single Select - No value (button disabled)
                    </Typography>
                    <AppFilterInput
                        name="Status"
                        valueType="single-select"
                        options={statusOptions}
                        value={filter1Value}
                        onValueChange={(newValue) => setFilter1Value(newValue as OptionType | null)}
                        isEquals={filter1IsEquals}
                        onOperatorToggle={() => setFilter1IsEquals(!filter1IsEquals)}
                    />
                </Box>

                {/* Filter 2: Single select with value (equals mode - green button) */}
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Single Select - With value (equals mode - green)
                    </Typography>
                    <AppFilterInput
                        name="Priority"
                        valueType="single-select"
                        options={priorityOptions}
                        value={filter2Value}
                        onValueChange={(newValue) => setFilter2Value(newValue as OptionType | null)}
                        isEquals={filter2IsEquals}
                        onOperatorToggle={() => setFilter2IsEquals(!filter2IsEquals)}
                    />
                </Box>

                {/* Filter 3: Multi select with values (not-equals mode - red button) */}
                <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Multi Select - With values (not-equals mode - red)
                    </Typography>
                    <AppFilterInput
                        name="Assignee"
                        valueType="multi-select"
                        options={assigneeOptions}
                        value={filter3Value}
                        onValueChange={(newValue) => setFilter3Value(newValue as OptionType[])}
                        isEquals={filter3IsEquals}
                        onOperatorToggle={() => setFilter3IsEquals(!filter3IsEquals)}
                    />
                </Box>
            </Stack>

            <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    Current States:
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Filter 1 (Status):</strong> {filter1Value ? `"${filter1Value.label}"` : 'No value'} - {filter1IsEquals ? 'Equals' : 'Not-Equals'} - Button {filter1Value ? 'Enabled' : 'Disabled'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Filter 2 (Priority):</strong> {filter2Value ? `"${filter2Value.label}"` : 'No value'} - {filter2IsEquals ? 'Equals' : 'Not-Equals'} - Button {filter2Value ? 'Enabled' : 'Disabled'}
                </Typography>
                <Typography variant="body2">
                    <strong>Filter 3 (Assignee):</strong> {filter3Value.length > 0 ? `${filter3Value.length} selected` : 'No values'} - {filter3IsEquals ? 'Equals' : 'Not-Equals'} - Button {filter3Value.length > 0 ? 'Enabled' : 'Disabled'}
                </Typography>
            </Box>
        </Box>
    );
};
