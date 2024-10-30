nslookup yourdomain.com


https://velog.io/@imchanyang/AWS-EC2-%ED%94%84%EB%A6%AC%ED%8B%B0%EC%96%B4%EC%97%90%EC%84%9C-%EB%A6%AC%EC%A0%84resion-%EC%A7%80%EC%97%AD-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0

https://hagenti0612.github.io/aws/aws-region-change/






sudo nano /etc/ssh/sshd_config
PasswordAuthentication yes

sudo nano /etc/vsftpd.conf
sudo rm /etc/vsftpd.conf
sudo nano /etc/vsftpd.conf


sudo adduser <username>

sudo passwd <username>

sudo chmod 755 /home/ubuntu
sudo systemctl restart vsftpd

ps axuw | grep vsftp


AWS/EBS 볼륨
-

EBS ()

Amazon EBS 볼륨
Amazon EC2 인스턴스에 연결하는 스토리지 볼륨입니다.
볼륨을 인스턴스에 연결하면 해당 볼륨을 컴퓨터에 연결된 로컬 하드 드라이브처럼 사용할 수 있습니다(예: 파일 저장 또는 애플리케이션 설치).

Amazon EBS의 기능

Amazon EBS에서는 다음과 같은 기능과 이점이 제공됩니다.

여러 가지 볼륨 유형 - Amazon EBS에서는 광범위한 애플리케이션의 스토리지 성능과 비용을 최적화할 수 있는 여러 가지 볼륨 유형이 제공됩니다. 볼륨 유형은 트랜잭션 워크로드용 SSD 지원 스토리지와 처리량 집약적 워크로드용 HDD 지원 스토리지라는 두 가지 주요 범주로 구분됩니다.

확장성 - 필요성이 충족되는 용량 및 성능 사양으로 Amazon EBS 볼륨을 생성할 수 있습니다. 필요성이 변경되면 탄력적 볼륨 작업을 사용하여 가동 중지 시간 없이 동적으로 용량을 늘리거나 성능을 조정할 수 있습니다.

백업 및 복구 - Amazon EBS 스냅샷을 사용하여 볼륨에 저장된 데이터를 백업합니다. 그런 다음에 해당 스냅샷을 사용하여 볼륨을 즉시 복원하거나 AWS 계정, AWS 리전 또는 가용 영역 간에 데이터를 마이그레이션할 수 있습니다.

데이터 보호 - Amazon EBS 암호화를 사용하여 Amazon EBS 볼륨과 Amazon EBS 스냅샷을 암호화합니다. 암호화 작업은 저장 데이터 및 전송 중 데이터(인스턴스와 인스턴스에 연결된 볼륨 및 후속 스냅샷 간 전송)의 보안을 모두 보장하기 위해 Amazon EC2 인스턴스를 호스팅하는 서버에서 이루어집니다.

데이터 가용성 및 내구성 - io2 Block Express 볼륨은 연간 장애율이 0.001%인 99.999% 내구성을 갖추고 있습니다. 기타 볼륨 유형의 내구성은 99.8~99.9%이며, 연간 장애율은 0.1~0.2%입니다. 또한 단일 구성 요소의 장애로 인한 데이터 손실이 방지되도록 볼륨 데이터가 가용 영역의 여러 서버에 자동으로 복제됩니다.

데이터 보관 - EBS 스냅샷 아카이브에서는 규제 및 규정 준수 또는 향후 프로젝트 릴리스를 위해 90일 이상 유지해야 하는 특정 시점의 전체 EBS 스냅샷 복사본을 보관하는 저비용 스토리지 계층이 제공됩니다.

AWS/EC2 인스턴스 용량 확장하기
-
   
인스턴스를 생성할 때 설정한 인스턴스 서버의 디스크 용량이 부족할 때 용량을 확장하는 방법이다.

### 해결 방법 요약
1. EBS 볼륨 확장
2. 파일 시스템 확장

### 1. EBS 볼륨 확장

EC2 인스턴스의 물리적인 EBS 볼륨을 확장한다.

인스턴스 > 용량을 확장하고자 하는 인스턴스 선택 > 스토리지 > 볼륨 ID 클릭   

![001](https://github.com/user-attachments/assets/d5a5be51-17c6-4f87-b6e2-0255c691e93f)

마우스 왼쪽 버튼 클릭 > 볼륨 수정   

![002](https://github.com/user-attachments/assets/135ad738-e36a-4afc-8e02-ac3056cebbf5)

볼륨 크기 수정   

![003](https://github.com/user-attachments/assets/a5c9f251-6584-47ff-a789-3c6d516cc7e3)

일정 시간 이후 수정 완료   

![008](https://github.com/user-attachments/assets/97ee5352-4dc5-4b28-9e91-df0d281bc4f0)

### 2. 파일 시스템 확장

크기를 조정할 파티션 확인   

```bash
lsblk
```

![004](https://github.com/user-attachments/assets/30653eb5-05c8-4f84-a3aa-b0ddfe02b46c)

인스턴스 종류에 따라 파티션의 이름이 다르다.   

파티션 크기 조정   

```bash
sudo growpart /dev/xvda 1
```
![005](https://github.com/user-attachments/assets/435a1c2e-2f6d-43af-a1ee-28beddb8c765)

파티션에 늘어난 볼륨 크기가 반영되었는지 확인   

```bash
lsblk
```

![006](https://github.com/user-attachments/assets/2c57fa02-f05e-4f41-a313-c4147695b0e1)

파일 시스템 확장   

```bash
sudo resize2fs /dev/xvda
```

![007](https://github.com/user-attachments/assets/269e6de2-8abf-47b2-95b5-193aa2bc735c)

### resize2fs: Device or resource busy while trying to open

```bash
resize2fs 1.47.0 (5-Feb-2023)
resize2fs: Device or resource busy while trying to open /dev/xvda
Couldn't find valid filesystem superblock.
```
```bash
sudo reboot
```

변경된 디스크 용량 확인
```bash
df -h
```

참고한 글

1. [[AWS] EC2 인스턴스 용량 확장](https://velog.io/@harvey/AWS-EC2-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%9A%A9%EB%9F%89-%ED%99%95%EC%9E%A5)



