---
title: MySQL/UBUNTU 데이터베이스 자동 백업 스크립트
author: Baek JinYoung
date: 2024-10-14
category: Jekyll
layout: post
---

MySQL/UBUNTU 데이터베이스 자동 백업 쉘 스크립트 Shell Script
-

### 1. 백업 파일을 저장할 폴더 생성

원하는 위치에 백업 파일을 저장할 디렉토리를 생성한다.   
보통 현재 사용자의 홈 디렉토리에 생성한다.   

```bash
mkdir /home/[사용자 이름]/db_backup

# 예시: 사용자가 ubuntu일 경우
mkdir /home/ubuntu/db_backup
```

mkdir는 디렉토리를 생성하는 명령어이다.   

### 2. 백업 폴더 권한 설정

```bash
chmod 755 /home/[사용자 이름]/db_backup

# 예시: 사용자가 ubuntu일 경우
chmod 755 /home/ubuntu/db_backup
```

chmod는 change mode의 약어로 시스템의 권한을 변경하는 명령어이다.    
755는 소유자에게 모든 권한을, 그룹 사용자와 기타 사용자에게는 읽기와 실행 권한을 부여한다는 의미이다.    

첫번째는 소유자 권한 / 두번째 숫자는 그룹 사용자 권한 / 세번째 숫자는 기타 사용자 권한을 의미한다.    

폴더 및 파일의 권한은 읽기(r) 4 / 쓰기(w) 2 / 실행(x) 1로 분류된다.    
각 숫자의 합에 따라 권한이 결정된다.    

4(읽기) + 2(쓰기) + 1(실행) = 7(모든 권한)    
4(읽기) + 1(실행) = 5(읽기, 실행 권한)

### 3. 백업을 수행할 스크립트 파일 생성

```bash
sudo nano /home/[사용자 이름]/db_backup/backup.sh

# 예시: 사용자가 ubuntu일 경우
sudo nano /home/ubuntu/db_backup/backup.sh
```

### 4. 스크립트 파일 내용 입력

shell로 작성할 로직은 다음과 같다.

1. 변수 설정(덤프 파일 저장 날짜, 접속 데이터베이스, 백업 파일 저장 경로 등)
2. 테이블 덤프
3. 압축 파일 생성
4. 덤프 파일 삭제
5. 14일이 경과된 압축 파일 삭제

아래는 사용자를 ubuntu로 가정하고 작성한 스크립트다.    
데이터베이스 이름과 백업 파일 저장 경로를 수정하여 사용하자.

```shell
#!/bin/sh

# 시작
echo "MYSQL 백업 시작"
echo ""
echo "덤프 시작 : `date '+%Y-%m-%d %H:%M:%S'`"
echo ""

# 오늘 날짜
export Today="`date '+%Y-%m-%d'`"

# 접속할 데이터베이스 이름
DB_NAME="데이터베이스 이름"

# 백업 파일 저장 경로
BACKUP_DIR="/home/ubuntu/db_backup"
DIR="${BACKUP_DIR}/${Today}"
sudo mkdir -p ${DIR}
sudo chown -R ubuntu:ubuntu ${DIR}
sudo chmod 700 ${DIR}

# 테이블 덤프
TABLE_LIST=`mysql ${DB_NAME} -e "show tables;" | grep -v Tables_in_${DB_NAME}`

for THIS_TABLE in ${TABLE_LIST}
do
       TABLE_DIR="${DIR}/${THIS_TABLE}.sql"
       echo "mysqldump ${TABLE_DIR}"
       mysqldump ${DB_NAME} ${THIS_TABLE} > ${TABLE_DIR}
done
echo ""

# 테이블 압축 시작
echo "압축 시작 : `date '+%Y-%m-%d %H:%M:%S'`"

# 현재 디렉터리를 BACKUP_DIR로 변경
cd ${BACKUP_DIR}

# 생성한 덤프 파일 압축
BACKUP_FILE="db_${Today}.tar.gz"
echo "tar -cvzf ${BACKUP_FILE} ${Today}"
tar -cvzf ${BACKUP_FILE} ${Today}

# 덤프 파일 삭제
rm -rf ${DIR}

# 오래된 백업 파일 삭제 (14일 지난 파일 삭제)
find ${BACKUP_DIR} -name '*.tar.gz' -ctime +14 -delete

# 종료
echo "덤프 완료 : `date '+%Y-%m-%d %H:%M:%S'`"
```

쉘 스크립트에서 변수를 사용할 때 명확성을 위해 중괄호{}를 사용한다.

중괄호는 변수를 감싸서 변수의 시작과 끝을 명확히 구분한다.   
이를 통해 변수 이름이 다른 텍스트와 혼동되지 않도록 한다.   

이름이 복잡한 경우에도 중괄호를 사용하는 것이 좋다.   
변수가 문자로 직접 연결되어 있을 때 중괄호를 사용하여 정확히 어떤 부분이 변수를 가리키는지 명확히 할 수 있다.   

변수 이름이 다른 텍스트와 명확히 구분되면 중괄호가 없어도 된다.   

