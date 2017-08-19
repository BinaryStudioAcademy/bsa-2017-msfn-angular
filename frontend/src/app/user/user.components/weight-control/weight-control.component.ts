import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {WeightControlService} from './weight-control.service';
import { DateService } from '../../../services/date.service';
import { FormControl, Validators } from '@angular/forms';
import { ToasterService } from '../../../services/toastr.service';
import {D3Service, D3} from 'd3-ng2-service';

@Component({
    selector: 'app-weight-control',
    templateUrl: './weight-control.component.html',
    styleUrls: ['./weight-control.component.scss'],
    providers: [
        WeightControlService,
        DateService
    ]
})
export class WeightControlComponent implements OnInit {
    @ViewChild('chart') _chart: ElementRef;

    weeklyItems = [];

    newWeight = {
        weight: null,
        waterPct: null,
        boneWeight: null,
        fatPct: null,
        date: ''
    };

    recentDiff = {
        weight: 0,
        bones: 0,
        water: 0,
        fat: 0
    };
    weeklyDiff = {
        weight: 0,
        bones: 0,
        water: 0,
        fat: 0
    };

    recentDay: string;
    currentWeight: number;

    options = [
        {
            value: 'weight',
            recentChecked: true,
            weeklyChecked: true
        },
        {
            value: 'water',
            recentChecked: false,
            weeklyChecked: false
        },
        {
            value: 'bones',
            recentChecked: false,
            weeklyChecked: false
        },
        {
            value: 'fat',
            recentChecked: false,
            weeklyChecked: false
        }
    ];

    settings = {
        recent: {
            symbol: '',
            betterResult: false,
            worseResult: false,
            selection: 'weight',
            measurement: 'kg'
        },
        weekly: {
            symbol: '',
            betterResult: false,
            worseResult: false,
            selection: 'weight',
            measurement: 'kg'
        }
    };

    weightFormControl = new FormControl('', [
        Validators.required,
        Validators.min(30),
        Validators.max(300)
    ]);

    waterFormControl = new FormControl('', [
        Validators.required,
        Validators.min(40),
        Validators.max(80)
    ]);

    boneFormControl = new FormControl('', [
        Validators.required,
        Validators.min(3),
        Validators.max(60)
    ]);

    fatFormControl = new FormControl('', [
        Validators.required,
        Validators.min(5),
        Validators.max(35)
    ]);

    private _d3: D3 = null;

    constructor(private weightControlService: WeightControlService,
                private toasterService: ToasterService,
                private d3Service: D3Service) {
                    this._d3 = d3Service.getD3();
                 }

    // ---------------------------------------------------------

    renderChart() {
        const data = {
            '2004-12-31': 1,
            '2005-12-31': 1.5,
            '2006-12-31': 2,
            '2007-12-31': 2.5,
            '2008-12-31': 11,
            '2009-12-31': 14,
            '2010-12-31': 20,
            '2011-12-31': 2,
            '2012-12-31': 5,
            '2013-12-31': 4,
            '2014-12-31': 7,
            '2015-12-31': 1,
            '2016-12-31': 30,
            '2017-08-10': 9
        };
        const svgNode = this
            ._d3
            .select('#chart');
        const margin = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            width = +svgNode.attr('width') - margin.left - margin.right,
            height = +svgNode.attr('height') - margin.top - margin.bottom,
            g = svgNode
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr('stroke', 'yellow');

        const x = this
            ._d3
            .scaleTime()
            .rangeRound([0, width]);

        const y = this
            ._d3
            .scaleLinear()
            .rangeRound([height, 0]);

        const line = this
            ._d3
            .line()
            .x(function (d: any) {
                return x(d.date);
            })
            .y(function (d: any) {
                return y(d.close);
            });

        const keys = Object.keys(data);
        const dataPoints = [];
        keys.forEach(prop => {
            const date = Date.parse(prop);
            const close = data[prop]
                ? data[prop]
                : 0;
            dataPoints.push({date, close});
        });
        x.domain(this._d3.extent(dataPoints, function (d) {
            return d.date;
        }));
        y.domain(this._d3.extent(dataPoints, function (d) {
            return d.close;
        }));

        const path = g.select('path');

        g
            .append('g')
            .call(this._d3.axisLeft(y))
            .append('text')
            .attr('fill', '#000')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Weight');

        g
            .append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(this._d3.axisBottom(x))
            .select('.domain')
            .remove();

        g
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1.5)
            .attr('d', (line as any));

        g
            .append('path')
            .datum(dataPoints)
            .attr('fill', 'none')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1.5)
            .attr('d', line);
    }

    // ---------------------------------------------------------

    addWeight(): void {
        if (this.weightFormControl.valid &&
            this.waterFormControl.valid &&
            this.boneFormControl.valid &&
            this.fatFormControl.valid) {

            const currentDate = new Date();
            this.newWeight.date = currentDate.toISOString();

            this.weightControlService.addWeight(this.newWeight, res => {
                if (typeof(res) === 'object') {
                    this.toasterService.showMessage('success', null);
                } else {
                    this.toasterService.showMessage('error', null);
                }
            });

            setTimeout(() => this.updateData(), 500);

            this.weightFormControl.reset();
            this.waterFormControl.reset();
            this.boneFormControl.reset();
            this.fatFormControl.reset();
        }
    }

    updateData(): void {
        this.weightControlService.getWeightItems(res => {
            if (res[0].hasOwnProperty('weight')) {
                this.weeklyItems = this.weightControlService.getWeeklyWeightItems(res);
                const recentItem = this.weeklyItems[this.weeklyItems.length - 1];
                this.recentDay = this.weightControlService.getRecentDay(recentItem);
                this.currentWeight = recentItem.weight;

                if (this.weeklyItems.length > 1) {
                    this.recentDiff = this.weightControlService.getRecentDiff(this.weeklyItems);
                    this.weeklyDiff = this.weightControlService.getWeeklyDiff(this.weeklyItems);

                    this.changeRecentOption('weight');
                    this.changeWeeklyOption('weight');
                }
            }
        });
    }

    changeRecentOption(option): void {
        const settings = this.weightControlService.changeOption(option, this.recentDiff);

        this.settings.recent.betterResult = settings.betterResult;
        this.settings.recent.worseResult = settings.worseResult;
        this.settings.recent.selection = settings.selection;
        this.settings.recent.symbol = settings.symbol;
        this.settings.recent.measurement = settings.measurement;

        for (const item of this.options) {
            item.recentChecked = item.value === option;
        }
    }

    changeWeeklyOption(option): void {
        const settings = this.weightControlService.changeOption(option, this.weeklyDiff);

        this.settings.weekly.betterResult = settings.betterResult;
        this.settings.weekly.worseResult = settings.worseResult;
        this.settings.weekly.selection = settings.selection;
        this.settings.weekly.symbol = settings.symbol;
        this.settings.weekly.measurement = settings.measurement;

        for (const item of this.options) {
            item.weeklyChecked = item.value === option;
        }
    }

    ngOnInit() {
        this.updateData();
        this.renderChart();
    }
}
