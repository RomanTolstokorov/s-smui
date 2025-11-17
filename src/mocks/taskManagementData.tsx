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
];
