---
layout: home
title: Portfolio
---

**백진영 | Backend Developer**

* Laravel/PHP 기반 웹 서비스의 백엔드 개발을 담당했습니다.

* 데이터베이스 설계 및 개선, 외부 API 연동, 관리자 기능 개발, AWS EC2 배포 등의 업무를 수행했습니다.

---

## Contact & Links

* **Email:** 2002baekjinyoung@email.com
* **GitHub:** [github.com/baekjinyoung](https://github.com/baekjinyoung)

---

## Tech Stack

* **Backend:** PHP, Laravel
* **Database:** MySQL
* **DevOps / Infra:** AWS EC2, Linux
* **CI/CD:** GitHub Actions
* **API / Tools:** REST API, Postman, Git

---

## Key Projects

### 1. 우수조달컨설팅
* **기간:** 2024.07 ~ 2024.12
* **Role:** Backend Developer
* 기존 사이트의 데이터베이스 구조를 분석하고 새로운 구조로 변경한 프로젝트

**주요 업무**
* 기존 서버에 SSH로 접속하여 기존 MySQL 데이터베이스 구조 분석
* 중복되거나 사용하지 않는 테이블 및 컬럼 정리
* 새로운 데이터베이스 구조 설계 및 기존 데이터 이전
* Laravel Migration을 이용한 모델 및 테이블 생성
* 관리자 페이지의 게시글 등록/수정/삭제 기능 구현
* 게시글의 웹사이트 표출 여부 및 상위 노출 여부 설정 기능 구현
* GitHub Actions를 이용한 배포
* AWS EC2 서버에 서비스 배포 및 변경

**주요 경험**
* 기존 서버에 SSH로 접속하여 MySQL Dump를 통해 기존 데이터를 테스트 서버로 이전했습니다. 
* 새롭게 설계한 데이터베이스 구조에 맞게 기존 테이블과 컬럼을 수정한 후 데이터를 다시 Dump하여 새로운 서버로 이전했습니다.

---

### 2. 공간정원 
* **기간:** 2024.07 ~ 2024.11
* **Role:** Backend Developer
* 외부 콘텐츠 API 통합 연동 및 공통 컨트롤러 설계를 적용한 서비스 플랫폼

**주요 업무**
* Laravel/PHP 기반 백엔드 개발
* 관리자 페이지 및 게시글 관리 기능 구현
* 팝업, 배너, 고객 문의 등의 데이터베이스 설계
* 공통 BaseController 작성
* 네이버 검색 API 연동
* Instagram(Meta) API 연동
* YouTube API 연동
* API 명세서 작성
* GitHub Actions를 이용한 배포
* AWS EC2 배포

**주요 경험 — 네이버 블로그 API 연동**

* 네이버 API에서 특정 블로그의 게시글만 조회하는 기능을 제공하지 않았습니다. 대상 게시글을 식별할 수 있는 키워드를 사용하고 해당 키워드로 검색 API를 호출하여 특정 블로그의 게시글을 조회하도록 구현했습니다.

* 네이버 API에서 원하는 이미지를 직접 가져올 수 없었기 때문에 이미지는 관리자 페이지에서 별도로 등록하도록 구성했습니다. API 호출에 문제가 발생했을 때는 Postman을 이용해 요청과 응답을 확인하여 원인을 파악했습니다.

---

## Sub Projects

* **요한다이브:** 일정 예약 시 기간이 겹치는 데이터를 특정 기준에 따라 정렬하여 표시
* **브리에:** 게시글 이전/다음 글 탐색 및 다국어 게시글 조회 기능 구현
* **주식회사 24시응급환자이송센터:** 게시물 검색 및 이메일 전송 기능 구현
* **더블캐피탈:** Open API 연동 및 데이터 파싱 처리
* **카야루:** 계층형(대분류-소분류) 데이터베이스 모델링 및 백엔드 CRUD 연동