import { Injectable } from '@angular/core';
import { IssuesModel } from './issues.model';

@Injectable()
export class IssuesProcessor {
    process(data, months) {
        const mappedIssues = this.filterByMonth(this.mapIssues(data), months);
        const groupedIssues = this.groupIssues(mappedIssues);

        return new IssuesModel(
          mappedIssues,
          groupedIssues.open.length,
          groupedIssues.closed.length,
          groupedIssues,
          this.groupLabels(mappedIssues),
          this.distribution(mappedIssues),
          this.closeRate(groupedIssues))
    }
    mapIssues(data) {
        return data.reduce((agg, curr) => [...agg, ...curr], [])
                   .filter(issue => !issue.pull_request)
                   .map((item: any) => ({
                        state: item.state,
                        date: new Date(item.created_at),
                        count: 1,
                        labels: item.labels,
                        created_at: item.created_at
                    }))
    }

    flatten(data) {
      return data.reduce((agg, curr) => agg.concat(curr));
    }

    aggregate(data, field) {
      return data.reduce((agg, curr) => {
                 agg[curr[field]] = (agg[curr[field]] || 0) + 1
    	           return agg;
               }, {})
    }

    closeRate(data) {
        const closed = this.aggregate(data.closed.map(item => ({
          created_at: new Date(item.created_at).setHours(0,0,0,0)
        })), 'created_at')

        const open = this.aggregate(data.open.map(item => ({
          created_at: new Date(item.created_at).setHours(0,0,0,0)
        })), 'created_at')

        const rate = Object.keys(closed).map(key => {
          const closedKey = closed[key] || 0;
          const openKey = open[key] || 0;
          const closeRate = closedKey / (closedKey + openKey);
          return {
            created_at: key,
            close_rate: closeRate
          }
        })
        return {
          lowest: rate.reduce((agg, curr) => agg.close_rate < curr.close_rate ? agg : curr),
          highest: rate.reduce((agg, curr) => agg.close_rate > curr.close_rate ? agg : curr),
          average: data.closed.length / (data.open.length + data.closed.length)
        }
    }

    groupIssues(data) {
      return data.reduce((agg, curr) => {
                    agg[curr.state].push(curr);
                    return agg
                  }, { open: [], closed: [] });
    }

    groupLabels(data) {
      const labels = this.aggregate(this.flatten(data.map(item => item.labels)), 'name');
      const low = (labels['SEV: Low'] / data.length);
      const medium = labels['SEV: Medium'] / data.length;
      const high = labels['SEV: High'] / data.length;
      const enhancement = labels['Enhancement'] / data.length;
      const feature = labels['Feature'] / data.length;
      const other = 1 - low - medium - high - enhancement - feature;

      return [
        { type: 'SEV: LOW', value: parseFloat(low.toFixed(2)) },
        { type: 'SEV: MEDIUM', value: parseFloat(medium.toFixed(2))},
        { type: 'SEV: HIGH', value: parseFloat(high.toFixed(2))},
        { type: 'ENHANCEMENT', value: parseFloat(enhancement.toFixed(2))},
        { type: 'FEATURE', value: parseFloat(feature.toFixed(2))},
        { type: 'OTHER', value: parseFloat(other.toFixed(2))}
      ]
    }

    distribution(data) {
        return data.map(item => ({
                  created_at: new Date(item.created_at).setHours(0,0,0,0),
                  label: this.cleanupLabels(item.labels)
                }))
                .reduce((agg, curr) => {
                  agg[curr.label].push({
                    date: new Date(curr.created_at),
                    value: 1
                  });
                  return agg
                }, { Others: [], Enhancement: [], 'SEV: Low': [] });
  }

  cleanupLabels(labels) {
    let filtered = labels.filter(label => label.name === 'SEV: Low' || label.name === 'Enhancement')
                         .map(label => label.name)
    return filtered.length === 0 ? 'Others' : filtered[0];
  }

  filterByMonth(data, months) {
        return data.filter(value => {
          return new Date(value.created_at).getTime() > this.getMonthsRange(months).getTime();
        })
    }

    getMonthsRange(months) {
        let since = new Date();
        since.setMonth(since.getMonth() - months);
        return since;
    }
}