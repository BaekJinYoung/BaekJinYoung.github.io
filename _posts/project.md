service
-

Laravel은 서비스 클래스를 자동으로 생성해주는 명령어가 없기 때문에, ValidationService 같은 서비스 클래스를 만들 때는 수동으로 파일을 생성해야 합니다.

```shell
mkdir app/Services
touch app/Services/ValidationService.php
```

```php
<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use InvalidArgumentException;

class ValidationService
{
    public function validate(Request $request, string $context): array // 유효성 검사
    {
        $rules = $this->getValidationRules($request, $context);
        $messages = $this->getValidationMessages($context);

        return $this->performValidation($request, $rules, $messages);
    }

    public function getValidationRules(Request $request, string $context): array // 유효성 검사 목록
    {
        switch ($context) {
            case 'popup':
                return $this->validatePopup($request);

            default:
                throw new InvalidArgumentException('Invalid validation context: ' . $context);
        }
    }

    public function getValidationMessages(string $context): array // 유효성 검사 메시지
    {
        $messages = [
            'title.required' => '제목을 작성해주세요.',
            'content.required' => '내용을 작성해주세요.',
            'image.required' => '이미지를 업로드해주세요.',
        ];

        if ($context === 'popup') {
            $messages['start_date.required'] = '팝업의 노출 시작일을 입력해주세요.';
            $messages['end_date.required'] = '팝업의 노출 종료일을 입력해주세요.';
            $messages['end_date.after_or_equal'] = '노출 종료일은 노출 시작일 이후여야 합니다.';
        }

        return $messages;
    }

    protected function validatePopup(array $data): array // 팝업 유효성 검사
    {
        $rules = [
            'title' => 'required',
            'link' => 'nullable',
            'image' => $data['remove_image'] == 1 ? 'required' : 'nullable',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ];

        return $rules;
    }

    protected function performValidation(Request $request, array $rules, array $messages): array
    {
        try {
            return $request->validate($rules, $messages);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors();

            throw ValidationException::withMessages($errors->toArray());
        }
    }
}
```

database
-

```bash
php artisan db:seed --class=DatabaseSeeder
```

controller
-

