행사
- 제목
- 장소
- 행사 일정
- 접수 일정

- 분야
  - 회원사
    - 회사명
    - 주소
    - 대표자
    - 업태
    - 업종
    - 사업자등록번호
    - 회원사여부
      - 참가자
        - 참가자명
        - 부서
        - 직위
- 가입신청서
  - 약관
    - 서비스이용약관
    - 개인정보처리방침
- 가입문의
- 전화번호
- 메일



공개강좌
- 제목
- 주소
- 전화번호
- 팩스
- 오시는 길
  - 주차여부
  - 지하철
  - 버스
- 행사 일정
- 접수 일정
- 분야
- 참가비용
    - 구분
    - 일반/회원사
- 교육일수
- 온/오프라인
- 환급/비환급
- 교육개요
- 커리큘럼
- 수강후기
  - 이름
  - 비밀번호
  - 내용
- 안내말씀
- 교육신청서
  - 회사 정보
  - 신청자 정보
    - 이름
    - 휴대폰 번호
    - 일반전화
    - 이메일
    - 부서
    - 직위
    - 결제방법
  - 참가자 정보
    - 참가자명
    - 휴대폰번호
    - 일반전화
    - 이메일
    - 부서
    - 직위
    - 교육구분
  - 이용약관 
    - 서비스이용약관
    - 개인정보처리방침 약관
    - 교육과정안내 메일 수신
- 담당강사
  - 이름
  - 직위
  - 학력
  - 경력
  - 자격

사내교육 주요실적
- 로고
- 과정설명

과정안내 이메일 수신
- 회사명
- 수신자명
- 부서
- 직위
- 이메일
- 관심분야(비즈니스 스킬/등등)

과정안내 우편물
- 신청/변경/거부
- 회사명
- 수신자명
- 부서
- 직위
- 주소
  - 우편번호
  - 주소
  - 상세주소
- 요청자명
- 이메일
- 관심분야
- 기타

공지사항
- 공지여부
- 작성일자
- 제목
- 조회수
- 내용

문의하기
- 성명
- 비밀번호
- 이메일
- 제목
- 내용
- 파일 첨부
  - 파일명
  - 파일 주소
- 약관
- 신청일자
- 답변
  - 작성자
  - 일자
  - 내용

회원
- 교류회 구분
- 회사명
- 회원기간
  - 연장 신청
- 가입일
- 아이디
- 비밀번호
- 이름
- 휴대폰번호
- 일반전화
- 우편물 주소
  - 우편번호
  - 주소
  - 상세주소
- 이메일
- 부서
- 직위
- 결제 정보
  - 결제방법
  - 회사명
  - 사업자등록번호
  - 담당자명
  - 휴대폰 번호
  - 일반전화
  - 이메일
  - 수신 유무
- 회원탈퇴
  - 탈퇴사유
  - 확인여부
- 1:1 문의
  - 날짜
  - 제목
  - 이메일
  - 내용
  - 파일 첨부
  - 약관

대시보드
- 접속일자
- 접속 URL
- 접속 기기
- IP

IP 차단
- IP
- 차단일자

직원
- 성명
- 메일주소


