export class IssuesModel {
    constructor(
        public active = [],
        public open = 0,
        public closed = 0,
        public groupedIssues = {
            open: [],
            closed: []
        },
        public issueTypes = [],
        public typesDistribution = {
            Enhancement: [],
            Others: [],
            'SEV: Low': []
        },
        public closeRate = {
            lowest: {
                close_rate: 0,
                created_at: new Date().toISOString()
            },
            highest: {
                close_rate: 0,
                created_at: new Date().toISOString()
            },
            average: 0
        }){}
}