```php
<?php

namespace App\Http\Controllers;

use App\Services\ValidationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

abstract class Controller
{
    protected $model;
    protected $validationService;
    protected $defaultPerPage = 15;

    public function __construct($model, ValidationService $validationService) {
        $this->model = $model;
        $this->validationService = $validationService;
    }

    /** 관리자 페이지 사용 함수 */
    protected function getName($view) // 이동할 페이지 이름
    {
        return 'admin.' . strtolower(class_basename($this->model)) . ucfirst($view);
    }

    protected function handleRequest(Request $request, $item = null) {
        // 내용
        if (isset($data['content'])) {
            $data['content'] = preg_replace('/^<p>(.*?)<\/p>$/s', '$1', $data['content']);
        }

        // 이미지
        $data = $request->except(['file', '_token']);
        $imageFields = ['image', 'mobile_image'];
        foreach ($imageFields as $field) {
            if ($request->hasFile($field)) {
                $data = $this->fileUpload($request, $data, $field, 'images', $field . '_name', $item ? $item->$field : null);
            } elseif ($request->input("remove_".$field) == '1') {
                if ($item && $item->$field) {
                    Storage::disk('public')->delete($item->$field);
                }
                $data[$field] = null;
                $data[$field.'_name'] = null;
            } else {
                if ($item && $item->$field) {
                    $data[$field] = $item->$field;
                    $data[$field . '_name'] = $item->{$field . '_name'};
                }
            }
        }

        return $data;
    }

    private function fileUpload($request, $data, $field, $directory, $fileNameField, $existingFile = null)
    {
        if ($existingFile) {
            Storage::disk('public')->delete($existingFile);
        }

        $file = $request->file($field);
        $FileName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $fileName = uniqid() . '.' . $extension;
        $path = $file->storeAs($directory, $fileName, 'public');

        $data[$field] = $path;
        $data[$fileNameField] = $FileName;

        return $data;
    }

    /** 관리자 페이지 */
    public function index(Request $request) {
        $query = $this->model->query();

        $search = $request->get('search', '');
        if (!empty($search)) {
            $query->where('title', 'like', '%' . $search . '%');
        }

        $perPage = (int) $request->query('perPage', $this->defaultPerPage);
        if ($perPage <= 0) {
            $perPage = $this->defaultPerPage;
        }

        $items = $query->orderBy('id', 'desc')->paginate($perPage);

        return view($this->getName('index'), compact('items', 'perPage', 'search'));
    }

    public function store(Request $request) {
        $data = $this->validationService->validate($request, $this->getValidationContext());
        $data = $this->handleRequest($request);

        if ($request->hasFile('image')) {
            $data = $this->fileUpload($request, $data, 'image', 'images', 'image_name');
        }
        if ($request->hasFile('mobile_image')) {
            $data = $this->fileUpload($request, $data, 'mobile_image', 'images', 'mobile_image_name');
        }

        $this->model->create($data);

        if ($request->filled('continue')) {
            return redirect()->route($this->getName('create'));
        }

        return redirect()->route($this->getName('index'));
    }

    public function update(Request $request, $id) {
        $item = $this->model->find($id);

        $data = $this->validationService->validate($request, $this->getValidationContext());
        $data = $this->handleRequest($request, $request);

        $item->update($data);

        return redirect()->route($this->getName('index'));
    }

    public function create() {
        return view($this->getName('create'));
    }

    public function edit($id) {
        $item = $this->model->find($id);

        if (!$item) {
            return redirect()->route($this->getName('index'))
                ->with('error', '해당 게시물을 찾을 수 없습니다.');
        }

        return view($this->getName('edit'), compact('item'));
    }

    public function destroy($item)
    {
        $item = $this->model->findOrFail($item);
        $item->delete();

        return redirect()->route($this->getName('index'));
    }
}
```

views
-

```bash
mkdir resources/views/admin

mkdir resources/views/admin/components

touch resources/views/admin/components/head.blade.php
touch resources/views/admin/components/pagination.blade.php
touch resources/views/admin/components/snb.blade.php
```
head
```php
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=0"/>
    <title>관리자페이지</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/admin/common.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/admin/style.css') }}">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>

    <script src="{{ asset('js/jquery.js') }}"></script>

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>
        var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    </script>
</head>
```

snb
```bladehtml
@php use Illuminate\Support\Str; @endphp
<div class="header-wrap">
    <img src="{{ asset('images/139029.png') }}" alt="" class="header-logo">

    <div class="translation_wrap">
        @php
            $board = Str::of(request()->segment(2))->singular();
        @endphp

        @if(session('locale', 'ko') == 'ko')
            <a href="{{ route('lang.ko', ['board' => $board]) }}">
                <img src="{{ asset('images/kr-on.png') }}" alt="Korean">
            </a>
            <a href="{{ route('lang.en', ['board' => $board]) }}">
                <img src="{{ asset('images/en-off.png') }}" alt="English">
            </a>
        @else
            <a href="{{ route('lang.ko', ['board' => $board]) }}">
                <img src="{{ asset('images/kr-off.png') }}" alt="Korean">
            </a>
            <a href="{{ route('lang.en', ['board' => $board]) }}">
                <img src="{{ asset('images/en-on.png') }}" alt="English">
            </a>
        @endif
    </div>

    <div class="menu-wrap row-group">
        <div class="gnb">
            <div class="gnb-item">
                <div>
                    <a href="{{route("admin.visitorIndex")}}" class="item-default">
                        방문자 집계
                    </a>
                </div>
            </div>
            <div class="gnb-item">
                <div class="item-default">
                    홈페이지 관리
                    <i class="xi-angle-down-thin"></i>
                </div>
                <div class="sub-gnb row-group">
                    <a href="{{ route("admin.popupIndex") }}" class="sub-gnb-item">
                        메인 팝업
                    </a>
                </div>
                <div class="sub-gnb row-group">
                    <a href="{{ route("admin.bannerIndex") }}" class="sub-gnb-item">
                        메인 배너
                    </a>
                </div>
            </div>
            <div class="gnb-item">
                <div>
                    <a href="{{route("admin.memberIndex")}}" class="item-default">
                        팀원 소개
                    </a>
                </div>
            </div>
            <div class="gnb-item">
                <div>
                    <a href="{{route("admin.inquiryIndex")}}" class="item-default">
                        문의하기
                    </a>
                </div>
            </div>
        </div>

        <div class="header-btm">
            <div class="coworkerweb_logo_Wrap">
                <img src="{{ asset('images/coworkerweb_logo.svg') }}" alt="">
            </div>
        </div>
        <form id="logout-form" action="{{ route('logout') }}" method="post">
            @csrf
            <button type="submit" class="logout-btn">
                <i class="xi-log-out"></i>
                로그아웃
            </button>
        </form>
    </div>
</div>

<script>
    $('.gnb-item').click(function () {
        $(this).toggleClass('active');
    });
</script>

```

