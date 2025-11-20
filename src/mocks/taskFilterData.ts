import type { OptionType } from '../components/ui';

export type FilterType = 'single-select' | 'multi-select';

export interface TaskFilterDefinition {
    id: string;
    name: string;
    type: FilterType;
    options: OptionType[];
    /**
     * Optional linked (child) filter that appears when this filter has a value
     */
    linkedFilterId?: string;
}

export interface SavedSearch {
    id: string;
    name: string;
    filters: Record<string, string | string[]>;
    createdAt: Date;
    updatedAt: Date;
}

// Task filter definitions with realistic options
export const taskFilterDefinitions: TaskFilterDefinition[] = [
    {
        id: 'type',
        name: 'Type',
        type: 'single-select',
        options: [
            { value: 'task', label: 'Task' },
            { value: 'subtask', label: 'Subtask' },
            { value: 'bug', label: 'Bug' },
            { value: 'feature', label: 'Feature' },
            { value: 'improvement', label: 'Improvement' },
        ],
    },
    {
        id: 'workStatus',
        name: 'Work status',
        type: 'multi-select',
        options: [
            { value: 'not-started', label: 'Not Started' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'review', label: 'In Review' },
            { value: 'blocked', label: 'Blocked' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
        ],
    },
    {
        id: 'color',
        name: 'Color',
        type: 'single-select',
        options: [
            { value: 'red', label: 'Red' },
            { value: 'orange', label: 'Orange' },
            { value: 'yellow', label: 'Yellow' },
            { value: 'green', label: 'Green' },
            { value: 'blue', label: 'Blue' },
            { value: 'purple', label: 'Purple' },
            { value: 'gray', label: 'Gray' },
        ],
    },
    {
        id: 'flowStatus',
        name: 'Flow status',
        type: 'multi-select',
        options: [
            { value: 'draft', label: 'Draft' },
            { value: 'submitted', label: 'Submitted' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' },
            { value: 'pending-review', label: 'Pending Review' },
            { value: 'on-hold', label: 'On Hold' },
        ],
    },
    {
        id: 'country',
        name: 'Country',
        type: 'multi-select',
        linkedFilterId: 'subCountry',
        options: [
            { value: 'uae', label: 'United Arab Emirates' },
            { value: 'usa', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
            { value: 'au', label: 'Australia' },
            { value: 'de', label: 'Germany' },
            { value: 'fr', label: 'France' },
            { value: 'jp', label: 'Japan' },
            { value: 'sg', label: 'Singapore' },
        ],
    },
    {
        id: 'subCountry',
        name: 'Sub-country',
        type: 'multi-select',
        options: [
            { value: 'dubai', label: 'Dubai' },
            { value: 'abu-dhabi', label: 'Abu Dhabi' },
            { value: 'sharjah', label: 'Sharjah' },
            { value: 'california', label: 'California' },
            { value: 'texas', label: 'Texas' },
            { value: 'new-york', label: 'New York' },
            { value: 'london', label: 'London' },
            { value: 'manchester', label: 'Manchester' },
        ],
    },
    {
        id: 'myGroups',
        name: 'My groups',
        type: 'multi-select',
        options: [
            { value: 'engineering', label: 'Engineering' },
            { value: 'design', label: 'Design' },
            { value: 'product', label: 'Product Management' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'sales', label: 'Sales' },
            { value: 'support', label: 'Customer Support' },
            { value: 'hr', label: 'Human Resources' },
            { value: 'finance', label: 'Finance' },
        ],
    },
    {
        id: 'priority',
        name: 'Priority',
        type: 'single-select',
        options: [
            { value: 'critical', label: 'Critical' },
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' },
        ],
    },
    {
        id: 'assignee',
        name: 'Assignee',
        type: 'multi-select',
        options: [
            { value: 'user1', label: 'John Doe' },
            { value: 'user2', label: 'Jane Smith' },
            { value: 'user3', label: 'Robert Johnson' },
            { value: 'user4', label: 'Emily Davis' },
            { value: 'user5', label: 'Michael Wilson' },
            { value: 'unassigned', label: 'Unassigned' },
        ],
    },
];

// Mock saved searches
export const mockSavedSearches: SavedSearch[] = [
    {
        id: '1',
        name: 'High Priority Tasks',
        filters: {
            priority: 'high',
            workStatus: ['in-progress', 'review'],
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
    },
    {
        id: '2',
        name: 'UAE Engineering Tasks',
        filters: {
            country: ['uae'],
            myGroups: ['engineering'],
            workStatus: ['not-started', 'in-progress'],
        },
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18'),
    },
    {
        id: '3',
        name: 'Blocked Items',
        filters: {
            workStatus: ['blocked'],
        },
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05'),
    },
];
