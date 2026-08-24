# Laravel `new` 실행 시 OpenSSL extension 오류 해결하기

Laravel 프로젝트를 새로 생성하려고 `laravel new` 명령을 실행했는데 다음과 같은 오류가 발생했다.

```text
The openssl extension is required for SSL/TLS protection but is not available.

If you can not enable the openssl extension, you can
disable this error, at your own risk, by setting the
'disable-tls' option to true.
```

처음에는 Laravel이나 Composer의 문제라고 생각할 수 있지만, 실제 원인은 **현재 사용 중인 PHP에서 OpenSSL extension을 정상적으로 로드하지 못하고 있었던 것**이었다.

이번 글에서는 Windows에서 Scoop으로 PHP를 설치한 환경에서 이 문제를 해결한 과정을 정리한다.

## 1. PHP가 `php.ini`를 사용하고 있는지 확인

먼저 현재 PHP가 어떤 설정 파일을 사용하는지 확인했다.

```bash
php --ini
```

처음 결과는 다음과 같았다.

```text
Configuration File (php.ini) Path: ""
Loaded Configuration File:         (none)
Scan for additional .ini files in: (none)
Additional .ini files parsed:      (none)
```

Configuration File(설정 파일)은 소프트웨어, 운영 체제, 서버 등이 실행될 때 필요한 초기 설정, 매개변수, 동작 옵션 등을 저장하는 데이터 파일입니다. 줄여서 config 파일이라고도 부릅니다.

`Loaded Configuration File`이 `(none)`이라는 것은 PHP가 `php.ini`를 전혀 읽고 있지 않다는 의미다.

## 2. Scoop으로 설치된 PHP 위치 확인

현재 사용 중인 PHP가 어디에 설치되어 있는지 확인했다.

```bash
which php
```

결과:

```text
/c/Users/JIN/scoop/shims/php
```

Scoop의 shim을 통해 PHP를 실행하고 있다는 것을 확인할 수 있었다.

실제 PHP 설치 디렉터리에는 다음과 같은 파일들이 있었다.

```text
php.exe
php.ini-development
php.ini-production
ext/
libssl-3-x64.dll
libcrypto-3-x64.dll
...
```

여기서 중요한 점은 `php.ini`가 없고 `php.ini-development`와 `php.ini-production`만 있었다는 것이다.

## 3. `php.ini` 생성

개발 환경이므로 `php.ini-development`를 기반으로 `php.ini`를 만들었다.

```bash
cp ~/scoop/apps/php/current/php.ini-development ~/scoop/apps/php/current/php.ini
```

정말 이름 자체를 바꾸고 싶다면 이것도 가능해:
```bash
mv ~/scoop/apps/php/current/php.ini-development ~/scoop/apps/php/current/php.ini
```

차이는:

cp → php.ini-development도 남음 ← 추천
mv → php.ini-development가 php.ini로 변경됨


이후 다시 확인했다.

```bash
php --ini
```

이번에는 다음과 같이 PHP 설정 파일이 정상적으로 로드되었다.

```text
Loaded Configuration File:
"C:\Users\JIN\scoop\apps\php\8.5.9\php.ini"
```

## 4. OpenSSL extension 활성화

`php.ini`에서 OpenSSL 설정을 확인했다.

나는 디렉토리로 직접 접근해서 수정했다.

```bash
grep -n "openssl" ~/scoop/apps/php/8.5.9/php.ini
```

다음과 같은 설정을 발견했다.

```ini
;extension=openssl
```

앞에 `;`가 붙어 있기 때문에 비활성화된 상태였다.

이를 다음과 같이 변경했다.

```ini
extension=openssl
```

하지만 여기서 또 다른 문제가 발생했다.

## 5. `extension_dir` 문제 발견

PHP를 직접 실행해 보니 다음과 같은 오류가 발생했다.

```text
PHP Startup: Unable to load dynamic library 'openssl'

tried:
C:\php\ext\openssl
C:\php\ext\php_openssl.dll
```

OpenSSL DLL이 없다는 의미처럼 보이지만, 실제로는 DLL이 존재했다.

확인해 보니:

```bash
ls ~/scoop/apps/php/8.5.9/ext/php_openssl.dll
```

결과:

```text
/c/Users/JIN/scoop/apps/php/8.5.9/ext/php_openssl.dll
```

즉, `php_openssl.dll`은 정상적으로 존재했다.

문제는 PHP가 엉뚱한 위치인 `C:\php\ext`에서 extension을 찾고 있었다는 것이었다.

`php.ini`에서 `extension_dir`을 확인했지만 실제 설정은 되어 있지 않았다.

```bash
grep -n "extension_dir" ~/scoop/apps/php/8.5.9/php.ini
```

따라서 PHP의 실제 extension 디렉터리를 명시적으로 지정했다.

```ini
extension_dir = "C:\Users\JIN\scoop\apps\php\8.5.9\ext"
```

그리고 OpenSSL도 활성화되어 있는지 확인했다.

```ini
extension=openssl
```

결국 핵심 설정은 다음 두 가지였다.

```ini
extension_dir = "C:\Users\JIN\scoop\apps\php\8.5.9\ext"
extension=openssl
```

## 6. OpenSSL이 정상적으로 로드되는지 확인

Scoop shim을 거치지 않고 PHP 실행 파일을 직접 실행해서 확인했다.

```bash
~/scoop/apps/php/8.5.9/php.exe -m | grep openssl
```

정상적으로 다음 결과가 출력되면 OpenSSL이 활성화된 것이다.

```text
openssl
```

PHP 버전 확인에서도 더 이상 OpenSSL 관련 startup warning이 발생하지 않았다.

## 7. Scoop shim 재설정

실제 PHP가 정상적으로 동작하는 것을 확인한 후 Scoop shim도 다시 설정했다.

```bash
scoop reset php
```

이후 Git Bash를 다시 실행하고:

```bash
php -m | grep openssl
```

다시 확인했다.

```text
openssl
```

이제 `php` 명령을 통해서도 OpenSSL extension을 정상적으로 사용할 수 있게 되었다.

## 8. Laravel 프로젝트 생성

마지막으로 다시 Laravel 프로젝트를 생성했다.

```bash
laravel new 프로젝트명
```

처음 발생했던 OpenSSL 오류 없이 프로젝트 생성이 정상적으로 진행되었다.

## 정리

이번 문제의 원인은 단순히 OpenSSL이 설치되어 있지 않았던 것이 아니었다.

Scoop으로 설치한 PHP에서 다음과 같은 문제가 있었다.

```text
php.ini 없음
    ↓
php.ini-development를 기반으로 php.ini 생성
    ↓
OpenSSL extension 비활성화
    ↓
extension=openssl 활성화
    ↓
extension_dir이 올바르게 설정되지 않음
    ↓
C:\php\ext에서 OpenSSL DLL을 찾으려고 함
    ↓
Scoop PHP의 실제 ext 디렉터리 지정
    ↓
OpenSSL 정상 로드
```

특히 중요한 것은 **`disable-tls` 옵션으로 오류를 우회하지 않는 것**이다.

오류 메시지에서는 다음과 같이 TLS 검사를 끌 수도 있다고 안내한다.

```text
disable-tls option to true
```

하지만 이는 HTTPS/TLS 보안을 비활성화하는 우회 방법이다.

개발 환경이라도 가능하면 보안 기능을 끄기보다는 PHP의 OpenSSL extension을 정상적으로 설정하는 것이 올바른 해결 방법이다.

### 최종적으로 확인할 것

Laravel이나 Composer에서 HTTPS 관련 오류가 발생한다면 다음 명령들을 순서대로 확인하면 된다.

```bash
php --ini
```

```bash
php -m | grep openssl
```

```bash
php --ri openssl
```

그리고 Scoop PHP라면 실제 PHP 설치 경로와 `extension_dir` 설정도 함께 확인하는 것이 좋다.

이번 경우처럼 `php_openssl.dll`이 실제로 존재하는데도 PHP가 `C:\php\ext` 같은 엉뚱한 경로를 바라보고 있다면, `extension_dir` 설정이 원인일 가능성이 있다.