pagination

```php
@if($paginator->lastPage() > 1)
    <div class="pagination col-group">
        {{-- 이전 페이지 --}}
        @if ($paginator->currentPage() > 1)
            <a href="{{ $paginator->appends(request()->query())->url(max(1, $paginator->currentPage() - 10)) }}" class="page-btn">
                <i class="xi-angle-left-min"></i>
            </a>
        @endif

        {{-- 현재 페이지 --}}
        @php
            $currentPage = $paginator->currentPage();
            $totalPages = $paginator->lastPage();
            $startPage = max(1, $currentPage - 5);
            $endPage = min($totalPages, $startPage + 9);
        @endphp

        @for ($pageNum = $startPage; $pageNum <= $endPage; $pageNum++)
            <a href="{{ $paginator->appends(request()->query())->url($pageNum) }}"
               class="page-btn {{ $paginator->currentPage() == $pageNum ? 'active' : '' }}">
                {{ $pageNum }}
            </a>
        @endfor

        {{-- 다음 페이지 --}}
        @if ($paginator->currentPage() < $paginator->lastPage())
            <a href="{{ $paginator->appends(request()->query())->url(min($totalPages, $paginator->currentPage() + 10)) }}" class="page-btn">
                <i class="xi-angle-right-min"></i>
            </a>
        @endif
    </div>
@endif
```

popup
-

```shell
php artisan make:migration create_popups_table --create=popups

php artisan make:model Popup

php artisan make:controller PopupController

php artisan make:request PopupRequest


php artisan make:migration add_column_to_menus --table=menus
php artisan make:migration drop_column_from_popups
```

```shell
touch resources/views/admin/popupIndex.blade.php
touch resources/views/admin/popupCreate.blade.php
touch resources/views/admin/popupEdit.blade.php
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('popups', function (Blueprint $table) { // popups 테이블 생성
            $table->id();
            $table->string('title'); // 제목
            $table->string('image'); // 이미지
            $table->string('image_name'); // 이미지 파일명
            $table->string('link')->nullable(); // 링크
            $table->date('start_date'); // 팝업 노출 시작일
            $table->date('end_date'); // 팝업 노출 종료일
            $table->timestamps();
            $table->softDeletes(); // 삭제
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('popups'); // popups 테이블 삭제
    }
};
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Popup extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['title', // 제목
        'image', // 이미지
        'image_name', // 이미지 파일명
        'link', // 링크
        'start_date', // 팝업 노출 시작일
        'end_date', // 팝업 노출 종료일
    ];

    protected $dates = ['deleted_at']; // softDelete

    public function getImageAttribute() // 이미지 경로
    {
        if (empty($this->attributes['image'])) {
            return null; // 이미지가 없으면 null 반환
        }

        return asset('storage/' . $this->attributes['image']);
    }
}

```

```php
<?php

namespace App\Http\Controllers;

use App\Models\Popup;
use App\Services\ValidationService;
class PopupController extends Controller
{
    public function __construct(Popup $popup, ValidationService $validationService) {
        parent::__construct($popup, $validationService);
    }

    protected function getValidationContext(): string {
        return 'popup';
    }
}
```

