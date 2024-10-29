---
title: PHP/Laravel 에러
author: Baek JinYoung
date: 2024-10-29
category: Jekyll
layout: post
---

PHP/Laravel Illuminate\Database\Eloquent\Model::update(): Argument #1 ($attributes) must be of type array, string given, called in C:\[프로젝트 위치]\app\Http\Controllers\Controller.php on line 174
-

게시글 수정 함수를 만드는 중에 다음과 같은 에러가 발생했다.

```bash
Illuminate\Database\Eloquent\Model::update(): Argument #1 ($attributes) must be of type array, string given, called in C:\[프로젝트 위치]\app\Http\Controllers\Controller.php on line 174
```

<center><img src="https://github.com/user-attachments/assets/43f7910e-798d-49d5-85c3-852c0bfc99f0"></center>

update() 메서드가 array 타입의 값을 받아야 하는데 string 타입을 전달했기 때문에 오류가 발생했다.

update() 메서드는 라라벨에서 데이터베이스의 특정 레코드를 업데이트하는 데 사용하는 메서드이다.
update() 메서드를 사용할 때에는 다음 예제처럼 업데이트할 열과 값 쌍 배열을 입력해야 한다.

```php
Model::where('column', 'value')->update(['column1' => 'new_value1', 'column2' => 'new_value2']);
```

위 예제는 특정 컬럼(column)이 특정 값(value)을 가진 레코드를 찾아 column1과 column2 값을 각각 new_value1과 new_value2로 업데이트한다.

문제를 일으킨 코드는 다음과 같다.

```php

 public function update(Request $request, $id)
    {
        $item = $this->model->find($id);

        $data = $this->validationService->validate($request, $this->getValidationContext());
        $data = $this->handleRequest($request, $request);

        if ($this->model instanceof Member) {
            $item->update($data);

            for ($i = 1; $i <= 3; $i++) {
                $contentId = $request->input("content_id_{$i}");
                $content = $request->input("content_{$i}");

                // $contentId가 null이 아닐 경우에만 updateContent 메서드 호출
                if ($contentId !== null) {
                    $this->updateContent($contentId, $content);
                }
            }
        } else {
            $item->update($data);
        }

        return redirect()->route($this->getName('index'));
    }
    
    
    private function updateContent($contentId, $request)
    {
        // member_contents 테이블에서 해당 member에 연결된 파일 찾기
        $content = MemberContent::find($contentId); // MemberContent 모델을 사용하여 파일 정보 조회

        if ($request) {
            $content->update($request);
        }
    }
```

에러는 upddateContent 함수에서 일어났다.

코드를 살펴보자.
우선 update 함수에서 if문을 지나면 for문을 돌린다.
for 문에서 다시 if문을 통과하며 $contentId 값이 null이 아닐 경우 upddateContent 함수를 호출한다.
이때 $contentId 값과 $content 값을 넘긴다.

이후 upddateContent 함수에서 update() 메서드는 $request로 이름이 바뀐 $content 값을 입력받는다.
즉, update() 메서드가 배열이 아닌 변수를 받는다.

문제를 해결하는 방법은 다음과 같다.

1. update() 메서드가 받은 값이 배열인지 확인한다.
내 경우에는 $content->update($request); 를 살폈다.
앞서 살펴봤듯 $request는 배열이 아니다.

update() 메서드가 받은 값이 배열이 아니라면 배열로 변환해야 한다.

이때 update() 메서드가 받는 값이 배열인지 아닌지 모르겠다면 dd()를 사용해 타입과 값을 출력해 볼 수 있다.
배열이나 객체일 경우 구조를 트리 형태로 보여준다.

예를 들면 다음과 같이 사용한다.

```php
// 확인용
dd($request);
```

dd()는 데이터를 화면에 출력하고 스크립트 실행을 종료한다.
개발 중에 변수를 확인하거나, 특정 위치까지 코드가 정상적으로 실행되는지 점검할 때 유용하다.

참고로 dd는 dump and die의 줄임말이다.

2. update()에 전달할 때 배열로 변환한다.
만약 $request가 특정 컬럼 값(예: 단일 문자열)을 가진다면 이를 배열로 감싸 update() 메서드에 전달할 수 있다.

예를 들면 다음과 같이 수정할 수 있다.

```php
private function updateContent($contentId, $request)
{
    // member_contents 테이블에서 해당 member에 연결된 파일 찾기
    $content = MemberContent::find($contentId); // MemberContent 모델을 사용하여 파일 정보 조회

    if ($request) {
       $request = ['column_name' => $request];
       $content->update($request);
    }
}
```


3. $data가 다수의 컬럼 데이터를 포함하는 경우
만약 $data가 여러 컬럼 데이터를 포함한다면 올바른 배열 형식인지 확인해야 한다.
예를 들어 다음처럼 배열을 형성해야 한다.

```php
$data = [
'column1' => 'value1',
'column2' => 'value2',
// 필요한 모든 컬럼을 추가
];

$item->update($data);
```

4. update()를 단일 필드 업데이트로 변경
만약 특정 필드 하나만 업데이트하고 싶다면 update() 대신에 다음과 같이 개별 필드에 직접 값을 할당하고 save() 메서드를 호출할 수도 있다.

```php
    private function updateContent($contentId, $request)
    {
        // member_contents 테이블에서 해당 member에 연결된 핵심 역량 찾기
        $content = MemberContent::find($contentId);

        if ($contentId) {
            $content->content = $request ?? '';
            $content->save();
        }
    }
```