env
```php
SOLAPI_API_KEY=your_api_key
SOLAPI_API_SECRET=your_api_secret
```

config/services.php
```php
return [
    'solapi' => [
        'api_key' => env('SOLAPI_API_KEY'),
        'api_secret' => env('SOLAPI_API_SECRET'),
        'sender' => '발신번호',  // 실제 발신번호를 입력
    ],
];

```


```shell
mkdir app/Services
touch app/Services/SolapiService.php
```


인증 코드 모델 및 마이그레이션 생성

```bash
php artisan make:model VerificationCode -m
```

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('verification_codes', function (Blueprint $table) {
            $table->id();
            $table->string('phone_number')->index();
            $table->string('code');
            $table->timestamp('expires_at');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('verification_codes');
    }
};

```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class VerificationCode extends Model
{
    use HasFactory;

    protected $fillable = ['phone_number', 'code', 'expires_at'];

    public function isExpired()
    {
        return Carbon::now()->gt($this->expires_at);
    }
}

```

컨트롤러

```bash
php artisan make:controller Auth\VerificationController
```

```php
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\VerificationCode;
use App\Services\SolapiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class VerificationController extends Controller
{
    protected $solapiService;

    public function __construct(SolapiService $solapiService)
    {
        $this->solapiService = $solapiService;
    }

    /**
     * 휴대폰 인증 코드 전송
     */
    public function sendCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone_number' => 'required|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $phoneNumber = $request->phone_number;
        $code = rand(100000, 999999);

        // 기존 코드 삭제
        VerificationCode::where('phone_number', $phoneNumber)->delete();

        // 인증 코드 저장
        VerificationCode::create([
            'phone_number' => $phoneNumber,
            'code' => $code,
            'expires_at' => Carbon::now()->addMinutes(10),
        ]);

        // SMS 전송
        $result = $this->solapiService->sendSMS($phoneNumber, "인증 코드: {$code}");

        if ($result !== true) {
            return response()->json(['error' => 'SMS 전송 실패', 'details' => $result], 500);
        }

        return response()->json(['message' => '인증 코드가 전송되었습니다.']);
    }

    /**
     * 인증 코드 확인
     */
    public function verifyCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone_number' => 'required|string|max:15',
            'code' => 'required|string|max:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $verificationCode = VerificationCode::where('phone_number', $request->phone_number)
            ->where('code', $request->code)
            ->first();

        if (!$verificationCode) {
            return response()->json(['error' => '유효하지 않은 코드입니다.'], 400);
        }

        if ($verificationCode->isExpired()) {
            return response()->json(['error' => '인증 코드가 만료되었습니다.'], 400);
        }

        // 인증 성공 후 코드 삭제
        $verificationCode->delete();

        return response()->json(['message' => '인증 성공!']);
    }
}

```

라우트
```php
use App\Http\Controllers\Auth\VerificationController;

Route::post('/send-code', [VerificationController::class, 'sendCode']);
Route::post('/verify-code', [VerificationController::class, 'verifyCode']);

```