banner
-
```bash
php artisan make:migration create_banners_table --create=banners

php artisan make:controller BannerController

php artisan make:model Banner

php artisan make:migration add_column_to_banners --table=banners

php artisan make:migration drop_column_from_banners
```

```shell
touch resources/views/admin/bannerIndex.blade.php
touch resources/views/admin/bannerCreate.blade.php
touch resources/views/admin/bannerEdit.blade.php
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->text('title'); // 제목
            $table->text('content'); // 내용
            $table->string('image'); // 이미지
            $table->string('image_name'); // 이미지 파일명
            $table->string('mobile_image'); // 모바일 이미지
            $table->string('mobile_image_name'); // 모바일 이미지 파일명
            $table->timestamps();
            $table->softDeletes(); //삭제
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Banner extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['title', // 제목
        'content', // 내용
        'image', // 이미지
        'image_name', // 이미지 파일명
        'mobile_image', // 모바일 이미지
        'mobile_image_name', // 모바일 이미지 파일명
    ];

    protected $dates = ['deleted_at']; // softDelete

    public function getImageAttribute() // 이미지 경로
    {
        if (empty($this->attributes['image'])) {
            return null; // 이미지가 없으면 null 반환
        }

        return asset('storage/' . $this->attributes['image']);
    }

    public function getMobileImageAttribute() // 모바일 이미지 경로
    {
        if (empty($this->attributes['mobile_image'])) {
            return null; // 이미지가 없으면 null 반환
        }

        return asset('storage/' . $this->attributes['mobile_image']);
    }
}

```

```php
<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Services\ValidationService;

class BannerController extends Controller
{
    public function __construct(Banner $banner, ValidationService $validationService) {
        parent::__construct($banner, $validationService);
    }

    protected function getValidationContext(): string {
        return 'banner';
    }
}
```

inquiry
-
```bash
php artisan make:migration create_inquiries_table --create=inquiries

php artisan make:model Inquiry

php artisan make:controller InquiryController


php artisan make:migration add_column_to_inquiries --table=inquiries

php artisan make:migration drop_column_from_inquiries --table=inquiries
```

```shell
touch resources/views/admin/inquiryIndex.blade.php
touch resources/views/admin/inquiryEdit.blade.php
```

client
-

```bash
php artisan make:controller ClientController
```

visiotr
-

```bash
php artisan make:migration create_visitors_table --create=visitors
php artisan make:migration create_visitor_logs_table --create=visitor_logs

php artisan make:model Visitor
php artisan make:model VisitorLog

php artisan make:controller VisitorController
php artisan make:controller VisitorLogController


php artisan make:migration add_column_to_visitors --table=visitors

php artisan make:migration change_column_types_in_visiotrs_table

php artisan make:migration drop_column_from_visitors --table=visitors
```

```shell
touch resources/views/admin/visitorIndex.blade.php
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visitors', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address'); // IP
            $table->string('path')->nullable(); // 접속 경로
            $table->string('agent')->nullable(); // PC 혹은 모바일
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitors');
    }
};
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_address', // ip
        'path', // 접속 경로
        'agent', // PC 혹은 모바일
    ];

    public $searchableColumns = ['ip_address'];
}
```

```php
<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use App\Services\ValidationService;

class VisitorController extends Controller
{
    public function __construct(Visitor $visitor, ValidationService $validationService)
    {
        parent::__construct($visitor, $validationService);
    }
}
```

```php
// 2024_10_08_070752_drop_column_from_visitors.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('visitors', function (Blueprint $table) {
            $table->dropColumn('browser');
            $table->renameColumn('os', 'agent');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('visitors', function (Blueprint $table) {
            //
        });
    }
};
```

member
-

```bash
php artisan make:migration create_members_table --create=members

php artisan make:controller EditorController

php artisan make:model Editor

php artisan make:migration add_column_to_members --table=members

php artisan make:migration drop_column_from_members
```

