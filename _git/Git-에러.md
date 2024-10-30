---
title: Git/깃 에러
author: Baek JinYoung
date: 2024-10-25
category: Jekyll
layout: post
---

Git/깃 에러 remote: error: File public/video/sample-video.mp4 is 149.42 MB; this exceeds GitHub's file size limit of 100.00 MB
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

Git/깃 에러 fatal: refusing to merge unrelated histories
-

깃허브 레파지토리에 프로젝트를 올린 후 새 프로젝트를 만들어서 푸시했더니 다음과 같은 에러가 발생했다.

```bash
To https://github.com/BaekJinYoung/[프로젝트 이름].git
! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'https://github.com/BaekJinYoung/[프로젝트 이름].git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. If you want to integrate the remote changes,
hint: use 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
<center><img src="https://github.com/user-attachments/assets/89c28f7d-3428-484e-b20e-bacaaf091d5a"></center>   


로컬 브랜치가 원격 브랜치와 동기화되지 않았을 때 발생하는 에러이다.    
구체적으로 말하면, 로컬의 main 브랜치가 원격의 main 브랜치와 관련이 없어서 문제가 발생했다.

hint대로 git pull 했더니 다음과 같은 에러가 발생했다.

```bash
fatal: refusing to merge unrelated histories
```

'관련 없는 기록 병합 거부' 라는 의미이다.    
이 에러는 두 개의 서로 다른 Git 히스토리를 병합하려고 할 때 발생한다.

__--allow-unrelated-histories__ 플래그를 사용해 강제로 병합하여 문제를 해결했다.

```bash
git pull [원격 저장소 이름] [로컬 저장소에서 푸시하고자 하는 브랜치의 이름] --allow-unrelated-histories

git pull origin main --allow-unrelated-histories
```

이 명령어는 원격의 main 브랜치와 로컬의 main 브랜치를 병합한다.

__git pull__    
pull은 원격 저장소의 변경 사항을 로컬 저장소로 가져오고, 이를 자동으로 병합한다.    
즉, git fetch와 git merge를 결합한 명령어이다.

위 명령어를 실행하면 다음과 같은 작업이 수행된다.

1. 원격 브랜치 가져오기        
   origin의 main 브랜치에 있는 변경 사항을 로컬 저장소로 가져온다.

2. 병합 작업 수행    
   로컬 브랜치와 원격 브랜치의 변경 사항을 병합한다.    
   이때 두 브랜치의 히스토리가 서로 다르기 때문에 --allow-unrelated-histories 플래그를 사용하여 병합을 강제로 수행한다.

병합 후 충돌 해결 등 변경 사항이 있다면 커밋한다.

```bash
git add .
git commit -m "Your commit message"
```

__git add__    
Git에서는 작업한 파일의 변경 사항을 바로 커밋할 수 없다.    
커밋 전에 먼저 변경 사항을 스테이징 영역에 추가해야 한다.    
스테이징 영역은 Git이 추적할 다음 커밋에 포함할 변경 사항을 준비하는 공간이다.

__.__    
현재 디렉토리를 의미한다.    
따라서 __git add .__ 명령어를 사용하면 현재 디렉토리 및 그 하위 디렉토리에 있는 모든 변경된 파일을 스테이징 영역에 추가한다.

병합이 완료되면 다시 푸시한다.

```bash
git push -u [원격 저장소 이름] [로컬 저장소에서 푸시하고자 하는 브랜치의 이름]

git push -u origin main
```

__git push__    
push는 로컬 저장소의 변경 사항을 원격 저장소에 업로드하는 명령어이다.    
로컬 브랜치에서 커밋한 내용을 원격 브랜치에 반영한다.

__-u (또는 --set-upstream)__    
현재 로컬 브랜치와 원격 브랜치를 연결하는 플래그이다.    
이 플래그를 사용하면 이후에 git push 또는 git pull 명령어를 사용할 때 원격 브랜치 이름을 명시하지 않아도 된다.

위 명령어를 실행하면 로컬의 main 브랜치에 있는 모든 커밋이 origin의 main 브랜치로 푸시된다.    
이를 통해 원격 저장소에 변경 사항이 반영된다.

__주의 사항__
__--allow-unrelated-histories__ 플래그는 주의해서 사용해야 한다.    
두 개의 다른 히스토리를 합치는 것이기 때문에 충돌이 발생할 수 있으며 이를 수동으로 해결해야 한다.    
만약 원격 리포지토리를 새로 생성한 것이라면 원격에서 불필요한 커밋을 삭제하고 로컬의 내용을 강제로 푸시할 수도 있다.    
하지만 이 경우 원격의 내용이 사라질 수 있으므로 신중해야 한다.

원격의 내용을 덮어쓰려면 다음 명령어를 사용한다.

```bash
git push -f [원격 저장소 이름] [로컬 저장소에서 푸시하고자 하는 브랜치의 이름]

git push -f origin main
```

이 명령어는 원격 브랜치의 내용을 강제로 덮어쓴다.

__-f (또는 --force)__    
강제 푸시를 의미한다.    
기본적으로 Git은 원격 브랜치에 변경 사항을 푸시할 때, 해당 브랜치의 최신 커밋이 로컬 브랜치의 최신 커밋보다 이전일 경우 푸시를 거부한다.    
그러나 -f를 사용하면 이런 제약을 무시하고 강제로 푸시한다.

위 명령어를 실행하면
1. 로컬의 main 브랜치의 모든 커밋이 원격의 main 브랜치에 강제로 푸시된다.    
   이 과정에서 원격 브랜치의 기존 커밋이 모두 삭제되고, 로컬 브랜치의 커밋으로 대체된다.
2. 원격 저장소에 있는 main 브랜치의 커밋 이력이 로컬 브랜치의 이력으로 덮어써지므로 원격 저장소에서 작업한 다른 사용자의 변경 사항이 손실될 수 있다.

매우 주의해서 사용해야 하며, 다른 팀원이 작업 중이라면 권장되지 않는다.    