import csv

for i in range(72):
    s = str(i+1)
    print(s)
    r = csv.reader(open(s+'.csv', encoding='utf-8'))
    wrr = csv.writer(open(s + '_.csv', "w", newline=''))
    cnt = 2000
    for line in r:
        if r.line_num == 1:
            wrr.writerow(line)
            continue
        while line[1] != str(cnt):
            wrr.writerow([line[0], str(cnt), str(0)])
            cnt = cnt + 1

        wrr.writerow(line)
        cnt = cnt + 1
    if cnt != 2018:
        wrr.writerow([line[0], 2017, str(0)])