```shell
touch resources/views/admin/memberIndex.blade.php
touch resources/views/admin/memberCreate.blade.php
touch resources/views/admin/memberEdit.blade.php
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // 이름
            $table->string('department'); // 분야
            $table->string('rank'); // 직급
            $table->text('content'); // 핵심역량
            $table->string('image')->nullable(); // 이미지
            $table->string('image_name')->nullable(); // 이미지 파일명
            $table->timestamps();
            $table->softDeletes(); //삭제
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};

```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'rank', // 직급
        'name', // 이름
        'department', // 분야
        'content', // 핵심역량
        'image', // 이미지
        'image_name' // 이미지 파일명
    ];

    protected $dates = ['deleted_at']; // softDelete

    public function getImageAttribute() // 이미지 경로
    {
        if (empty($this->attributes['image'])) {
            return null; // 이미지가 없으면 null 반환
        }

        return asset('storage/' . $this->attributes['image']);
    }
}

```

```php
<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Services\ValidationService;

class MemberController extends Controller
{
    public function __construct(Member $member, ValidationService $validationService)
    {
        parent::__construct($member, $validationService);
    }

    protected function getValidationContext(): string
    {
        return 'member';
    }
}

```


blcok
-

```bash
php artisan make:migration create_blocks_table --create=blocks

php artisan make:model Block

php artisan make:controller BlockController

php artisan make:middleware BlockMiddleware


php artisan make:migration add_column_to_blocks --table=blocks

php artisan make:migration change_column_types_in_blocks_table

php artisan make:migration drop_column_from_blocks --table=blocks
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blocks', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address'); // IP
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blocks');
    }
};


```

```php
<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_address', // ip
    ];

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y.m.d');
    }
}

```

```php
<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Services\ValidationService;
use Illuminate\Http\Request;

class BlockController extends Controller
{
    public function __construct(Block $block, ValidationService $validationService)
    {
        parent::__construct($block, $validationService);
    }

    public function index(Request $request) {
        $items = Block::all();
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ip_address' => 'required',
        ]);

        if (Block::where('ip_address', $request->ip_address)->exists()) {
            return redirect()->back()->with('error', '이미 차단된 IP입니다.');
        }

        Block::create([
            'ip_address' => $request->ip_address,
        ]);

        return redirect()->back()->with('success', 'IP가 차단되었습니다.');
    }

    public function destroy($id)
    {
        try {
            $block = Block::findOrFail($id);
            $block->delete();

            return response()->json([
                'success' => true,
                'message' => 'IP 차단이 해제되었습니다.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'IP 차단 해제 중 오류가 발생했습니다.'
            ], 500);
        }
    }
}

```

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class BlockMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next)
    {
        $clientIp = $request->ip();

        $blockedIps = DB::table('blocks')->pluck('ip_address')->toArray();

        if (in_array($clientIp, $blockedIps)) {
            abort(403, '접근이 차단되었습니다.'); // 403 Forbidden 응답
        }

        return $next($request);
    }
}

```


