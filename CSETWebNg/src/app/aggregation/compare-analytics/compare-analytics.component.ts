////////////////////////////////
//
//   Copyright 2020 Battelle Energy Alliance, LLC
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all
//  copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.
//
////////////////////////////////
import { Component, OnInit } from '@angular/core';
import { AggregationService } from '../../services/aggregation.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NavigationAggregService } from '../../services/navigationAggreg.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-compare-analytics',
  templateUrl: './compare-analytics.component.html'
})
export class CompareAnalyticsComponent implements OnInit {

  tab: string;

  constructor(
    public aggregationSvc: AggregationService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public navSvc: NavigationAggregService,
    private authSvc: AuthenticationService,
    public configSvc: ConfigService
  ) { }

  ngOnInit() {
    this.tab = 'SUMMARY';
  }

  /**
   * Change the current tab based on user selection.
   * @param clickedTab
   */
  changeState(clickedTab: string) {
    this.tab = clickedTab;
  }

  generateReport(reportType: string) {
    // Copied from reports.component to generate the trend report in a similar fashion to existing reports.
    this.authSvc.getShortLivedToken().subscribe((response: any) => {
        const url = this.configSvc.reportsUrl + 'index.html?token=' + response.Token + '&routePath=' + reportType;
        window.open(url, "_blank");
    });
  }
}
