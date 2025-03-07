---
title: 오류
author: Baek JinYoung
date: 2024-07-04
category: Jekyll
layout: post
---

[IntelliJ/PHPStorm] 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다. 이름이 정확한지 확인하고 경로가 포함된 경우 올바른지 검증한 다음 다시 시도하십시오.
-

인텔리제이 기본 터미널에 php artisan 명령어를 사용하자 다음과 같은 오류 메세지가 떴다.          

```
php : 'php' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다. 이름이 정확한지 확인하고 경로가 포함된 경우 올바른지 검증한 다음 다시 시도하십시오.
```

     

<center><img src="https://github.com/BaekJinYoung/BaekJinYoung.github.io/assets/98303264/9cbf06df-5965-4610-adae-d36523460b02"></center>

          

Intellij의 기본 터미널이 posershell로 설정되어 있기 때문에 발생한 문제이다.     

좌측 상단 'File' -> 'Setting' -> 'Tools' -> terminal -> 'Shell Path:' powershell을 cmd로 변경한다.          

<center><img src="https://github.com/BaekJinYoung/BaekJinYoung.github.io/assets/98303264/85315c63-e2c6-40e8-ab8f-f90e4e035af1"></center>
<center><img src="https://github.com/BaekJinYoung/BaekJinYoung.github.io/assets/98303264/b5a76568-e9e4-48ce-ae4b-4ce5c1a70fa9"></center>
<center><img src="https://github.com/BaekJinYoung/BaekJinYoung.github.io/assets/98303264/392c06ea-37a0-4772-834a-7ac7f0f1c0e1"></center>
<center><img src="https://github.com/BaekJinYoung/BaekJinYoung.github.io/assets/98303264/cfbc29a2-b3a4-44d4-bc48-38d6dbef05d4"></center>

     

정상적으로 실행된다.          

<center><img src="https://github.com/BaekJinYoung/BaekJinYoung.github.io/assets/98303264/8b5173ba-d848-470c-a882-b00d05d61053"></center>


참고한 글

1. [[Intellij] 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다. 이름이 정확한지 확인하고 경로가 포함된 경우 경로가 올바른지 검증한 다음 다시 시..](https://this-circle-jeong.tistory.com/221)

[Composer] PHP Warning: PHP Startup: Invalid date.timezone value 'Asia / Seoul', using 'UTC' instead in Unknown on line 0
-

컴포저를 설치하는 도중에 'PHP Settings Error'가 발생했다.          

```
PHP Warning: PHP Startup: Invalid date.timezone value 'Asia / Seoul', using 'UTC' instead in Unknown on line 0
```

     

<center><img src="https://github.com/BaekJinYoung/BaekJinYoung.github.io/assets/98303264/e1eb65ce-e5b4-447d-b5ec-5f564bb74432"></center>

PHP 설정 파일인 'php.ini' 파일에서 'date.timezone' 설정 값이 잘못되었다는 오류이다.     

'Asia / Seoul'이란 값을 사용했는데 이 값이 유효하지 않고,     
때문에 PHP가 기본값인 UTC를 사용하고 있다는 것이다.     
타임존을 'Asia/Seoul'로 수정하면 된다.     

### 1. php.ini 파일 찾기

'php.ini' 파일은 PHP가 설치된 디렉토리에 있다.     
내 컴퓨터의 경우 'C:\php'에 있었다.     

### 2. date.timezone 수정

'date.timezone' 설정을 찾는다.     
메모장 검색 단축키는 'Ctrl' + 'F' 이다.     
공백이 없도록 주의하며 수정한다.     

```
date.timezone = Asia/Seoul
```

     

'php.ini' 파일을 저장한다.     

mysql
-
```shell

   Illuminate\Database\QueryException 

  SQLSTATE[HY000] [1045] Access denied for user 'root'@'localhost' (using password: NO) (Connection: mysql, SQL: select table_name as `name`, (data_length + index_length) as `size`, table_comment as `comment`, engine as `engine`, table_collation as `collation` from information_schema.tables where table_schema = 'project' and table_type in ('BASE TABLE', 'SYSTEM VERSIONED') order by table_name)

  at vendor\laravel\framework\src\Illuminate\Database\Connection.php:813
    809▕                     $this->getName(), $query, $this->prepareBindings($bindings), $e
    810▕                 );
    811▕             }
    812▕
  ➜ 813▕             throw new QueryException(
    814▕                 $this->getName(), $query, $this->prepareBindings($bindings), $e
    815▕             );
    816▕         }
    817▕     }
```