```html
<!DOCTYPE html>
<html lang="ko">
@include('admin.components.head')
<body>
<div id="wrap">
    <div class="admin-container">
        <header id="header">
            @include('admin.components.snb')
        </header>
        <div class="admin-wrap">
            @if(session('error'))
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <ul>
                        <li>{{ session('error') }}</li>
                    </ul>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            @endif

            <div class="title-wrap col-group">
                <div class="main-title-wrap col-group">
                    <h2 class="main-title">
                        방문자 집계
                    </h2>
                </div>
            </div>
            <div class="dashboard-section-wrap row-group">
                <div class="dashboard-item-group col-group">
                    <div class="dashboard-item">
                        <p class="item-title"> 금일 방문자 </p>
                        <div class="item-txt"> {{ $visitorCounts['todayVisitors'] }} </div>
                    </div>
                    <div class="dashboard-item">
                        <p class="item-title"> PC </p>
                        <div class="item-txt"> {{ $visitorCounts['todayVisitorsPC'] }}% </div>
                    </div>
                    <div class="dashboard-item">
                        <p class="item-title"> MOBILE </p>
                        <div class="item-txt"> {{ $visitorCounts['todayVisitorsMobile'] }}% </div>
                    </div>
                </div>
                <div class="dashboard-section">
                    <div class="dashboard-section-title-wrap col-group">
                        <div class="title-group row-group">
                            <p class="title"> 누적 방문자 </p>
                            <p class="txt">
                                동일한 PC에서 하루에 여러번 방문해도 1회로 체크됩니다. <br>
                                (단 해당 PC 에 쿠키로 정보를 남기는데 쿠키가 삭제되면 그날 처음 들어온 걸로 간주해서 방문자수가 증가합니다. )
                            </p>
                        </div>
                        <div class="top-btn-wrap col-group">
                            <form action="{{route("admin.visitorIndex")}}" method="get">
                                <div class="form-group">
                                    <label for="timeframe">기간 선택</label>
                                    <select name="timeframe" id="timeframe" class="form-control" onchange="this.form.submit()">
                                        <option value="weekly" {{ request('timeframe') == 'weekly' ? 'selected' : '' }}>주간</option>
                                        <option value="monthly" {{ request('timeframe') == 'monthly' ? 'selected' : '' }}>월간</option>
                                        <option value="yearly" {{ request('timeframe') == 'yearly' ? 'selected' : '' }}>연간</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="chart-wrap">
                        <canvas id="chart"></canvas>
                    </div>
                </div>
                <div class="dashboard-section">
                    <div class="dashboard-section-title-wrap col-group">
                        <div class="title-group col-group">
                            <p class="title">
                                방문자 상세 정보
                            </p>
                            <button class="btn">
                                IP 차단
                            </button>
                        </div>
                        <div class="top-btn-wrap col-group">
                            <form action="{{route("admin.visitorIndex")}}" method="get">
                                <div class="search-wrap col-group">
                                    <input type="date" name="start_date" class="search-input search-input-date" value="{{ old('start_date', $startDate) }}">
                                    -
                                    <input type="date" name="end_date" class="search-input search-input-date" value="{{ old('end_date', $endDate) }}">
                                    <div class="search-input-wrap col-group">
                                        <input type="text" name="search" class="search-input" placeholder="IP" value="{{ old('search', $search) }}">
                                        <button type="submit" class="search-btn">
                                            <i class="xi-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="admin-table-wrap">
                        <table class="admin-table">
                            <colgroup>
                                <col width="15%">
                                <col width="15%">
                                <col width="55%">
                                <col width="15%">
                            </colgroup>
                            <thead class="admin-thead">
                            <tr class="admin-tr">
                                <th class="admin-th"> 접속일자 </th>
                                <th class="admin-th"> IP </th>
                                <th class="admin-th"> 접속 URL </th>
                                <th class="admin-th"> 접속기기 </th>
                            </tr>
                            </thead>
                            @if(!$items->isEmpty())
                            <tbody class="admin-tbody">
                            @foreach($items as $key => $item)
                            <tr class="admin-tr">
                                <td class="admin-td"> {{ $item->created_at }} </td>
                                <td class="admin-td"> {{ $item->ip_address }} </td>
                                <td class="admin-td"> {{ $item->path }} </td>
                                <td class="admin-td"> {{ $item->agent }} </td>
                            </tr>
                            @endforeach
                            @else
                            <tr> <!-- 검색 내용이 없을 때 -->
                                <td colspan="9">
                                    <p class="null-txt">
                                        방문자 상세 정보가 없습니다.
                                    </p>
                                </td>
                            </tr>
                            @endif
                            </tbody>
                        </table>
                        @include('admin.components.pagination', ['paginator' => $items])
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>

{{--IP 차단 팝업--}}
<div class="w-modal" id="ipBlockModal" style="display: none;">
    <div class="w-modal-content dashboard-section admin-wrap">
        <button class="close">
            <i class="xi-close"></i>
        </button>
        <div class="dashboard-section-title-wrap col-group">
            <div class="title-group row-group">
                <p class="title">
                    IP 차단
                </p>
                <form action="{{ route('admin.blockStore') }}" method="post">
                    @csrf
                <div class="search-wrap col-group">
                    <input type="text" name="ip_address" class="form-input" placeholder="IP를 입력하세요" oninput="this.value = this.value.replace(/[^0-9.]/g, '');" />
                    <button class="btn">
                        차단하기
                    </button>
                </div>
                </form>
            </div>
        </div>
        <div class="admin-table-wrap">
            <table class="admin-table">
                <colgroup>
                    <col width="20%">
                    <col width="70%">
                    <col width="10%">
                </colgroup>
                <thead class="admin-thead">
                <tr class="admin-tr">
                    <th class="admin-th">차단일</th>
                    <th class="admin-th">IP</th>
                    <th class="admin-th">관리</th>
                </tr>
                </thead>
                <tbody class="admin-block-tbody">
                </tbody>
            </table>
            <div id="pagination"></div>
        </div>
    </div>
</div>

<script src="/js/jquery.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
<script src="/js/script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js"></script>

<script> /*페이지네이션*/
    function updatePageCount() {
        var pageCount = document.getElementById('pageCount').value;
        window.location.href = '?perPage=' + pageCount;
    }
</script>
<script> /*접속자 집계*/
    let visitorCounts = @json($visitorCounts);
    let accumulationVisitors = @json($accumulationVisitors);

    let timeframe = '{{ request('timeframe', 'weekly') }}';
    let labels = [];
    let visitorsData = [];

    if (timeframe === 'weekly') {
        // 현재 주간 범위의 모든 날짜 생성
        let startOfWeek = moment().startOf('week');
        let endOfWeek = moment().endOf('week');
        let dateRange = [];
        for (let date = startOfWeek.clone(); date.isSameOrBefore(endOfWeek); date.add(1, 'days')) {
            dateRange.push(date.format('YYYY-MM-DD'));
        }

        let visitorsByDate = {};
        accumulationVisitors[timeframe].forEach(item => {
            visitorsByDate[item.visit_date] = item.total; // 데이터가 있는 날짜
        });

        // 라벨과 방문자 수 데이터 초기화, 데이터가 없는 경우 0으로 채움
        labels = dateRange;
        visitorsData = labels.map(date => visitorsByDate[date] || 0);
    } else if (timeframe === 'monthly') {
        let startOfMonth = moment().startOf('month');
        let months = [];

        // 지난 6개월의 월 생성
        for (let i = 0; i < 6; i++) {
            months.push(startOfMonth.clone().subtract(i, 'months').format('YYYY-MM'));
        }
        months.reverse(); // 월 역순 정렬

        let monthlyData = accumulationVisitors['monthly'] || [];
        let visitorsByMonth = {};
        monthlyData.forEach(item => {
            visitorsByMonth[item.visit_month] = item.total;
        });

        // 라벨과 방문자 수 데이터 초기화, 데이터가 없는 경우 0으로 채움
        labels = months;
        visitorsData = labels.map(month => visitorsByMonth[month] || 0);
    } else if (timeframe === 'yearly') {
        let startOfYear = moment().startOf('year');
        let years = [];

        // 지난 5년의 연도 생성
        for (let i = 0; i < 5; i++) {
            years.push(startOfYear.clone().subtract(i, 'years').format('YYYY'));
        }
        years.reverse(); // 연도 역순 정렬

        let yearlyData = accumulationVisitors['yearly'] || [];
        let visitorsByYear = {};
        yearlyData.forEach(item => {
            visitorsByYear[item.visit_year] = item.total;
        });

        // 라벨과 방문자 수 데이터 초기화, 데이터가 없는 경우 0으로 채움
        labels = years;
        visitorsData = labels.map(year => visitorsByYear[year] || 0);
    } else {
        console.warn('선택한 기간에 대한 데이터가 없습니다:', timeframe);
    }

    const ctx = document.getElementById('chart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '방문자',
                    data: visitorsData,
                    borderColor: '#2f83f7',
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    pointRadius: 6,
                    pointBorderWidth: 4,
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    type: 'category', // x축이 범주형 데이터일 경우 설정
                    offset: true, // 데이터 포인트 간에 여백 추가
                    ticks: {
                        font: {
                            size: 16,
                            weight: 600,
                            family: 'Pretendard'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 14,
                            family: 'Pretendard',
                        },
                        stepSize: 100
                    },
                },
            },
        },
    });
</script>
<script> /*IP 차단*/
    $(document).ready(function() {
        // 모달 열기
        $('.btn:contains("IP 차단")').on('click', function() {
            $('#ipBlockModal').show();
            loadBlockedIps(); // 차단된 IP 목록 로드
        });

        // x 버튼 클릭 -> 모달 닫기
        $('.w-modal .close').on('click', function() {
            $('#ipBlockModal').hide();
        });

        // 차단된 IP 목록 로드
        function loadBlockedIps() {
            $.ajax({
                url: "{{ route('admin.blockIndex') }}", // 엔드포인트 호출
                method: 'GET',
                success: function(data) {
                    renderBlockedIps(data);
                },
                error: function(xhr) {
                    console.error('IP 차단 목록을 불러오는 데 오류가 발생했습니다.', xhr);
                }
            });
        }

        // 차단된 IP 목록을 테이블에 렌더링
        function renderBlockedIps(blockedIps) {
            const tbody = $('.admin-block-tbody').empty(); // 기존 테이블 내용 비우기

            if (blockedIps.length === 0) {
                tbody.append(`
                    <tr>
                        <td colspan="3">
                            <p class="null-txt">IP 차단 내역이 없습니다.</p>
                        </td>
                    </tr>
                `);
            } else {
                blockedIps.forEach(ip => {
                    tbody.append(`
                        <tr class="admin-tr">
                            <td class="admin-td">${ip.created_at}</td>
                            <td class="admin-td">${ip.ip_address}</td>
                            <td class="admin-td">
                                <div class="btn-wrap">
                                    <button class="btn del-btn" data-id="${ip.id}">삭제</button>
                                </div>
                            </td>
                        </tr>
                    `);
                });
            }
        }

        // 삭제 버튼 클릭 이벤트
        $(document).on('click', '.del-btn', function() {
            const blockId = $(this).data('id');
            if (confirm(`정말로 이 IP를 차단 해제하시겠습니까?`)) {
                $.ajax({
                    url: `/admin/block/destroy/${blockId}`, // 차단된 IP 삭제 엔드포인트
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // CSRF 토큰
                    },
                    success: function(response) {
                        if (response.success) {
                            alert(response.message);
                            loadBlockedIps(); // 목록 다시 로드
                        } else {
                            alert('차단 해제 중 오류가 발생했습니다.');
                        }
                    },
                    error: function(xhr) {
                        console.error('IP 삭제 중 오류가 발생했습니다.', xhr);
                        alert('IP 삭제에 실패했습니다.');
                    }
                });
            }
        });
    });
</script>
</html>
```

locale
-
```bash


php artisan make:controller LanguageController

php artisan make:middleware LocaleMiddleware

```

announcement
-

```bash
php artisan make:migration create_announcements_table --create=announcements

php artisan make:controller AnnouncementController

php artisan make:model Announcement

```

```shell
touch resources/views/admin/announcementIndex.blade.php
touch resources/views/admin/announcementCreate.blade.php
touch resources/views/admin/announcementEdit.blade.php
```

css
-

```bash
mkdir public/css
mkdir public/css/admin

mkdir public/js

```


history
-

```bash
php artisan make:migration create_histories_table --create=histories

php artisan make:controller HistoryController

php artisan make:model History

php artisan make:migration add_column_to_members --table=members

php artisan make:migration drop_column_from_members
```

```shell
touch resources/views/admin/historyIndex.blade.php
touch resources/views/admin/historyCreate.blade.php
touch resources/views/admin/historyEdit.blade.php
```



```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('histories', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('histories');
    }
};
```