```sql
-- 분야 (Area)
CREATE TABLE area (
    area_id BIGINT NOT NULL COMMENT '분야 id',
    title VARCHAR(255) NOT NULL COMMENT '제목',
    area INT NOT NULL COMMENT '0: 행사, 1: 교육',
    PRIMARY KEY (area_id)
);

-- 회사 (Company)
CREATE TABLE company (
    company_id BIGINT NOT NULL COMMENT '회원사 id',
    area_id BIGINT NOT NULL COMMENT '분야 id',
    company_name VARCHAR(255) NOT NULL COMMENT '회사명',
    company_number VARCHAR(255) NOT NULL COMMENT '사업자등록번호',
    name VARCHAR(255) NOT NULL COMMENT '대표자명',
    address_number VARCHAR(255) NOT NULL COMMENT '사업장 우편번호',
    address VARCHAR(255) NOT NULL COMMENT '사업장 주소',
    industry VARCHAR(255) NOT NULL COMMENT '업종',
    item VARCHAR(255) NOT NULL COMMENT '업태',
    status BOOLEAN NOT NULL COMMENT '회원 여부',
    PRIMARY KEY (company_id),
    CONSTRAINT fk_company_area FOREIGN KEY (area_id) REFERENCES area(area_id) ON DELETE RESTRICT
);

-- FAQ
CREATE TABLE faq (
    faq_id BIGINT NOT NULL COMMENT 'faq id',
    title VARCHAR(255) NOT NULL COMMENT '제목',
    content VARCHAR(255) NOT NULL COMMENT '내용',
    PRIMARY KEY (faq_id)
);

-- 메일 (Email)
CREATE TABLE email (
    email_id BIGINT NOT NULL COMMENT '메일 신청 id',
    company_name VARCHAR(255) NOT NULL COMMENT '회사명',
    name VARCHAR(255) NOT NULL COMMENT '수신자명',
    department VARCHAR(255) NOT NULL COMMENT '부서',
    rank VARCHAR(255) NOT NULL COMMENT '직위',
    email VARCHAR(255) NOT NULL COMMENT '이메일',
    status INTEGER NULL COMMENT '[우편] 분류',
    address_number VARCHAR(255) NULL COMMENT '[우편]우편번호',
    address VARCHAR(255) NULL COMMENT '[우편]주소',
    content VARCHAR(255) NULL COMMENT '[우편]기타',
    division INTEGER NOT NULL COMMENT '우편/메일',
    PRIMARY KEY (email_id)
);

-- 관심분야 (Interest)
CREATE TABLE interest (
    interest_id BIGINT NOT NULL COMMENT '관심분야 id',
    email_id BIGINT NOT NULL COMMENT '메일 신청 id',
    business BOOLEAN NOT NULL DEFAULT 0 COMMENT '비즈니스 스킬',
    strategy BOOLEAN NOT NULL DEFAULT 0 COMMENT '전략기획',
    operation BOOLEAN NOT NULL DEFAULT 0 COMMENT '내부감사',
    funds BOOLEAN NOT NULL DEFAULT 0 COMMENT '자금',
    promotion BOOLEAN NOT NULL DEFAULT 0 COMMENT 'PR홍보',
    purchase BOOLEAN NOT NULL DEFAULT 0 COMMENT '구매',
    PRIMARY KEY (interest_id),
    CONSTRAINT fk_interest_email FOREIGN KEY (email_id) REFERENCES email(email_id) ON DELETE CASCADE
);

-- 수강후기 (Review)
CREATE TABLE review (
    review_id BIGINT NOT NULL COMMENT '수강후기 id',
    curriculum_id BIGINT NOT NULL COMMENT '교육과정 id',
    name VARCHAR(255) NOT NULL COMMENT '이름',
    password VARCHAR(255) NOT NULL COMMENT '비밀번호',
    content VARCHAR(255) NOT NULL COMMENT '내용',
    PRIMARY KEY (review_id),
    CONSTRAINT fk_review_curriculum FOREIGN KEY (curriculum_id) REFERENCES curriculum(curriculum_id) ON DELETE CASCADE
);

-- 참가 (Participation)
CREATE TABLE participation (
    participation_id BIGINT NOT NULL COMMENT '참가 id',
    education_id BIGINT NULL COMMENT '교육과정 id',
    episode_id BIGINT NULL COMMENT '행사 예정 id',
    service_confirmed BOOLEAN NOT NULL DEFAULT 0 COMMENT '서비스이용약관',
    personal_confirmed BOOLEAN NOT NULL DEFAULT 0 COMMENT '개인정보처리방침',
    process_confirmed BOOLEAN NOT NULL DEFAULT 0 COMMENT '[교육, 회원가입]교육과정안내 메일 수신',
    PRIMARY KEY (participation_id),
    CONSTRAINT fk_participation_education FOREIGN KEY (education_id) REFERENCES education(education_id) ON DELETE SET NULL,
    CONSTRAINT fk_participation_episode FOREIGN KEY (episode_id) REFERENCES episode(episode_id) ON DELETE SET NULL
);

-- 사내교육 (Training)
CREATE TABLE training (
    training_id BIGINT NOT NULL COMMENT '사내교육 주요실적 id',
    title VARCHAR(255) NOT NULL COMMENT '제목',
    PRIMARY KEY (training_id)
);

-- 교육 (Education)
CREATE TABLE education (
    education_id BIGINT NOT NULL COMMENT '교육과정 id',
    curriculum_id BIGINT NOT NULL COMMENT '교육과정 id',
    education_name VARCHAR(255) NOT NULL COMMENT '과정명',
    education_day INTEGER NULL COMMENT '교육일수',
    education_time INTEGER NULL COMMENT '교육시간',
    division INT NOT NULL COMMENT '0: 온라인, 1: 오프라인',
    PRIMARY KEY (education_id),
    CONSTRAINT fk_education_curriculum FOREIGN KEY (curriculum_id) REFERENCES curriculum(curriculum_id) ON DELETE CASCADE
);

-- 자료실 (Resource)
CREATE TABLE resource (
    resource_id BIGINT NOT NULL COMMENT '자료실 id',
    event_id BIGINT NOT NULL COMMENT '행사 id',
    title VARCHAR(255) NOT NULL COMMENT '제목',
    writer VARCHAR(255) NOT NULL COMMENT '작성자',
    PRIMARY KEY (resource_id),
    CONSTRAINT fk_resource_event FOREIGN KEY (event_id) REFERENCES event(event_id) ON DELETE CASCADE
);

-- 강좌그룹 (Course)
CREATE TABLE course (
    course_id BIGINT NOT NULL COMMENT '강좌그룹 id',
    area_id BIGINT NOT NULL COMMENT '분야 id',
    course_name VARCHAR(255) NOT NULL COMMENT '교육과정명',
    PRIMARY KEY (course_id),
    CONSTRAINT fk_course_area FOREIGN KEY (area_id) REFERENCES area(area_id) ON DELETE CASCADE
);

-- 직원 (Employee)
CREATE TABLE employee (
    employee_id BIGINT NOT NULL COMMENT '직원 메일 id',
    name VARCHAR(255) NULL COMMENT '이름',
    email VARCHAR(255) NULL COMMENT '이메일',
    PRIMARY KEY (employee_id)
);

-- 팝업 (Popup)
CREATE TABLE popup (
    popup_id BIGINT NOT NULL COMMENT '팝업 id',
    title VARCHAR(255) NOT NULL COMMENT '제목',
    link VARCHAR(255) NULL COMMENT 'url',
    PRIMARY KEY (popup_id)
);

-- 행사 (Event)
CREATE TABLE event (
    event_id BIGINT NOT NULL COMMENT '행사 id',
    area_id BIGINT NOT NULL COMMENT '분야 id',
    title VARCHAR(255) NOT NULL COMMENT '제목',
    PRIMARY KEY (event_id),
    CONSTRAINT fk_event_area FOREIGN KEY (area_id) REFERENCES area(area_id) ON DELETE CASCADE
);

CREATE TABLE member (
    member_id BIGINT NOT NULL COMMENT '회원 id',
    company_id BIGINT NOT NULL COMMENT '회원사 id',
    name VARCHAR(255) NOT NULL COMMENT '이름',
    cell_phone VARCHAR(255) NOT NULL COMMENT '휴대폰 번호',
    phone VARCHAR(255) NULL COMMENT '일반전화',
    address_number VARCHAR(255) NOT NULL COMMENT '우편번호',
    address VARCHAR(255) NOT NULL COMMENT '주소',
    email VARCHAR(255) NOT NULL COMMENT '이메일',
    department VARCHAR(255) NOT NULL COMMENT '부서',
    rank VARCHAR(255) NOT NULL COMMENT '직위',
    id VARCHAR(255) NOT NULL COMMENT '아이디',
    password VARCHAR(255) NOT NULL COMMENT '비밀번호',
    service_confirmed BOOLEAN NOT NULL DEFAULT 0 COMMENT '서비스이용약관',
    personal_confirmed BOOLEAN NOT NULL DEFAULT 0 COMMENT '개인정보처리방침',
    process_confirmed BOOLEAN NOT NULL DEFAULT 0 COMMENT '교육과정안내 메일',
    PRIMARY KEY (member_id),
    CONSTRAINT fk_member_company FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);

-- 교육금액 (Expense)
CREATE TABLE expense (
    expense_id BIGINT NOT NULL COMMENT '교육금액 id',
    education_id BIGINT NOT NULL COMMENT '교육과정 id',
    member BOOLEAN NULL COMMENT '일반/회원사',
    one VARCHAR(255) NULL COMMENT '1사 1인',
    two VARCHAR(255) NULL COMMENT '1사 2인',
    meal VARCHAR(255) NULL COMMENT '식대지원',
    content VARCHAR(255) NULL COMMENT '비고',
    surtax BOOLEAN NOT NULL DEFAULT 0 COMMENT '면세 과정/부가세포함',
    PRIMARY KEY (expense_id),
    CONSTRAINT fk_expense_education FOREIGN KEY (education_id) REFERENCES education(education_id) ON DELETE CASCADE
);

-- 문의 (Inquiry)
CREATE TABLE inquiry (
    inquiry_id BIGINT NOT NULL COMMENT '문의하기 id',
    name VARCHAR(255) NOT NULL COMMENT '이름',
    password VARCHAR(255) NULL COMMENT '비밀번호',
    email VARCHAR(255) NOT NULL COMMENT '이메일',
    title VARCHAR(255) NOT NULL COMMENT '제목',
    content VARCHAR(255) NOT NULL COMMENT '내용',
    personal_confirmed BOOLEAN NOT NULL DEFAULT 0 COMMENT '개인정보처리방침',
    answer VARCHAR(255) NULL COMMENT '답변',
    PRIMARY KEY (inquiry_id)
);

-- 공지사항 (Notice)
CREATE TABLE notice (
    notice_id BIGINT NOT NULL COMMENT '공지사항 id',
    title VARCHAR(255) NOT NULL COMMENT '제목',
    content TEXT NOT NULL COMMENT '내용',
    fin BOOLEAN NOT NULL DEFAULT 0 COMMENT '공지 여부',
    views BIGINT NOT NULL DEFAULT 0 COMMENT '조회수',
    PRIMARY KEY (notice_id)
);

-- 파일 (File)
CREATE TABLE file (
    file_id BIGINT NOT NULL COMMENT '파일 id',
    file_name VARCHAR(255) NOT NULL COMMENT '파일명',
    file_path VARCHAR(255) NOT NULL COMMENT '파일 경로',
    PRIMARY KEY (file_id)
);

-- 신청자 (Proposer)
CREATE TABLE proposer (
    proposer_id BIGINT NOT NULL COMMENT '신청자 id',
    participation_id BIGINT NOT NULL COMMENT '참가 id',
    name VARCHAR(255) NOT NULL COMMENT '이름',
    cell_phone VARCHAR(255) NOT NULL COMMENT '휴대폰 번호',
    phone VARCHAR(255) NULL COMMENT '일반전화',
    email VARCHAR(255) NOT NULL COMMENT '이메일',
    department VARCHAR(255) NOT NULL COMMENT '부서',
    rank VARCHAR(255) NOT NULL COMMENT '직위',
    payment INTEGER NULL COMMENT '[교육]결제방법',
    PRIMARY KEY (proposer_id),
    CONSTRAINT fk_proposer_participation FOREIGN KEY (participation_id) REFERENCES participation(participation_id) ON DELETE CASCADE
);

-- 참가자 (Entrant)
CREATE TABLE entrant (
    entrant_id BIGINT NOT NULL COMMENT '참가자 id',
    name VARCHAR(255) NOT NULL COMMENT '이름',
    cell_phone VARCHAR(255) NULL COMMENT '[교육]휴대폰 번호',
    phone VARCHAR(255) NULL COMMENT '[교육]일반전화',
    email VARCHAR(255) NULL COMMENT '[교육]이메일',
    department VARCHAR(255) NOT NULL COMMENT '부서',
    rank VARCHAR(255) NOT NULL COMMENT '직위',
    division INT NULL COMMENT '[교육]0: 온라인, 1: 오프라인',
    proposer_id BIGINT NOT NULL COMMENT '신청자 id',
    PRIMARY KEY (entrant_id),
    CONSTRAINT fk_entrant_proposer FOREIGN KEY (proposer_id) REFERENCES proposer(proposer_id) ON DELETE SET NULL
);

-- 교육장소 (Place)
CREATE TABLE place (
    place_id BIGINT NOT NULL COMMENT '장소 id',
    education_id BIGINT NOT NULL COMMENT '교육과정 id',
    place VARCHAR(255) NULL COMMENT '교육장소',
    phone VARCHAR(255) NULL COMMENT '전화번호',
    email VARCHAR(255) NULL COMMENT '이메일',
    name VARCHAR(255) NULL COMMENT '담당자',
    PRIMARY KEY (place_id),
    CONSTRAINT fk_place_education FOREIGN KEY (education_id) REFERENCES education(education_id) ON DELETE CASCADE
);

-- 교육과정 (Curriculum)
CREATE TABLE curriculum (
    curriculum_id BIGINT NOT NULL COMMENT '교육과정 id',
    course_id BIGINT NOT NULL COMMENT '강좌그룹 id',
    curriculum_name VARCHAR(255) NOT NULL COMMENT '과정명',
    refund BOOLEAN NOT NULL COMMENT '환급/비환급',
    summation TEXT NULL COMMENT '개요',
    content TEXT NULL COMMENT '커리큘럼',
    announcement TEXT NULL COMMENT '안내말씀',
    PRIMARY KEY (curriculum_id),
    CONSTRAINT fk_curriculum_course FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

-- 행사예정 (Episode)
CREATE TABLE episode (
    episode_id BIGINT NOT NULL COMMENT '행사 예정 id',
    event_id BIGINT NOT NULL COMMENT '행사 id',
    title VARCHAR(255) NOT NULL COMMENT '제목',
    place VARCHAR(255) NULL COMMENT '장소',
    theme VARCHAR(255) NULL COMMENT '주제',
    summation VARCHAR(255) NULL COMMENT '세부내용 요약',
    content TEXT NULL COMMENT '세부내용',
    PRIMARY KEY (episode_id),
    CONSTRAINT fk_episode_event FOREIGN KEY (event_id) REFERENCES event(event_id) ON DELETE CASCADE
);

-- 일정 (Schedule)
CREATE TABLE schedule (
    schedule_id BIGINT NOT NULL COMMENT '일정 id',
    education_id BIGINT NULL COMMENT '교육과정 id',
    episode_id BIGINT NULL COMMENT '행사 예정 id',
    member_id BIGINT NULL COMMENT '회원 id',
    start_date DATE NOT NULL COMMENT '시작일',
    end_date DATE NOT NULL COMMENT '종료일',
    confirmed BOOLEAN NOT NULL DEFAULT 0 COMMENT '신청확인',
    duration BOOLEAN NOT NULL DEFAULT 0 COMMENT '접수/강의',
    PRIMARY KEY (schedule_id),
    CONSTRAINT fk_schedule_education FOREIGN KEY (education_id) REFERENCES education(education_id) ON DELETE SET NULL,
    CONSTRAINT fk_schedule_episode FOREIGN KEY (episode_id) REFERENCES episode(episode_id) ON DELETE SET NULL,
    CONSTRAINT fk_schedule_member FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE SET NULL
);

-- 배너 (Banner)
CREATE TABLE banner (
    banner_id BIGINT NOT NULL COMMENT '배너 id',
    content VARCHAR(255) NULL COMMENT '내용',
    PRIMARY KEY (banner_id)
);
```

