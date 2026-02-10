import React, { useState } from 'react';
import { Box, Container, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { DocumentPreview } from '../components/task-management';
import type { DocumentData } from '../components/task-management';

/**
 * DocumentPreviewExample - Demo page for DocumentPreview component
 * Shows both read and edit modes with sample document data
 */
export const DocumentPreviewExample: React.FC = () => {
    const [mode, setMode] = useState<'read' | 'edit'>('read');

    // Sample document data for demonstration
    const sampleDocument: DocumentData = {
        id: 'doc-001',
        subject: 'استراتيجية الأمن السيبراني للشرق الأوسط 2024',
        tags: ['Pakistan', 'UAE', 'تقنية', 'دواء', 'Location', 'Top secret'],
        categories: ['Security', 'Technology', 'Business'],
        status: 'published',
        priority: 'high',
        owner: {
            name: 'Ali Muhammed',
            avatar: '/avatar-placeholder.png',
        },
        createdDate: '2024-01-15',
        updatedDate: '2024-01-27',
        summary:
            '"شركة الأمن XYZ" هي شركة معروفة تقدم خدمات أمنية متميزة. نركز على توفير حلول أمنية عالية الجودة لعملائنا في مختلف أنحاء العالم. بفضل فريقنا من المتخصصين المدربين، نقدم خدمات متنوعة تشمل الاستشارات الأمنية وتقييم المخاطر وإدارة الأمن.',
        content: `تم جمع العمل على مدى قرون عديدة من قبل مؤلفين ومترجمين وباحثين مختلفين من غرب آسيا و جنوب آسيا و آسيا الوسطى و شمال أفريقيا. تعود جذور بعض الحكايات إلى الأدب العربي والسنسكريتي والفارسي القديم والعصور الوسطى وأدب بلاد ما بين النهرين.`,

        extraSections: [
            {
                title: 'معلومات إضافية',
                fields: {
                    'رقم المرجع': 'REF-2024-001',
                    'التصنيف': 'سري للغاية',
                    'تاريخ الإصدار': '15 يناير 2024',
                    'تاريخ الانتهاء': '15 يناير 2025',
                    'الموافقة': 'معتمد من الإدارة العليا',
                    'القسم المسؤول': 'قسم الأمن السيبراني',
                },
            },
            {
                title: 'التفاصيل التقنية',
                fields: {
                    'نظام التشفير': 'AES-256',
                    'البروتوكول': 'HTTPS/TLS 1.3',
                    'مستوى الأمان': 'عالي',
                    'التحديث الأخير': '27 يناير 2024',
                },
            },
        ],
    };

    const handleModeChange = (
        _event: React.MouseEvent<HTMLElement>,
        newMode: 'read' | 'edit' | null
    ) => {
        if (newMode !== null) {
            setMode(newMode);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Document Preview Component Demo
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    This is a demonstration of the DocumentPreview component with all its sub-sections.
                </Typography>

                {/* Mode Toggle */}
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Mode:
                    </Typography>
                    <ToggleButtonGroup
                        value={mode}
                        exclusive
                        onChange={handleModeChange}
                        aria-label="preview mode"
                    >
                        <ToggleButton value="read" aria-label="read mode">
                            Read Mode
                        </ToggleButton>
                        <ToggleButton value="edit" aria-label="edit mode">
                            Edit Mode
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            {/* Document Preview */}
            <Box
                sx={{
                    height: 'calc(100vh - 300px)',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    overflow: 'hidden',
                    backgroundColor: 'background.default',
                }}
            >
                <DocumentPreview
                    document={sampleDocument}
                    mode={mode}
                    onModeChange={setMode}
                    onSave={(updatedDoc) => {
                        console.log('Document saved:', updatedDoc);
                    }}
                />
            </Box>

            {/* Additional Info */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Component Features
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                    <li>
                        <Typography variant="body2">
                            <strong>Subject Section:</strong> Displays document title with inline editing capability
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2">
                            <strong>Static Properties:</strong> Shows document metadata like tags, categories, teams, and owner
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2">
                            <strong>Extra Sections:</strong> Accordion-based expandable sections for additional document fields
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2">
                            <strong>Document Body:</strong> Rich content display with summary, main content, tables, and links
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2">
                            <strong>Tabs:</strong> Navigation between different document aspects (Comments, Keywords, Tasks, etc.)
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2">
                            <strong>LabelChip Component:</strong> Custom chips with optional badge indicators for status/priority
                        </Typography>
                    </li>
                </Box>
            </Box>
        </Container>
    );
};

export default DocumentPreviewExample;
