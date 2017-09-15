import { Component, OnInit, Input } from '@angular/core';
import {
    D3Service,
    D3
} from 'd3-ng2-service';

@Component({
    selector: 'app-db-calories',
    templateUrl: './db-calories.component.html',
    styleUrls: [
        './db-calories.component.scss',
        '../../dashboard.component.scss'
    ]
})
export class DbCaloriesComponent implements OnInit {
    private d3: D3;

    constructor(d3Service: D3Service) {
        this.d3 = d3Service.getD3();
    }

    title = 'Burned Calories';

    interval = {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
        endDate: new Date()
    };

    @Input() dayAim: number;
    todayBurnedKcal = 120.6;

    data = [
        {
            day: 'Mon',
            amount: 280
        },
        {
            day : 'Tue',
            amount : 310
        },
        {
            day : 'Wed',
            amount : 350
        },
        {
            day : 'Thu',
            amount : 290
        },
        {
            day : 'Fri',
            amount : 360
        },
        {
            day : 'Sat',
            amount : 320
        },
        {
            day : 'Sun',
            amount : 370
        }
    ];

    ngOnInit() {
        this.renderChart();
    }

    renderChart() {
        const screenWidth = document.body.clientWidth;

        const d3 = this.d3,
            padding: number = 25,
            height: number = 150;
        let width: number,
            barWidth: number,
            xRange: number,
            aimAxisRange: number;

        if (screenWidth > 500) {
            width = 300;
            barWidth = 20;
            xRange = 250;
            aimAxisRange = 300;
        } else {
            width = 200;
            barWidth = 10;
            xRange = 120;
            aimAxisRange = 180;
        }

        let yScale: any;

        const svg = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const xScale = d3.scaleBand()
            .domain(this.data.map(d => {
                return d.day;
            }))
            .range([0, xRange]);

        yScale = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => {
                return d.amount;
            })])
            .range([125, 0]);

        const xAxis = d3.axisBottom(xScale)
            .ticks(8)
            .scale(xScale);

        const yAxis = d3.axisLeft(xScale)
            .scale(yScale)
            .ticks(4);

        svg.append('g')
            .attr('id', 'x-asis')
            .attr('class', 'axis')
            .attr('transform', `translate(${padding}, ${(height - padding)})`)
            .call(xAxis);

        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${padding}, ${0})`)
            .call(yAxis);

        svg.selectAll('path')
            .attr('stroke', '#fff');
        svg.selectAll('line')
            .attr('stroke', '#fff');
        svg.selectAll('text')
            .attr('fill', '#fff');

        svg.selectAll('#x-asis text')
            .style('transform', 'translate(-10px, 5px) rotate(-45deg)');

        const bars = svg.selectAll('rect')
            .data(this.data);
        bars.size();

        const newBars = bars.enter();

        newBars.append('rect')
            .attr('x', d => {
                return xScale(d.day);
            })
            .attr('y', d => {
                return yScale(d.amount + 55);
            })
            .attr('transform', `translate(${padding + barWidth / 3}, ${padding - 5})`)
            .attr('height', d => {
                return height - yScale(d.amount) - padding - 2;
            })
            .attr('width', barWidth)
            .attr('fill', () => {
                return '#82ca9c';
            })
            .on('mouseover', d => {
                this.showTip(d, svg);
            })
            .on('mouseout', () => {
                this.hideTip();
            });

        const dayAimElement = d3.select('#day-aim');

        dayAimElement.select('line')
            .attr('x2', aimAxisRange)
            .style('transform', `translate(0, ${125 - (this.dayAim / 3)}px)`);
        dayAimElement.select('text')
            .html('aim')
            .style('transform',
                   `translate(${aimAxisRange - 30}px, ${120 - (this.dayAim / 3)}px)`);
    }

    showTip(element, parentElement) {
        const e = this.d3.event,
            target = e.currentTarget,
            xCoord = this.d3.mouse(target)[0] <= 20 ? 30 : this.d3.mouse(target)[0],
            yCoord = this.d3.mouse(target)[1] > 0 ?
                     this.d3.mouse(target)[1] + 5 : this.d3.mouse(target)[1] + 35;

        parentElement.append('rect')
            .style('transform', `translate(${xCoord - 7}px, ${yCoord - 18}px)`)
            .style('position', 'absolute')
            .style('opacity', 0)
            .attr('id', 'tooltip-bg')
            .attr('height', 25)
            .attr('width', 40)
            .attr('rx', 4)
            .attr('ry', 4)
            .attr('fill', '#222')
            .transition()
            .duration(100)
            .style('opacity', 1);

        const tooltip = parentElement.append('text');
        tooltip.attr('class', 'tooltip')
            .html(element.amount)
            .style('position', 'absolute')
            .style('fill', '#d1c501')
            .style('font-weight', 600)
            .style('transform', `translate(${xCoord}px, ${yCoord}px)`);

        tooltip.transition()
            .duration(100)
            .style('opacity', 0.9);
        tooltip.html(element.amount)
            .style('transform', `translate(${xCoord}px, ${yCoord}px)`);

        this.d3.select(target).transition()
            .duration(100)
            .attr('fill', '#556d5b');
    }

    hideTip() {
        const e = this.d3.event,
            target = e.currentTarget;

        this.d3.select('.tooltip').remove();

        this.d3.select('#tooltip-bg').remove();

        this.d3.select(target).transition()
            .duration(100)
            .attr('fill', '#82ca9c');
    }
}