```shell
php artisan make:migration modify_reviews_table


Laravel에서 모델을 생성하려면 artisan 명령어를 사용합니다. 기본 명령어 형식은 다음과 같습니다.

bash
Copy
php artisan make:model ModelName
예를 들어, 위에서 생성한 각 테이블에 대응하는 모델을 만들려면 아래와 같이 명령어를 실행하면 됩니다.

bash
Copy
php artisan make:model Area
php artisan make:model Company
php artisan make:model Faq
php artisan make:model Email
php artisan make:model Interest
php artisan make:model Training
php artisan make:model Course
php artisan make:model Curriculum
php artisan make:model Education
php artisan make:model Expense
php artisan make:model Place
php artisan make:model Review
php artisan make:model Event
php artisan make:model Resource
php artisan make:model Episode
php artisan make:model Participation
php artisan make:model Proposer
php artisan make:model Entrant
php artisan make:model Member
php artisan make:model Schedule
php artisan make:model Employee
php artisan make:model Popup
php artisan make:model Inquiry
php artisan make:model Notice
php artisan make:model File
php artisan make:model Banner
만약 모델을 생성할 때 동시에 팩토리나 컨트롤러, 혹은 migration 파일을 같이 생성하고 싶다면 다음 옵션들을 사용할 수 있습니다.

Migration 파일 함께 생성:

bash
Copy
php artisan make:model Area -m
컨트롤러와 함께 생성:

bash
Copy
php artisan make:model Area -c
각 테이블에 대응하는 모델을 생성한 후, 생성된 모델 파일 내에서 테이블명, 기본키, 관계 설정 등 필요한 내용을 추가로 설정해주시면 됩니다.

php artisan make:model BaseModel
php artisan make:model Name
```