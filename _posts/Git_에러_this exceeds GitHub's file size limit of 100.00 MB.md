---
title: Git 에러 File public/video/sample-video.mp4 is 149.42 MB; this exceeds GitHub's file size limit of 100.00 MB
author: Baek JinYoung
date: 2024-10-25
category: Jekyll
layout: post
---

Git 에러 remote: error: File public/video/sample-video.mp4 is 149.42 MB; this exceeds GitHub's file size limit of 100.00 MB
-

프로젝트 안에 용량이 큰 파일을 넣고 푸시하자 다음과 같은 오류가 발생했다.    

```bash
remote: error: Trace:         
remote: error: See https://gh.io/lfs for more information.        
remote: error: File public/audio/song1.mp4 is 149.04 MB; this exceeds GitHub's file size limit of 100.00 MB        
remote: error: File public/video/sample-video.mp4 is 149.42 MB; this exceeds GitHub's file size limit of 100.00 MB        
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.        
error: failed to push some refs to 'https://github.com/BaekJinYoung/[프로젝트 이름].git'
To https://github.com/BaekJinYoung/[프로젝트 이름].git
!	refs/heads/main:refs/heads/main	[remote rejected] (pre-receive hook declined)
Done
```
<center><img src="https://github.com/user-attachments/assets/5588cc59-f8cf-4f3d-9c0b-99c6563f1996"></center>

문제가 된 부분을 살펴보자.    

```bash
remote: error: File [파일 이름] is [파일 용량] MB; this exceeds GitHub's file size limit of 100.00 MB   
```

해당 파일이 GitHub의 파일 크기 제한(100MB)을 초과하여 푸시가 거부되었다는 뜻이다.    
Git LFS를 사용하면 용량이 큰 파일도 푸시할 수 있다고 한다.    

나는 ftp를 사용해 업로드할 생각으로 해당 파일을 프로젝트 내에서 제거(Delete)하고 다시 푸시했다.    
같은 오류가 다시 발생했다.    

<center><img src="https://github.com/user-attachments/assets/f771d36f-813c-4772-b1e6-9457833cb961"></center>

이 경우 파일을 커밋 내역에서 완전히 제거해야 한다.    


### 1. 파일이 완전히 제거되었는지 확인한다.

```bash
git log
```
혹은
```bash
git status
```

명령어를 사용하여 파일이 제대로 삭제되었는지 확인한다.    
제대로 삭제되었는데도 오류가 발생한다면 .gitignore 파일을 업데이트하여 큰 파일이 다시 추가되지 않도록 한다.    


### 2. 캐시된 파일이 남아 있는지 확인한다.

설명하기에 앞서 내 경우 이 방법이 통하지 않았음을 알린다.    
나는 3번 방법으로 문제를 해결했다.    

파일이 스테이징 영역에서 제거되었어도 .git 디렉토리에 캐시된 상태로 남아 있을 수 있다.    
다음 명령어를 이용하여 캐시를 완전히 제거한다.    

```bash
git rm -r --cached .
git add .
git commit -m "Remove cached files"
git push origin main
```

위 명령어를 실행해도 같은 오류가 다시 발생했다.    

```bash
remote: Resolving deltas: 100% (151/151), completed with 24 local objects.
remote: error: Trace: edf0d115280590d99974d9a2103929ec7df9ac71e0d483de8398975a940c1f76
remote: error: See https://gh.io/lfs for more information.
remote: error: File public/audio/song1.mp4 is 149.04 MB; this exceeds GitHub's file size limit of 100.00 MB
remote: error: File public/video/sample-video.mp4 is 149.42 MB; this exceeds GitHub's file size limit of 100.00 MB
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
To https://github.com/BaekJinYoung/[프로젝트 이름].git
 ! [remote rejected] main -> main (pre-receive hook declined)
error: failed to push some refs to 'https://github.com/BaekJinYoung/[프로젝트 이름].git'
```

### 3. 과거 커밋에서 큰 파일 제거하기

이 방법으로 문제를 해결했다.    

큰 파일이 이전 커밋에 남아있으면 오류가 발생한다.    
git filter-branch 또는 BFG Repo-Cleaner로 해당 파일을 모든 커밋에서 삭제해야 한다.    
이때는 개발툴 터미널이 아니라 git Bash와 같은 쉘을 이용한다.    

```bash
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch [문제 파일 이름_1] [문제 파일 이름_2]' \
--prune-empty --tag-name-filter cat -- --all
```

파일 경로를 제대로 입력해야 한다.    
여러 개의 파일을 삭제해야 할 경우 예시처럼 스페이스 바를 누른 뒤 이어서 다음 파일의 경로를 입력한다.    

커밋에 남아 있던 파일이 삭제된다.

<center><img src="https://github.com/user-attachments/assets/abd334aa-36ca-4d7d-ba24-2f0549e8e617"></center>

<center><img src="https://github.com/user-attachments/assets/8543235a-abce-4693-857d-af1490d74b47"></center>

파일이 삭제되면 변경사항을 푸시한다.    
이때는 --force를 붙여 강제로 푸시해야 한다.    

```bash
git push origin main --force
```

<center><img src="https://github.com/user-attachments/assets/fca120b8-a7c5-484f-bf1c-a5990d93c34a"></center>

정상적으로 푸시됐다.    