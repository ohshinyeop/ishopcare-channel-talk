export interface TableProps {
    id?: number;
    userId?: number;
    name?: string;
    description?: string;
    state?: string;
    contactMediumType?: string;
    appMessenger?: string;
    managerIds?: string;
    assigneeId?: string;
    tags?: string;
    priority?: string;
    firstOpenedAt?: string;
    openedAt?: string;
    firstRepliedAtAfterOpen?: string;
    createdAt?: string;
    waitingTime?: string;
    avgReplyTime?: string;
    totalReplyTime?: string;
    replyCount?: string;
    operationWaitingTime?: string;
    operationAvgReplyTime?: string;
    operationTotalReplyTime?: string;
    operationReplyCount?: string;
    goalState?: string;
    url?: string;
}