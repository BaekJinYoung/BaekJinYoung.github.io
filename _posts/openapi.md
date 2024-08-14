```bash
composer require --dev knuckleswtf/scribe

php artisan vendor:publish --provider="Knuckles\Scribe\ScribeServiceProvider"

php artisan scribe:generate

```

ubuntu@ip-172-31-15-22:~/laravel$ composer require --dev knuckleswtf/scribe
./composer.json is not writable.

```bash
sudo chmod 664 composer.json
```

ubuntu@ip-172-31-15-22:~/laravel$ php artisan vendor:publish --provider="Knuckles\Scribe\ScribeServiceProvider"

INFO  No publishable resources for tag [].  

```bash
composer show knuckleswtf/scribe
```

ubuntu@ip-172-31-15-22:~/laravel$ composer show knuckleswtf/scribe

In ShowCommand.php line 324:

Package "knuckleswtf/scribe" not found, try using --available (-a) to show all available packages.


show [--all] [--locked] [-i|--installed] [-p|--platform] [-a|--available] [-s|--self] [-N|--name-only] [-P|--path] [-t|--tree] [-l|--latest] [-o|--outdated] [--ignore IGNORE] [-M|--major-only] [-m|--minor-only] [--patch-only] [-A|--sort-by-age] [-D|--direct] [--strict] [-f|--format FORMAT] [--no-dev] [--ignore-platform-req IGNORE-PLATFORM-REQ] [--ignore-platform-reqs] [--] [<package> [<version>]]

```bash
composer require --dev knuckleswtf/scribe
```

ubuntu@ip-172-31-15-22:~/laravel$ composer require --dev knuckleswtf/scribe
./composer.json is not writable.

```bash
sudo chown $USER:$USER composer.json
```

ubuntu@ip-172-31-15-22:~/laravel$ composer require --dev knuckleswtf/scribe
./composer.json has been updated
Running composer update knuckleswtf/scribe
Loading composer repositories with package information
Updating dependencies
Nothing to modify in lock file

Installation failed, reverting ./composer.json and ./composer.lock to their original content.

In RequireCommand.php line 646:

file_put_contents(./composer.lock): Failed to open stream: Permission denied


require [--dev] [--dry-run] [--prefer-source] [--prefer-dist] [--prefer-install PREFER-INSTALL] [--fixed] [--no-suggest] [--no-progress] [--no-update] [--no-install] [--no-audit] [--audit-format AUDIT-FORMAT] [--update-no-dev] [-w|--update-with-dependencies] [-W|--update-with-all-dependencies] [--with-dependencies] [--with-all-dependencies] [--ignore-platform-req IGNORE-PLATFORM-REQ] [--ignore-platform-reqs] [--prefer-stable] [--prefer-lowest] [-m|--minimal-changes] [--sort-packages] [-o|--optimize-autoloader] [-a|--classmap-authoritative] [--apcu-autoloader] [--apcu-autoloader-prefix APCU-AUTOLOADER-PREFIX] [--] [<packages>...]

```bash
sudo chmod -R 775 ~/laravel
```

ubuntu@ip-172-31-15-22:~/laravel$ composer require --dev knuckleswtf/scribe
./composer.json has been updated
Running composer update knuckleswtf/scribe
Loading composer repositories with package information
Updating dependencies
Nothing to modify in lock file

Installation failed, reverting ./composer.json and ./composer.lock to their original content.

In RequireCommand.php line 646:

file_put_contents(./composer.lock): Failed to open stream: Permission denied


require [--dev] [--dry-run] [--prefer-source] [--prefer-dist] [--prefer-install PREFER-INSTALL] [--fixed] [--no-suggest] [--no-progress] [--no-update] [--no-install] [--no-audit] [--audit-format AUDIT-FORMAT] [--update-no-dev] [-w|--update-with-dependencies] [-W|--update-with-all-dependencies] [--with-dependencies] [--with-all-dependencies] [--ignore-platform-req IGNORE-PLATFORM-REQ] [--ignore-platform-reqs] [--prefer-stable] [--prefer-lowest] [-m|--minimal-changes] [--sort-packages] [-o|--optimize-autoloader] [-a|--classmap-authoritative] [--apcu-autoloader] [--apcu-autoloader-prefix APCU-AUTOLOADER-PREFIX] [--] [<packages>...]

```bash
sudo chown $USER:$USER composer.json composer.lock
sudo chown -R $USER:$USER ~/laravel
```



