import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Link,
    Divider,
} from '@mui/material';

interface DocumentPreviewBodyProps {
    content?: string;
    summary?: string;
    mode?: 'read' | 'edit';
    onContentChange?: (content: string) => void;
}

/**
 * DocumentPreviewBody - Main content section of document preview
 * Displays rich formatted document content including:
 * - Summary section with highlighted text
 * - Main content with paragraphs, lists
 * - Embedded entities (people, locations, references)
 * - Tables with data
 * - Links and formatted text
 */
export const DocumentPreviewBody: React.FC<DocumentPreviewBodyProps> = ({
    content,
    summary,
    mode: _mode = 'read',
    onContentChange: _onContentChange,
}) => {

    // Mock data for demonstration - replace with actual content
    const mockSummary =
        '"شركة الأمن XYZ" هي شركة معروفة تقدم خدمات أمنية متميزة. نركز على توفير حلول أمنية عالية الجودة لعملائنا في مختلف أنحاء العالم. بفضل فريقنا من المتخصصين المدربين، نقدم خدمات متنوعة تشمل الاستشارات الأمنية وتقييم المخاطر وإدارة الأمن.';

    const mockContent = `تم جمع العمل على مدى قرون عديدة من قبل مؤلفين ومترجمين وباحثين مختلفين من غرب آسيا و جنوب آسيا و آسيا الوسطى و شمال أفريقيا. تعود جذور بعض الحكايات إلى الأدب العربي والسنسكريتي والفارسي القديم والعصور الوسطى وأدب بلاد ما بين النهرين.`;

    return (
        <Paper
            elevation={1}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                p: 2,
                borderRadius: 1,
                backgroundColor: 'background.surface_2',
                boxShadow: '0px 1px 2px 0px rgba(15, 15, 15, 0.12), 0px 1px 3px 1px rgba(15, 15, 15, 0.08)',
            }}
        >
            {/* Summary Section */}
            {summary || mockSummary ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'right',
                            color: 'text.disabled',
                            fontSize: '1.25rem',
                            fontWeight: 500,
                        }}
                    >
                        ملخص
                    </Typography>
                    <Box
                        sx={{
                            p: 2,
                            backgroundColor: 'background.default',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            textAlign: 'right',
                            '& p': {
                                margin: 0,
                                lineHeight: 1.8,
                                color: 'text.primary',
                            },
                        }}
                    >
                        <Typography
                            component="p"
                            sx={{
                                lineHeight: 1.8,
                                color: 'text.primary',
                                fontSize: '1rem',
                            }}
                        >
                            {summary || mockSummary}
                        </Typography>
                    </Box>
                </Box>
            ) : null}

            {/* Content Section */}
            {content || mockContent ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'right',
                            color: 'text.disabled',
                            fontSize: '1.25rem',
                            fontWeight: 500,
                        }}
                    >
                        المحتوى
                    </Typography>

                    <Box
                        sx={{
                            p: 2,
                            backgroundColor: 'background.default',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            textAlign: 'right',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                        }}
                    >
                        {/* Main content paragraph with embedded entities */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography
                                sx={{
                                    lineHeight: 1.8,
                                    color: 'text.primary',
                                    fontSize: '1rem',
                                    textAlign: 'right',
                                }}
                            >
                                تم جمع العمل على مدى قرون عديدة من قبل مؤلفين ومترجمين وباحثين مختلفين من{' '}
                                <Link
                                    href="#"
                                    sx={{
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        '&:hover': { textDecoration: 'underline' },
                                    }}
                                >
                                    غرب آسيا
                                </Link>{' '}
                                و{' '}
                                <Link
                                    href="#"
                                    sx={{
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        '&:hover': { textDecoration: 'underline' },
                                    }}
                                >
                                    جنوب آسيا
                                </Link>{' '}
                                و{' '}
                                <Link
                                    href="#"
                                    sx={{
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        '&:hover': { textDecoration: 'underline' },
                                    }}
                                >
                                    آسيا الوسطى
                                </Link>{' '}
                                و{' '}
                                <Link
                                    href="#"
                                    sx={{
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        '&:hover': { textDecoration: 'underline' },
                                    }}
                                >
                                    شمال أفريقيا
                                </Link>
                                . تعود جذور بعض الحكايات إلى الأدب العربي والسنسكريتي والفارسي القديم والعصور الوسطى وأدب بلاد ما بين النهرين.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Sample Table */}
                        <Table
                            size="small"
                            sx={{
                                '& thead': {
                                    backgroundColor: 'action.hover',
                                },
                                '& th': {
                                    fontWeight: 600,
                                    textAlign: 'right',
                                    padding: '12px 16px',
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                },
                                '& td': {
                                    textAlign: 'right',
                                    padding: '12px 16px',
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                },
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>رأس الجدول</TableCell>
                                    <TableCell>رأس الجدول</TableCell>
                                    <TableCell>رأس الجدول</TableCell>
                                    <TableCell>رأس الجدول</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>خلية</TableCell>
                                    <TableCell>خلية</TableCell>
                                    <TableCell>خلية</TableCell>
                                    <TableCell>خلية</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>خلية</TableCell>
                                    <TableCell>خلية</TableCell>
                                    <TableCell>خلية</TableCell>
                                    <TableCell>خلية</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>خلية</TableCell>
                                    <TableCell>خلية</TableCell>
                                    <TableCell>خلية</TableCell>
                                    <TableCell>خلية</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Divider />

                        {/* Comment/Annotation Section */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    textAlign: 'right',
                                    color: 'text.disabled',
                                    fontSize: '1.25rem',
                                    fontWeight: 500,
                                }}
                            >
                                التعليقات
                            </Typography>
                            <Typography
                                sx={{
                                    lineHeight: 1.8,
                                    color: 'text.primary',
                                    fontSize: '1rem',
                                    textAlign: 'right',
                                }}
                            >
                                تعتبر دولة الإمارات العربية المتحدة واحدة من أبرز الوجهات العالمية، حيث تجمع بين التراث العريق والتطور التكنولوجي.
                                تتميز الإمارات بمعالمها السياحية الرائعة مثل برج خليفة في دبي، وجزيرة ياس في أبوظبي.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ) : null}
        </Paper>
    );
};

export default DocumentPreviewBody;