다만 중괄호를 사용하는 것과 사용하지 않는 것을 일관되게 유지하는 것이 좋다.   
일반적으로 모든 변수에 중괄호를 사용하는 것이 코드 스타일상 더 바람직하다.   

### 5. 스크립트 파일 권한 설정

```bash
sudo chown -R [사용자 이름]:[사용자 이름] /home/[사용자 이름]/db_backup/backup.sh
sudo chmod 700 /home/[사용자 이름]/db_backup/backup.sh

# 예시: 사용자가 ubuntu인 경우
sudo chown -R ubuntu:ubuntu /home/ubuntu/db_backup/backup.sh
sudo chmod 700 /home/ubuntu/db_backup/backup.sh
```

### 6. 작업 스케줄러(Crontab) 설정

crontab은 Linux 운영체제에서 특정 작업을 주기적으로 실행하기 위해 사용하는 작업 스케줄러이다.

```bash
crontab -e
```

crontab을 처음 사용할 경우 아래와 같이 텍스트 편집기를 선택하라는 문구가 출력된다.   
주로 사용하는 에디터를 선택하자.   
나는 nano를 선택했다.

```bash
no crontab for [사용자 이름] - using an empty one

Select an editor.  To change later, run 'select-editor'.
  1. /bin/nano        <---- easiest
  2. /usr/bin/vim.basic
  3. /usr/bin/vim.tiny
  4. /bin/ed

Choose 1-4 [1]: 1
```

```shell
# 예시: 사용자가 ubuntu일 경우

# db_backup
# 매일 0시 0분 backup.sh 파일 실행
0 0 * * * /home/ubuntu/db_backup/backup.sh

# 30분 마다 실행
*/30 * * * * /home/ubuntu/db_backup/backup.sh

# 매주 월요일 새벽 2시에 실행
0 02 * * 1 /home/ubuntu/db_backup/backup.sh

# 매월 1일 새벽 1시에 실행
0 01 1 * * /home/ubuntu/db_backup/backup.sh
```

```shell
┬ ┬ ┬ ┬ ┬
│ │ │ │ └─ 요일 (0 - 6) (0:일요일, 1:월요일, ..., 6:토요일)
│ │ │ └─ 월 (1 - 12 or jan, feb, mar, apr, ...)
│ │ └─일 (1 - 31)
│ └─ 시 (0 - 23)
└─ 분 (0 - 59)
```

아래 명령어를 통해 현재 적용 중인 crontab 목록을 확인할 수 있다.   

```bash
crontab -l
```


### 7. .my.cnf 설정

주의: .my.cnf는 my.cnf와 다른 파일이다.

.my.cnf 파일에 사용자 인증 정보를 저장한다.    
이 파일에는 MySQL에 접속할 때 사용할 사용자 이름, 비밀번호 등의 정보를 저장할 수 있다.    
.my.cnf를 사용하면 MySQL을 접속할 때 사용자 이름과 비밀번호를 입력할 필요가 없어진다.    

사용자 홈 디렉토리에 .my.cnf 파일이 있는지 확인한다.

```bash
cd ~
ls -la .my.cnf
```

ls -la 명령어는 모든 파일 (숨김 파일 포함)을 리스트로 보여준다.

.my.cnf 파일이 없을 경우 다음 명령어로 생성한다.

```bash
nano ~/.my.cnf
```

```ini
[client]
user = 사용자
password = 비밀번호
host = localhost
```

사용자 정보를 저장한 후에는 파일 권한을 수정한다.

```bash
chmod 600 ~/.my.cnf
```

### 8. 실행해보기

백업이 잘 되는지 확인한다.

```bash
# 예시: 사용자가 ubuntu일 경우

/home/ubuntu/db_backup/backup.sh
```

오류: ./backup.sh: 53: Syntax error: Unterminated quoted string
-

<center><img src="https://github.com/user-attachments/assets/88aac185-ca62-4461-a869-246b369255cc" width="50%"></center>

```bash
./backup.sh: 53: Syntax error: Unterminated quoted string
```

Syntax error: Unterminated quoted string 오류는 쉘 스크립트에서 인용부호가 제대로 닫히지 않았음을 의미한다.

이 오류는 다음과 같은 경우에 발생한다.

