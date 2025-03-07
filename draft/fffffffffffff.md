---
title: AWS
author: Baek JinYoung
date: 2024-09-30
category: Jekyll
layout: post
---

AWS/EC2 고정 IP 만들기 (탄력적 IP)
-

인스턴스를 생성한 이후 진행한다.   
&nbsp;

AWS에 접속하여 로그인한 후 EC2 서비스로 이동한다.   
&nbsp;

<center><img src="https://github.com/user-attachments/assets/8891473a-f7c8-4b8a-b81f-b8fe73bd4c29"></center>   
&nbsp;

왼쪽 사이드바에서 __'탄력적 IP'__ 를 선택한 후 탄력적 IP 주소 할당을 클릭한다.   
&nbsp;

<center><img src="https://github.com/user-attachments/assets/bb5a3ccf-7e7e-4e89-b08d-302f9afc3640"></center>   
&nbsp;

기본 상태에서 __'할당'__ 버튼을 클릭한다.   
&nbsp;

<center><img src="https://github.com/user-attachments/assets/7ff8a276-5a37-46ca-823f-78c21cea9ee1"></center>   
&nbsp;

새로운 탄력적 IP가 생성되었다.   
할당된 __'IPv4 주소'__ 를 클릭한다.   
&nbsp;

<center><img src="https://github.com/user-attachments/assets/c86ddd89-6d4b-4ccc-a1c2-cb8f5f554630"></center>   
&nbsp;

인스턴스와의 연결을 위해 __'탄력적 IP 주소 연결'__ 을 클릭한다.
&nbsp;

<center><img src="https://github.com/user-attachments/assets/960f9ec8-76e6-44c7-8086-5a5629eb81b1"></center>   
&nbsp;

리소스 유형은 __'인스턴스'__ 를 선택한다.   
인스턴스는 __'탄력적 IP를 연결할 인스턴스'__ 를 선택한다.   
프라이빗IP는 탄력적 IP를 연결할 인스턴스의 __'프라이빗IP'__ 를 입력한다.   
__'연결'__ 을 누르면 탄력적 IP가 해당 인스턴스와 연결된다.   
&nbsp;

<center><img src="https://github.com/user-attachments/assets/caed099d-4dea-4407-a24c-301e50f76d8a"></center>   
&nbsp;

프라이빗 IP 주소는 인스턴스 요약에서 확인할 수 있다.   
__'프라이빗 IPv4 주소'__ 를 복사해 붙여넣기하면 된다.   
&nbsp;

<center><img src="https://github.com/user-attachments/assets/ba5ba0f1-a07b-45f8-a254-3669ccc3db3d"></center>   

참고한 글   

1. [[AWS/EC2] 고정IP만들기 (탄력적IP)](https://cocobi.tistory.com/15)   


프로젝트에 도메인 연결하기
-

https://velog.io/@jjonggang/AWS-%EA%B3%A0%EB%8C%80%EB%94%94%EC%97%90%EC%84%9C-%EA%B5%AC%EB%A7%A4%ED%95%9C-%EB%8F%84%EB%A9%94%EC%9D%B8-AWS%EC%97%90-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0

https://velog.io/@tamagoyakii/42GG-Godaddy-%EB%8F%84%EB%A9%94%EC%9D%B8-AWS%EC%97%90-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0

https://cocobi.tistory.com/14

https://dogfoottech.tistory.com/257


