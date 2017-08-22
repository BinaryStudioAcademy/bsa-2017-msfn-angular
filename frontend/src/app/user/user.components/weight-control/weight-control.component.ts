import {Component, OnInit} from '@angular/core';
import {WeightControlService} from './weight-control.service';
import {DateService} from '../../../services/date.service';
import {FormControl, Validators} from '@angular/forms';
import {ToasterService} from '../../../services/toastr.service';
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
    periodItems = [];

    newWeight = {
        weight: null,
        waterPct: null,
        boneWeight: null,
        fatPct: null,
        date: ''
    };

    recentDiff = {
        weight: 0,
        boneWeight: 0,
        waterPct: 0,
        fatPct: 0
    };
    periodDiff = {
        weight: 0,
        boneWeight: 0,
        waterPct: 0,
        fatPct: 0
    };

    recentDay: string;
    currentWeight: number;

    options = [
        {
            value: 'weight',
            checked: true,
        },
        {
            value: 'waterPct',
            checked: false,
        },
        {
            value: 'boneWeight',
            checked: false,
        },
        {
            value: 'fatPct',
            checked: false,
        }
    ];

    period = {
        max: new Date(),
        min: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
    };

    settings = {
        symbol: '',
        betterResult: false,
        worseResult: false,
        selection: 'weight',
        measurement: 'kg'
    };

    margin = {
        top: 40,
        right: 30,
        bottom: 20,
        left: 30
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

    private _d3: any = null;
    public chartActive = false;

    constructor(private weightControlService: WeightControlService,
                private toasterService: ToasterService,
                private d3Service: D3Service) {
        this._d3 = d3Service.getD3();
    }

    ngOnInit() {
        this.updateData();
    }

    renderChart() {
        if (this.chartActive) {
            this.updateChart();
            return;
        }

        this.chartActive = true;

        const data = this.periodItems.map((item, key) => {
            return {
                value: item[this.settings.selection],
                date: new Date(item.date).getTime()
            };
        });
        const svgNode = this._d3.select('#chart');

        const width = +svgNode.node().clientWidth - this.margin.left - this.margin.right,
            height = +svgNode.node().clientHeight - this.margin.top - this.margin.bottom,
            g = svgNode
                .append('g')
                .attr('class', 'wrapper')
                .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
                .attr('stroke', 'yellow');

        const x = this._d3.scaleTime().rangeRound([0, width]);
        const y = this._d3.scaleLinear().rangeRound([height, 0]);

        const xAxis = this._d3.axisBottom().scale(x).ticks(5);
        const yAxis = this._d3.axisLeft().scale(y).ticks(5);

        x.domain(
            this._d3.extent(data, function (d) {
                return d.date;
            })
        );
        y.domain(
            [
                0,
                this._d3.max(data, function (d) {
                    return d.value;
                })
            ]
        );

        const line = this._d3.line()
            .x(function (d: any) {
                return x(d.date);
            })
            .y(function (d: any) {
                return y(d.value);
            });

        const path = g.select('path');

        g.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .attr('class', 'x_axis')
            .call(xAxis)
            .select('.domain')
            .remove();

        g.append('g')
            .attr('class', 'y_axis')
            .call(yAxis)
            .append('text')
            .attr('class', 'y_axis_text')
            .attr('fill', '#000')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Weight');

        g.append('path')
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1.5)
            .attr('d', line(data));

        g.selectAll('circle')
            .data(data)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('r', 5)
            .attr('cx', d => {
                return x(new Date(d.date));
            })
            .attr('cy', d => {
                return y(d.value);
            })
            .on('mouseover', d => {
                this.showData(d);
            })
            .on('mouseout', d => {
                this.hideData();
            });
    }

    showData(element) {
        const e = this._d3.event;
        const target = e.currentTarget;
        const coord = this._d3.mouse(target);

        const tooltip = this._d3.select('.tooltip');
        tooltip.transition()
            .duration(200)
            .style('opacity', 0.9);
        tooltip.html(element.value)
            .style('transform', `translate(${coord[0] + this.margin.left - 10}px,${coord[1] + this.margin.top - 20}px)`);

        this._d3.select(target)
            .transition()
            .duration(200)
            .attr('r', 7);
    }


    hideData() {
        const e = this._d3.event;
        const target = e.currentTarget;
        const tooltip = this._d3.select('.tooltip');
        tooltip.transition()
            .duration(200)
            .style('opacity', 0);

        this._d3.select(target)
            .transition()
            .duration(200)
            .attr('r', 5);
    }

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
                setTimeout(() => {
                    this.updateData();
                    }, 500);
            });

            this.weightFormControl.reset();
            this.waterFormControl.reset();
            this.boneFormControl.reset();
            this.fatFormControl.reset();
        }
    }

    updateData(): void {
        this.weightControlService.getWeightItems(res => {
            if (res[0].hasOwnProperty('weight')) {
                // this.periodItems = this.weightControlService.getWeeklyWeightItems(res);
                this.periodItems = this.weightControlService.getItemsForPeriod(res, this.period);
                const recentItem = this.periodItems[this.periodItems.length - 1];
                if (recentItem) {
                    this.recentDay = this.weightControlService.getRecentDay(recentItem);
                    this.currentWeight = recentItem.weight;
                }

                if (this.periodItems.length > 1) {
                    this.recentDiff = this.weightControlService.getRecentDiff(this.periodItems);
                    this.periodDiff = this.weightControlService.getPeriodDiff(this.periodItems);

                    this.changeOption('weight');
                }
            }
        });
    }

    changeOption(option): void {
        const settings = this.weightControlService.changeOption(option, this.recentDiff);

        this.settings.betterResult = settings.betterResult;
        this.settings.worseResult = settings.worseResult;
        this.settings.selection = settings.selection;
        this.settings.symbol = settings.symbol;
        this.settings.measurement = settings.measurement;

        for (const item of this.options) {
            item.checked = item.value === option;
        }
        this.renderChart();
    }

    updateChart() {
        const svg = this._d3.select('#chart');

        const data = this.periodItems.map(item => {
            return {
                value: item[this.settings.selection],
                date: new Date(item.date).getTime()
            };
        });

        const width = +svg.node().clientWidth - this.margin.left - this.margin.right,
            height = +svg.node().clientHeight - this.margin.top - this.margin.bottom;

        const x = this._d3.scaleTime().rangeRound([0, width]);
        const y = this._d3.scaleLinear().rangeRound([height, 0]);

        x.domain(
            this._d3.extent(data, function (d) {
                return d.date;
            })
        );
        y.domain(
            [
                0,
                this._d3.max(data, function (d) {
                    return d.value;
                })
            ]
        );

        const xAxis = this._d3.axisBottom().scale(x);
        const yAxis = this._d3.axisLeft().scale(y);

        const line = this._d3.line()
            .x(function (d: any) {
                return x(d.date);
            })
            .y(function (d: any) {
                return y(d.value);
            });

        svg.transition()
            .select('.line')
            .duration(750)
            .attr('d', line(data));

        svg.transition()
            .select('.x_axis')
            .duration(750)
            .call(xAxis);

        svg.transition()
            .select('.y_axis')
            .duration(750)
            .call(yAxis)
            .select('.y_axis_text')
            .text(this.settings.selection);

        const wrapper = svg.select('.wrapper');
        const circles = wrapper.selectAll('circle').data(data);

        circles.exit().remove();

        circles
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('r', 5)
            .attr('cx', d => {
                return x(new Date(d.date));
            })
            .attr('cy', d => {
                return y(d.value);
            })
            .on('mouseover', d => {
                this.showData(d);
            })
            .on('mouseout', d => {
                this.hideData();
            });

        circles
            .transition()
            .duration(750)
            .attr('cx', d => {
                return x(new Date(d.date));
            })
            .attr('cy', d => {
                return y(d.value);
            });
    }
}
