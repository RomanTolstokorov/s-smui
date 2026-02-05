import type { TaskItemData } from '../components/task-management/TaskListItem';
import { Circle, CheckCircle, Info, Bell } from '@phosphor-icons/react';

const TypeIcon = ({ Icon }: { Icon: any }) => <Icon size={24} color="var(--mui-palette-components-icon-secondary)" />;

export const mockTaskItems: TaskItemData[] = [
    {
        id: '624354',
        subject: 'مهمة ذات صلة',
        submissionDate: '18/11/2020',
        assignee: {
            name: 'Mohammed Ahmed',
            avatar: undefined,
        },
        fromUser: {
            name: 'Sarah Hassan',
            avatar: undefined,
        },
        workStatus: 'todo',
        isUrgent: true,
        linkedTasksCount: 2,
        attachmentsCount: 3,
        flowStatus: 'QA-مفتوح',
        ejsContent: 'معلومات إضافية',
        typeIcon: <TypeIcon Icon={CheckCircle} />,
    },
    {
        id: '624355',
        subject: 'معقدة ذات صلة',
        submissionDate: '18/11/2020',
        assignee: {
            name: 'Sarah Ali',
            avatar: undefined,
        },
        fromUser: {
            name: 'Omar Ibrahim',
            avatar: undefined,
        },
        workStatus: 'in_progress',
        isUrgent: false,
        linkedTasksCount: 1,
        attachmentsCount: 1,
        flowStatus: 'التطوير-قيد التنفيذ',
        ejsContent: 'مهمة عاجلة للمراجعة',
        typeIcon: <TypeIcon Icon={Info} />,
    },
    {
        id: '624356',
        subject: 'مهمة القانونية السنوية - موضوع التسم الطويل...',
        submissionDate: '18/11/2020',
        assignee: {
            name: 'Omar Hassan',
            avatar: undefined,
        },
        fromUser: {
            name: 'Fatima Ahmed',
            avatar: undefined,
        },
        workStatus: undefined, // No work status shown
        isUrgent: false,
        linkedTasksCount: 5,
        attachmentsCount: 2,
        flowStatus: 'المراجعة-منتظر',
        ejsContent: 'تتطلب موافقة إدارية',
        typeIcon: <TypeIcon Icon={Bell} />,
    },
    {
        id: '624357',
        subject: 'معقدة ذات صلة',
        submissionDate: '19/11/2020',
        assignee: {
            name: 'Fatima Ibrahim',
            avatar: undefined,
        },
        fromUser: {
            name: 'Ahmed Khalid',
            avatar: undefined,
        },
        workStatus: 'todo',
        isUrgent: true,
        linkedTasksCount: 0, // No linked tasks
        attachmentsCount: 0, // No attachments
        flowStatus: 'جديد',
        ejsContent: undefined, // No EJS content
        typeIcon: <TypeIcon Icon={Circle} />,
    },
    {
        id: '324231',
        subject: 'مهمة القانونية السنوية - موضوع التسم الطويل...',
        submissionDate: '19/11/2020',
        assignee: {
            name: 'Ahmed Khalid',
            avatar: undefined,
        },
        fromUser: {
            name: 'Laila Mohammed',
            avatar: undefined,
        },
        workStatus: 'in_progress',
        isUrgent: false,
        linkedTasksCount: 3,
        attachmentsCount: 4,
        flowStatus: 'QA-قيد الاختبار',
        ejsContent: 'مهمة مركبة مع عدة ملفات',
        typeIcon: <TypeIcon Icon={CheckCircle} />,
    },
    {
        id: '324354',
        subject: 'المضاع المتقاطبة والتبادلية',
        submissionDate: '20/11/2020',
        assignee: {
            name: 'Laila Mohammed',
            avatar: undefined,
        },
        fromUser: {
            name: 'Yousef Ali',
            avatar: undefined,
        },
        workStatus: undefined,
        isUrgent: false,
        linkedTasksCount: 1,
        attachmentsCount: 1,
        flowStatus: 'مكتمل',
        ejsContent: 'تم التسليم بنجاح',
        typeIcon: <TypeIcon Icon={Info} />,
    },
    {
        id: '624358',
        subject: 'المضاع المتقاطبة والتبادلية',
        submissionDate: '20/11/2020',
        assignee: {
            name: 'Yousef Ali',
            avatar: undefined,
        },
        fromUser: {
            name: 'Mohammed Ahmed',
            avatar: undefined,
        },
        workStatus: 'todo',
        isUrgent: false,
        linkedTasksCount: 7,
        attachmentsCount: 5,
        flowStatus: 'التخطيط',
        ejsContent: 'مشروع كبير متعدد المراحل',
        typeIcon: <TypeIcon Icon={Bell} />,
    },
    // Document type tasks
    {
        id: 'doc-001',
        subject: 'استراتيجية الأمن السيبراني للشرق الأوسط 2024',
        submissionDate: '15/01/2024',
        taskType: 'document',
        assignee: {
            name: 'Ali Muhammed',
            avatar: undefined,
        },
        fromUser: {
            name: 'Security Department',
            avatar: undefined,
        },
        workStatus: undefined,
        isUrgent: true,
        linkedTasksCount: 3,
        attachmentsCount: 5,
        flowStatus: 'مراجعة',
        typeIcon: <TypeIcon Icon={CheckCircle} />,
        documentData: {
            tags: ['Pakistan', 'UAE', 'تقنية', 'دواء', 'Location', 'Top secret'],
            categories: ['Security', 'Technology', 'Business'],
            summary: '"شركة الأمن XYZ" هي شركة معروفة تقدم خدمات أمنية متميزة. نركز على توفير حلول أمنية عالية الجودة لعملائنا في مختلف أنحاء العالم. بفضل فريقنا من المتخصصين المدربين، نقدم خدمات متنوعة تشمل الاستشارات الأمنية وتقييم المخاطر وإدارة الأمن.',
            content: 'تم جمع العمل على مدى قرون عديدة من قبل مؤلفين ومترجمين وباحثين مختلفين من غرب آسيا و جنوب آسيا و آسيا الوسطى و شمال أفريقيا. تعود جذور بعض الحكايات إلى الأدب العربي والسنسكريتي والفارسي القديم والعصور الوسطى وأدب بلاد ما بين النهرين.',
            metadata: {
                views: 1234,
                downloads: 89,
                shares: 45,
                version: '2.1.0',
            },
            extraSections: [
                {
                    title: 'معلومات إضافية',
                    fields: {
                        'رقم المرجع': 'REF-2024-001',
                        'التصنيف': 'سري للغاية',
                        'تاريخ الإصدار': '15 يناير 2024',
                        'تاريخ الانتهاء': '15 يناير 2025',
                    },
                },
            ],
        },
    },
    {
        id: 'doc-002',
        subject: 'تقرير الأداء الربع سنوي Q4 2023',
        submissionDate: '10/01/2024',
        taskType: 'document',
        assignee: {
            name: 'Fatima Ahmed',
            avatar: undefined,
        },
        fromUser: {
            name: 'Finance Department',
            avatar: undefined,
        },
        workStatus: 'in_progress',
        isUrgent: false,
        linkedTasksCount: 2,
        attachmentsCount: 8,
        flowStatus: 'معتمد',
        typeIcon: <TypeIcon Icon={Info} />,
        documentData: {
            tags: ['Finance', 'Q4', 'Performance', 'Annual'],
            categories: ['Reports', 'Financial'],
            summary: 'تقرير شامل عن أداء الشركة خلال الربع الرابع من عام 2023، يشمل التحليلات المالية والتوصيات الاستراتيجية.',
            content: 'شهد الربع الرابع من عام 2023 نمواً ملحوظاً في جميع القطاعات الرئيسية. تم تحقيق الأهداف المالية المحددة وتجاوزها بنسبة 15%.',
            metadata: {
                views: 856,
                downloads: 123,
                shares: 67,
                version: '1.0.0',
            },
        },
    },
];

