import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';

export interface AnalyticsEvent {
  type: 'pageview' | 'click' | 'time_spent' | 'interaction';
  section?: string;
  element?: string;
  timestamp: number;
  duration?: number;
}

class AnalyticsService {
  private sessionId: string;
  private startTimes: Map<string, number> = new Map();
  private pageEnterTime: number = Date.now();
  public isIncognito = ref(false);
  

  private analyticsData = reactive({
    pageViews: {} as Record<string, number>,
    clicks: {} as Record<string, number>,
    timeSpent: {} as Record<string, number>,
    sessions: [] as Array<{ start: number; end: number; duration: number }>,
    topProjects: [] as Array<{ name: string; views: number }>
  });

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadLocalData();
    this.setupBeforeUnload();
  }

  private generateSessionId(): string {
    let id = localStorage.getItem('analytics_session_id');
    if (!id) {
      id = 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('analytics_session_id', id);
    }
    return id;
  }

  private loadLocalData() {
    const saved = localStorage.getItem('analytics_data');
    if (saved && !this.isIncognito.value) {
      try {
        const data = JSON.parse(saved);
        Object.assign(this.analyticsData, data);
      } catch (e) {}
    }
  }

  private saveLocalData() {
    if (!this.isIncognito.value) {
      localStorage.setItem('analytics_data', JSON.stringify({
        pageViews: this.analyticsData.pageViews,
        clicks: this.analyticsData.clicks,
        timeSpent: this.analyticsData.timeSpent,
        sessions: this.analyticsData.sessions.slice(-50) 
      }));
    }
  }

  private setupBeforeUnload() {
    window.addEventListener('beforeunload', () => {
      this.trackSessionEnd();
      this.saveLocalData();
    });
  }

  private trackSessionEnd() {
    const duration = (Date.now() - this.pageEnterTime) / 1000;
    this.analyticsData.sessions.push({
      start: this.pageEnterTime,
      end: Date.now(),
      duration
    });
  }

  trackPageView(page: string, section?: string) {
    if (this.isIncognito.value) return;

    this.analyticsData.pageViews[page] = (this.analyticsData.pageViews[page] || 0) + 1;
    
    if (this.startTimes.has('page')) {
      const previousPage = Array.from(this.startTimes.keys())[0];
      const duration = (Date.now() - (this.startTimes.get(previousPage) || 0)) / 1000;
      this.analyticsData.timeSpent[previousPage] = 
        (this.analyticsData.timeSpent[previousPage] || 0) + duration;
    }
    
    this.startTimes.set(page, Date.now());
    this.saveLocalData();
    
    window.dispatchEvent(new CustomEvent('analytics-update', { 
      detail: this.getAnalyticsSummary() 
    }));
  }


  trackClick(element: string, section: string) {
    if (this.isIncognito.value) return;
    
    const key = `${section}:${element}`;
    this.analyticsData.clicks[key] = (this.analyticsData.clicks[key] || 0) + 1;
    this.saveLocalData();
    
    window.dispatchEvent(new CustomEvent('analytics-update', { 
      detail: this.getAnalyticsSummary() 
    }));
  }

  trackSectionTime(section: string, duration: number) {
    if (this.isIncognito.value) return;
    
    this.analyticsData.timeSpent[section] = 
      (this.analyticsData.timeSpent[section] || 0) + duration;
    this.saveLocalData();
  }

  getAnalyticsSummary() {
    const topProject = Object.entries(this.analyticsData.pageViews)
      .filter(([key]) => key.includes('/projects/') || key === '/projects')
      .sort(([,a], [,b]) => b - a)[0];
    
    return {
      totalPageViews: Object.values(this.analyticsData.pageViews).reduce((a, b) => a + b, 0),
      totalClicks: Object.values(this.analyticsData.clicks).reduce((a, b) => a + b, 0),
      averageSessionDuration: this.calculateAverageSessionDuration(),
      topPages: this.getTopPages(5),
      topClicks: this.getTopClicks(5),
      mostViewedProject: topProject ? { name: topProject[0], views: topProject[1] } : null,
      timeSpentBySection: this.analyticsData.timeSpent,
      engagementScore: this.calculateEngagementScore()
    };
  }

  private getTopPages(limit: number) {
    return Object.entries(this.analyticsData.pageViews)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([page, views]) => ({ page, views }));
  }

  private getTopClicks(limit: number) {
    return Object.entries(this.analyticsData.clicks)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([element, clicks]) => ({ element, clicks }));
  }

  private calculateAverageSessionDuration(): number {
    if (this.analyticsData.sessions.length === 0) return 0;
    const total = this.analyticsData.sessions.reduce((sum, s) => sum + s.duration, 0);
    return total / this.analyticsData.sessions.length;
  }

  private calculateEngagementScore(): number {
    const avgSessionTime = this.calculateAverageSessionDuration();
    const totalViews = Object.keys(this.analyticsData.pageViews).length;
    const totalInteractions = Object.keys(this.analyticsData.clicks).length;
    
    let score = 0;
    if (avgSessionTime > 120) score += 30;
    else if (avgSessionTime > 60) score += 20;
    else if (avgSessionTime > 30) score += 10;
    
    if (totalViews > 5) score += 30;
    else if (totalViews > 3) score += 20;
    else if (totalViews > 1) score += 10;
    
    if (totalInteractions > 10) score += 40;
    else if (totalInteractions > 5) score += 30;
    else if (totalInteractions > 2) score += 20;
    else if (totalInteractions > 0) score += 10;
    
    return score;
  }


  toggleIncognito() {
    this.isIncognito.value = !this.isIncognito.value;
    if (this.isIncognito.value) {
      this.analyticsData.pageViews = {};
      this.analyticsData.clicks = {};
      this.analyticsData.timeSpent = {};
      localStorage.removeItem('analytics_data');
    } else {
      this.loadLocalData();
    }
    window.dispatchEvent(new CustomEvent('incognito-toggle', { 
      detail: { isIncognito: this.isIncognito.value } 
    }));
  }


  exportData() {
    return {
      exportedAt: new Date().toISOString(),
      sessionId: this.sessionId,
      data: this.analyticsData,
      summary: this.getAnalyticsSummary()
    };
  }


  resetData() {
      this.analyticsData.pageViews = {};
      this.analyticsData.clicks = {};
      this.analyticsData.timeSpent = {};
      this.analyticsData.sessions = [];
      this.saveLocalData();
      window.location.reload();
  }
}

export const analytics = new AnalyticsService();