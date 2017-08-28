import { Component, OnInit } from '@angular/core';
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

    title: 'Burned Calories';
    interval = {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
        endDate: new Date()
    };
    dayAim = 300;
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
        const d3 = this.d3;
        const padding: number = 25;
        const width: number = 500;
        const height: number = 150;
        let yScale: any;

        const svg = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const xScale = d3.scaleBand()
            .domain(this.data.map(d => {
                return d.day;
            }))
            .range([0, 250]);

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

        const bars = svg.selectAll('rect')
            .data(this.data);
        bars.size();

        const newBars = bars.enter();

        newBars.append('rect')
            .attr('x', d => {
                return xScale(d.day);
            })
            .attr('y', d => {
                return yScale(d.amount);
            })
            .attr('transform', `translate(${padding + 7}, ${padding - 5})`)
            .attr('height', d => {
                return height - yScale(d.amount) - (2 * padding) + 5;
            })
            .attr('width', 20)
            .attr('fill', () => {
                return '#7da7d9';
            })
            .on('mouseover', d => {
                this.showTip(d);
            })
            .on('mouseout', () => {
                this.hideTip();
            });

        const dayAimElement = d3.select('#day-aim');
        dayAimElement.select('line')
            .style('transform', `translate(0, ${125 - (this.dayAim / 3)}px)`);
        dayAimElement.select('text')
            .html('day aim')
            .style('transform', `translate(275px, ${120 - (this.dayAim / 3)}px)`);
    }

    showTip(element) {
        const e = this.d3.event;
        const target = e.currentTarget;
        const xCoord = this.d3.mouse(target)[0] <= 10 ? 10 : this.d3.mouse(target)[0];

        const tooltip = this.d3.select('#tooltip');
        tooltip.transition()
            .duration(200)
            .style('opacity', 0.9);
        tooltip.html(element.amount)
            .style('transform', `translate(${xCoord + 20}px, ${135 - (element.amount / 3)}px)`);

        this.d3.select(target)
            .transition()
            .duration(200)
            .attr('fill', '#82ca9c');
    }

    hideTip() {
        const e = this.d3.event;
        const target = e.currentTarget;
        const tooltip = this.d3.select('#tooltip');
        tooltip.transition()
            .duration(200)
            .style('opacity', 0);

        this.d3.select(target)
            .transition()
            .duration(200)
            .attr('fill', '#7da7d9');
    }
}
