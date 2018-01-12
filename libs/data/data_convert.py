import csv
r = csv.reader(open('avgcountfinal.csv', encoding='utf-8'))
wr = csv.writer(open('map.txt',"w"))

strr = ""
pre_sch = ""
num = 0



for line in r:
    if r.line_num == 1:
        strr = line
    else:
        school = line[0]
        if school != pre_sch:
            num = num + 1
            pre_sch = school
            print(school)
            wr.writerow([school, str(num)])
            wrr = csv.writer(open(str(num)+'.csv', "w", newline=''))
            wrr.writerow(strr)


        wrr = csv.writer(open(str(num)+'.csv', "a", newline=''))
        wrr.writerow(line)











