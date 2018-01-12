/**
 * Created by Pieforever on 2018/1/11.
 */
function cal_star_data(alldata, curYear){
    var school = [];
    for (var len = 0; len < alldata.length; ++len) {
        console.log(alldata.length);
        alldata1 = alldata[len];
        console.log(alldata1);
        school_record = [];
        for (var i = 0; i < alldata1.length; ++i) {
            if (alldata1[i].Year == curYear) {
                temp_object_1 = {};
                temp_object_2 = {};
                temp_object_3 = {};
                temp_object_4 = {};
                temp_object_1.axis = "AI";
                temp_object_1.value = alldata1[i].AIadj;
                school_record.push(temp_object_1);
                temp_object_2.axis = "Theory";
                temp_object_2.value = alldata1[i].Theoadj;
                school_record.push(temp_object_2);
                temp_object_3.axis = "System";
                temp_object_3.value = alldata1[i].SYSadj;
                school_record.push(temp_object_3);
                temp_object_4.axis = "IA";
                temp_object_4.value = alldata1[i].IAadj;
                school_record.push(temp_object_4);
            }
        }
        school.push(school_record)
    }
    console.log(school);
    return school;
}