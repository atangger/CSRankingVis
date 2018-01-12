/**
 * Created by Pieforever on 2018/1/12.
 */
var RadarChartInstance = {
    initialize: function (num, tag, year) {
        if (num == 1) {
            d3.csv("data/" + String(tag[0]) + "_.csv", function (error, data) {
                if (error) {
                    console.log(error);
                }
                var color = d3.scale.ordinal()
                    .range(["#EDC951", "#CC333F", "#00A0B0"]);
                temp = cal_star_data([data], year);
                console.log(temp);
                var radarChartOptions = {
                    w: width,
                    h: height,
                    margin: margin,
                    maxValue: 3,
                    levels: 10,
                    roundStrokes: true,
                    color: color
                };
                //Call function to draw the Radar chart
                RadarChart(".radarChart", temp, radarChartOptions);
            });
        }
        if (num == 2) {
            d3.csv("data/" + String(tag[0]) + "_.csv", function (error, data) {
                if (error) {
                    console.log(error);
                }
                d3.csv("data/" + String(tag[1]) + "_.csv", function (error, data2) {
                    if (error) {
                        console.log(error);
                    }
                    console.log(data2);
                    var color = d3.scale.ordinal()
                        .range(["#EDC951", "#CC333F", "#00A0B0"]);
                    temp = cal_star_data([data, data2], year);
                    console.log(temp);
                    var radarChartOptions = {
                        w: width,
                        h: height,
                        margin: margin,
                        maxValue: 3,
                        levels: 10,
                        roundStrokes: true,
                        color: color
                    };
                    //Call function to draw the Radar chart
                    RadarChart(".radarChart", temp, radarChartOptions);
                });
            });
        }
    },
    // update: function (num, tag, year) {
    //     RadarChartInstance.initialize(num, tag, year);
    // }
}