1. 따옴표(" 또는 ')가 짝이 맞지 않는 경우: 스크립트의 특정 줄에서 문자열을 시작한 뒤, 같은 종류의 따옴표로 닫지 않으면 문제가 발생한다.
2. 특수 문자가 포함된 경우: 특수 문자가 포함된 문자열이 인용부호에 영향을 미칠 수 있다. 
3. 주석(#)의 위치: 주석이 문자열 안에 있을 경우, 쉘이 이를 잘못 해석할 수 있다.

문제가 발생한 줄 주변을 확인하여 따옴표가 올바르게 사용되었는지 검토해야 한다.    
특히 다음 사항에 주의한다.

1. 모든 시작된 문자열에 대해 종료된 문자열이 있는지. 
2. 인용부호 내에 다른 따옴표가 포함되어 있는 경우에는 이스케이프(\) 처리를 해주어야 한다.


오류: mysql: [Warning] Using a password on the command line interface can be insecure. mysqldump: [Warning] Using a password on the command line interface can be insecure.
-

<center><img src="https://github.com/user-attachments/assets/4c0e3e10-01d8-49da-a279-10870861c766" width="50%"></center>

```bash
mysql: [Warning] Using a password on the command line interface can be insecure.
mysqldump: [Warning] Using a password on the command line interface can be insecure.
```

MySQL에 비밀번호를 명령줄에서 직접 입력하는 방식은 보안상 위험할 수 있다는 경고이다. 
스크립트 파일 안에 mysql 사용자와 비밀번호를 입력하고 실행했을 때 발생했다.
다른 사용자가 시스템에서 프로세스를 확인할 수 있기 때문에 스크립트 파일 안에서 비밀번호를 정의하면 비밀번호가 노출될 수 있다.

보안을 강화하기 위해 비밀번호를 명령줄에 직접 입력하지 않고, 비밀번호 파일이나 환경 변수를 사용하는 게 좋다.

백업 스크립트 설명 문서의 7번을 참고하자.

~/.my.cnf 파일에는 MySQL 사용할 사용자 이름, 비밀번호 등의 정보를 저장할 수 있다.
.my.cnf를 사용하면 MySQL을 접속할 때 사용자 이름과 비밀번호를 입력할 필요가 없어진다.

my.cnf와 .my.cnf는 서로 다른 파일이며, 각각 다른 용도로 사용된다.

my.cnf
위치: /etc/my.cnf 혹은 /etc/mysql/my.cnf
용도: 시스템 전반에 걸쳐 MySQL 서버의 전역 설정을 정의.

.my.cnf
위치: 사용자 홈 디렉토리(예: ~/.my.cnf)
용도: 특정 사용자에 대한 MySQL 클라이언트의 개인 설정 및 인증 정보 저장.


오류: tar: Removing leading /' from member names
-

<center><img src="https://github.com/user-attachments/assets/d5bd9ebe-622b-4843-ad16-e91317f1a207" width="50%"></center>

```bash
tar: Removing leading /' from member names
```

tar: Removing leading '/' from member names는 tar 명령어를 사용할 때 나타나는 경고 메시지이다.     
이 메시지는 아카이브를 만들거나 추출할 때 경로에 대한 특정 행동을 설명한다.    

tar는 파일과 디렉터리를 아카이브할 때 기본적으로 절대 경로를 포함하여 파일을 저장한다.    
예를 들어 파일 경로가 /home/user/file.txt와 같이 시작하면 이 경로가 아카이브에 그대로 포함된다.    
그러나 tar 아카이브를 추출할 때는 상대 경로로 파일을 생성하는 것이 더 일반적이다.    
파일의 최상위 경로(/)를 제거하고 상대 경로로 변환한다.    

해당 경고는 tar가 아카이브를 생성할 때, 파일을 절대 경로가 아닌 상대 경로로 저장하기 위해 출력한다.    
즉, /로 시작하는 경로를 제거하고 파일 이름을 저장한다.    
예를 들어, /home/user/file.txt라는 경로가 있다면, 이 파일이 아카이브에 추가될 때    
tar는 경로를 home/user/file.txt로 변환하여 저장한다.    

절대 경로를 사용하면 아카이브를 추출할 때 원하지 않는 위치에 파일이 생성될 수 있다.     
tar는 경로에서 /를 제거하여 상대 경로로 저장하는 것이 안전하다고 판단한다.    

해당 경고가 발생했을 때의 코드는 다음과 같다.    

```shell
# 오늘 날짜
export Today="`date '+%Y-%m-%d'`"

... (중략) ...

# 백업 파일 저장 경로
BACKUP_DIR="/home/[사용자 이름]/db_backup"

... (중략) ...

# 생성한 덤프 파일 압축
BACKUP_FILE="db_${Today}.tar.gz"
echo "tar -cvzf ${BACKUP_DIR}/${BACKUP_FILE} ${BACKUP_DIR}/${Today}"
tar -cvzf ${BACKUP_DIR}/${BACKUP_FILE} ${BACKUP_DIR}/${Today}
```

tar 명령어를 실행하기 전에 작업 디렉토리를 변경하여 상대 경로를 사용할 수 있도록 수정했다.

```shell
# 백업 파일 저장 경로
BACKUP_DIR="/home/[사용자 이름]/db_backup"

... (중략) ...

# 현재 디렉터리를 BACKUP_DIR로 변경
cd ${BACKUP_DIR}

# 생성한 덤프 파일 압축
BACKUP_FILE="db_${Today}.tar.gz"
echo "tar -cvzf ${BACKUP_FILE} ${Today}"  # 경고 메시지를 방지하기 위해 상대 경로 사용
tar -cvzf ${BACKUP_FILE} ${Today}  # 절대 경로 대신 상대 경로 사용
```

참고한 글   
1. [[MariaDB] Mysql Shell Script로 매일 자동 백업하기](https://foot-develop.tistory.com/54)
2. [mysql 자동 백업 설정 방법 (ubuntu server)](https://wildeveloperetrain.tistory.com/208)