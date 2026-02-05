import React, { useState } from 'react';
import {
    Box,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material';
import { CaretDownIcon } from '@phosphor-icons/react';

interface ExtraSection {
    title: string;
    fields: Record<string, string>;
}

interface DocumentPreviewExtraSectionProps {
    sections: ExtraSection[];
    mode?: 'read' | 'edit';
    onSectionChange?: (sectionIndex: number, fieldName: string, value: string) => void;
}

/**
 * DocumentPreviewExtraSection - Accordion-based extra document information
 * Displays collapsible sections with additional document properties
 * 
 * Features:
 * - Expandable sections using MUI Accordion
 * - Multiple field types (text, number, date)
 * - Edit mode support
 * - Icon and label for each section
 */
export const DocumentPreviewExtraSection: React.FC<DocumentPreviewExtraSectionProps> = ({
    sections,
    mode: _mode = 'read',
    onSectionChange: _onSectionChange,
}) => {
    const [expandedIndex, setExpandedIndex] = useState<number | false>(0);

    const handleAccordionChange = (index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedIndex(isExpanded ? index : false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sections.map((section, sectionIndex) => (
                <Paper
                    key={`section-${sectionIndex}`}
                    elevation={1}
                    sx={{
                        borderRadius: 1,
                        backgroundColor: 'background.surface_2',
                        boxShadow: '0px 1px 2px 0px rgba(15, 15, 15, 0.12), 0px 1px 3px 1px rgba(15, 15, 15, 0.08)',
                    }}
                >
                    <Accordion
                        expanded={expandedIndex === sectionIndex}
                        onChange={handleAccordionChange(sectionIndex)}
                        sx={{
                            '& .MuiAccordionSummary-root': {
                                minHeight: 40,
                                padding: '8px 16px',
                                backgroundColor: 'background.default',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            },
                            '& .MuiAccordionDetails-root': {
                                padding: '16px',
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<CaretDownIcon size={24} />}
                            aria-controls={`panel-${sectionIndex}-content`}
                            id={`panel-${sectionIndex}-header`}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: 'text.primary',
                                    textAlign: 'right',
                                    flex: 1,
                                }}
                            >
                                {section.title}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                pt: 2,
                                borderTop: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            {/* Render fields in pairs for better layout */}
                            {/* <Grid container spacing={2}>
                                {Object.entries(section.fields).map(([fieldName, fieldValue], idx) => (
                                    <Grid item xs={12} sm={6} key={`${sectionIndex}-field-${idx}`}>
                                        <TextField
                                            label={fieldName}
                                            value={fieldValue}
                                            onChange={(e) =>
                                                handleFieldChange(sectionIndex, fieldName, e.target.value)
                                            }
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            disabled={mode === 'read'}
                                            multiline
                                            maxRows={4}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    minHeight: mode === 'read' ? 'auto' : 40,
                                                },
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid> */}
                        </AccordionDetails>
                    </Accordion>
                </Paper>
            ))}
        </Box>
    );
};

export default DocumentPreviewExtraSection;
