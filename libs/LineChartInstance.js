/**
 * Created by Pieforever on 2018/1/12.
 */
var LineChartInstance = {
    draw: function (data, tag, school, num) {
        // d3.select(".highStock")
        //     .append("div")
        //     .attr("class", "highChart")
        //     .attr("id", "highChartContainer")
        //     .style("width", 900 * 0.7)
        //     .style("height",  800* 0.95);

        var til;
        // "school" is the name of the college
        console.log(school);
        if (num == 1)
                til = school[0];
            else
                til = school[0] + ' & ' + school[1];

            Highcharts.chart('highStock', {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Computer Science Ranking'
                },
                subtitle: {
                    text: til + '. Data Source: www.csranking.org'
                },
                xAxis: {
                    categories: ['2000', '2001', '2002', '2003', '2004', '2005', '2006','2007','2008','2009','2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']
                },
                yAxis: {
                    title: {
                        text: 'Adjusted Score'
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    },
                    series: {
                        events: {//监听点的鼠标事件
                            click: function (e) {
                                console.log(e.point);
                                var year = e.point.x+2000;
                                console.log("num:"+num);
                                console.log("tag:"+tag);
                                console.log("year:"+year);
                                RadarChartInstance.initialize(num, tag, year)


                            }
                        }
                    }
                },
                series: data
            });

    },
    initialize: function (num,tag) {
        var seriesOptions = [];
        if (num == 1) {
            var school;
            d3.csv("data/map.csv", function (error, data) {
                console.log("Data[1]:"+data[1].School);
                school = data[tag[0]-1].School;
            });
            d3.csv("data/" + String(tag[0]) + "_.csv", function (error, alldata1) {
                if (error) {
                    console.log(error);
                }
                var highchart_data = {};
                var dimension = ['AI', 'AI_', 'SYSTEM', 'SYSTEM_', 'THEORY', 'THEORY_', 'INTERAREA',
                    'INTERAREA_'];
                var dimension_count_mapping = {
                    "AI": 0,
                    "SYSTEM": 0,
                    "THEORY": 0,
                    "INTERAREA": 0,
                    "AI_": 0,
                    "SYSTEM_": 0,
                    "THEORY_": 0,
                    "INTERAREA_": 0
                };
                for (var i = 0; i < dimension.length; ++i) {
                    highchart_data[dimension[i]] = [];
                }

                // 在选定时间范围内的数据，存下来。同样，分好类。第一类
                for (var i = 0; i < alldata1.length; ++i) {
                    if (alldata1[i].Year >= 2000 && alldata1[i].Year <= 2017) {
                        var cur_dim_1, cur_dim_2, cur_dim_3, cur_dim_4; // current dimension
                        cur_dim_1 = "AI";
                        cur_dim_2 = "SYSTEM";
                        cur_dim_3 = "THEORY";
                        cur_dim_4 = "INTERAREA";
                        highchart_data[cur_dim_1][dimension_count_mapping[cur_dim_1]] = [];
                        // highchart_data[cur_dim_1][dimension_count_mapping[cur_dim_1]][0] = Number(alldata1[i].Year);
                        highchart_data[cur_dim_1][dimension_count_mapping[cur_dim_1]] = Number(alldata1[i].AIadj);
                        dimension_count_mapping[cur_dim_1] += 1; //在这一维上有多少个数据
                        highchart_data[cur_dim_2][dimension_count_mapping[cur_dim_2]] = [];
                        //highchart_data[cur_dim_2][dimension_count_mapping[cur_dim_2]][0] = Number(alldata1[i].Year);
                        highchart_data[cur_dim_2][dimension_count_mapping[cur_dim_2]] = Number(alldata1[i].SYSadj);
                        dimension_count_mapping[cur_dim_2] += 1; //在这一维上有多少个数据
                        highchart_data[cur_dim_3][dimension_count_mapping[cur_dim_3]] = [];
                        //highchart_data[cur_dim_3][dimension_count_mapping[cur_dim_3]][0] = Number(alldata1[i].Year);
                        highchart_data[cur_dim_3][dimension_count_mapping[cur_dim_3]] = Number(alldata1[i].Theoadj);
                        dimension_count_mapping[cur_dim_3] += 1; //在这一维上有多少个数据
                        highchart_data[cur_dim_4][dimension_count_mapping[cur_dim_4]] = [];
                        //highchart_data[cur_dim_4][dimension_count_mapping[cur_dim_4]][0] = Number(alldata1[i].Year);
                        highchart_data[cur_dim_4][dimension_count_mapping[cur_dim_4]] = Number(alldata1[i].IAadj);
                        dimension_count_mapping[cur_dim_4] += 1; //在这一维上有多少个数据
                    }
                }
                console.log("DatA!");
                console.log(highchart_data["AI"]);
                seriesOptions[0]={name:"AI", marker: {
                    symbol: 'square'
                }, data:highchart_data["AI"]};
                seriesOptions[1]={name:"SYSTEM", marker: {
                    symbol: 'diamond'
                }, data:highchart_data["SYSTEM"]};
                seriesOptions[2]={name:"THEORY", marker: {
                    symbol: 'circle'
                }, data:highchart_data["THEORY"]};
                seriesOptions[3]={name:"INTERAREA", marker: {
                    symbol: 'triangle'
                }, data:highchart_data["INTERAREA"]};
                console.log(seriesOptions);
                LineChartInstance.draw(seriesOptions, tag, [school], num);
            });
        }
        if (num == 2) {
            var school = [];
            d3.csv("data/map.csv", function (error, data) {
                school[0] = data[tag[0]-1].School;
                school[1] = data[tag[1]-1].School;
            });
            d3.csv("data/" + String(tag[0]) + "_.csv", function (error, alldata1) {
                if (error) {
                    console.log(error);
                }
                d3.csv("data/" + String(tag[1]) + "_.csv", function (error, alldata2) {
                    if (error) {
                        console.log(error);
                    }
                    var highchart_data = {};
                    var dimension = ['AI', 'AI_', 'SYSTEM', 'SYSTEM_', 'THEORY', 'THEORY_', 'INTERAREA',
                        'INTERAREA_'];
                    var dimension_count_mapping = {
                        "AI": 0,
                        "SYSTEM": 0,
                        "THEORY": 0,
                        "INTERAREA": 0,
                        "AI_": 0,
                        "SYSTEM_": 0,
                        "THEORY_": 0,
                        "INTERAREA_": 0
                    };
                    for (var i = 0; i < dimension.length; ++i) {
                        highchart_data[dimension[i]] = [];
                    }

                    // 在选定时间范围内的数据，存下来。同样，分好类。第一类
                    for (var i = 0; i < alldata1.length; ++i) {
                        if (alldata1[i].Year >= 2000 && alldata1[i].Year <= 2017) {
                            var cur_dim_1, cur_dim_2, cur_dim_3, cur_dim_4; // current dimension
                            cur_dim_1 = "AI";
                            cur_dim_2 = "SYSTEM";
                            cur_dim_3 = "THEORY";
                            cur_dim_4 = "INTERAREA";
                            highchart_data[cur_dim_1][dimension_count_mapping[cur_dim_1]] = [];
                            // highchart_data[cur_dim_1][dimension_count_mapping[cur_dim_1]][0] = Number(alldata1[i].Year);
                            highchart_data[cur_dim_1][dimension_count_mapping[cur_dim_1]] = Number(alldata1[i].AIadj);
                            dimension_count_mapping[cur_dim_1] += 1; //在这一维上有多少个数据
                            highchart_data[cur_dim_2][dimension_count_mapping[cur_dim_2]] = [];
                            //highchart_data[cur_dim_2][dimension_count_mapping[cur_dim_2]][0] = Number(alldata1[i].Year);
                            highchart_data[cur_dim_2][dimension_count_mapping[cur_dim_2]] = Number(alldata1[i].SYSadj);
                            dimension_count_mapping[cur_dim_2] += 1; //在这一维上有多少个数据
                            highchart_data[cur_dim_3][dimension_count_mapping[cur_dim_3]] = [];
                            //highchart_data[cur_dim_3][dimension_count_mapping[cur_dim_3]][0] = Number(alldata1[i].Year);
                            highchart_data[cur_dim_3][dimension_count_mapping[cur_dim_3]] = Number(alldata1[i].Theoadj);
                            dimension_count_mapping[cur_dim_3] += 1; //在这一维上有多少个数据
                            highchart_data[cur_dim_4][dimension_count_mapping[cur_dim_4]] = [];
                            //highchart_data[cur_dim_4][dimension_count_mapping[cur_dim_4]][0] = Number(alldata1[i].Year);
                            highchart_data[cur_dim_4][dimension_count_mapping[cur_dim_4]] = Number(alldata1[i].IAadj);
                            dimension_count_mapping[cur_dim_4] += 1; //在这一维上有多少个数据
                        }
                    }
                    for (var i = 0; i < alldata2.length; ++i) {
                        if (alldata2[i].Year >= 2000 && alldata2[i].Year <= 2017) {
                            var cur_dim_1, cur_dim_2, cur_dim_3, cur_dim_4; // current dimension
                            cur_dim_1 = "AI_";
                            cur_dim_2 = "SYSTEM_";
                            cur_dim_3 = "THEORY_";
                            cur_dim_4 = "INTERAREA_";
                            highchart_data[cur_dim_1][dimension_count_mapping[cur_dim_1]] = [];
                            // highchart_data[cur_dim_1][dimension_count_mapping[cur_dim_1]][0] = alldata2[i].Year;
                            highchart_data[cur_dim_1][dimension_count_mapping[cur_dim_1]] = Number(alldata2[i].AIadj);
                            dimension_count_mapping[cur_dim_1] += 1; //在这一维上有多少个数据
                            highchart_data[cur_dim_2][dimension_count_mapping[cur_dim_2]] = [];
                            //highchart_data[cur_dim_2][dimension_count_mapping[cur_dim_2]][0] = alldata2[i].Year;
                            highchart_data[cur_dim_2][dimension_count_mapping[cur_dim_2]] = Number(alldata2[i].SYSadj);
                            dimension_count_mapping[cur_dim_2] += 1; //在这一维上有多少个数据
                            highchart_data[cur_dim_3][dimension_count_mapping[cur_dim_3]] = [];
                            //highchart_data[cur_dim_3][dimension_count_mapping[cur_dim_3]][0] = alldata2[i].Year;
                            highchart_data[cur_dim_3][dimension_count_mapping[cur_dim_3]] = Number(alldata2[i].Theoadj);
                            dimension_count_mapping[cur_dim_3] += 1; //在这一维上有多少个数据
                            highchart_data[cur_dim_4][dimension_count_mapping[cur_dim_4]] = [];
                            //highchart_data[cur_dim_4][dimension_count_mapping[cur_dim_4]] = alldata2[i].Year;
                            highchart_data[cur_dim_4][dimension_count_mapping[cur_dim_4]] = Number(alldata2[i].IAadj);
                            dimension_count_mapping[cur_dim_4] += 1; //在这一维上有多少个数据
                        }
                    }
                    seriesOptions[0]={name:"AI-"+school[0], marker: {
                        symbol: 'square'
                    }, data:highchart_data["AI"]};
                    seriesOptions[1]={name:"SYSTEM-"+school[0], marker: {
                        symbol: 'diamond'
                    }, data:highchart_data["SYSTEM"]};
                    seriesOptions[2]={name:"THEORY-"+school[0], marker: {
                        symbol: 'circle'
                    }, data:highchart_data["THEORY"]};
                    seriesOptions[3]={name:"INTERAREA-"+school[0], marker: {
                        symbol: 'triangle'
                    }, data:highchart_data["INTERAREA"]};
                    seriesOptions[4]={name:"AI-"+school[1], marker: {
                        symbol: 'square'
                    }, data:highchart_data["AI_"]};
                    seriesOptions[5]={name:"SYSTEM-"+school[1], marker: {
                        symbol: 'diamond'
                    }, data:highchart_data["SYSTEM_"]};
                    seriesOptions[6]={name:"THEORY-"+school[1], marker: {
                        symbol: 'circle'
                    }, data:highchart_data["THEORY_"]};
                    seriesOptions[7]={name:"INTERAREA-"+school[1], marker: {
                        symbol: 'triangle'
                    }, data:highchart_data["INTERAREA_"]};
                    LineChartInstance.draw(seriesOptions, tag, school, num);
                });
            });
        }
    },
        /*********************highChart.html end***********************************/
    update: function () {

    }

};