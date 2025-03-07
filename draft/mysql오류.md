Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.

```sql
-- 세션 내에서만 안전 모드를 비활성화
SET SQL_SAFE_UPDATES = 0;

-- 모든 데이터를 삭제
DELETE FROM 테이블명;

-- 안전 모드 복구 (선택 사항)
SET SQL_SAFE_UPDATES = 1;

```


SQLSTATE[HY000]: General error: 1030 Got error 168 - 'Unknown (generic) err  
out:   or from engine' from storage engine (Connection: mysql, SQL: ALTER TABLE re  
out:   views MODIFY filter_category INT NULL;)                                      
out:                                                                                
out: In Connection.php line 571:
out:                                                                                
out:   SQLSTATE[HY000]: General error: 1030 Got error 168 - 'Unknown (generic) err  
out:   or from engine' from storage engine    


```bash
sudo tail -n 50 /var/log/mysql/error.log
```


2024-08-08T06:35:07.430538Z 0 [ERROR] [MY-012592] [InnoDB] Operating system error number 13 in a file operation.
2024-08-08T06:35:07.430580Z 0 [ERROR] [MY-012595] [InnoDB] The error means mysqld does not have the access rights to the directory.
2024-08-08T06:35:07.430592Z 0 [ERROR] [MY-012894] [InnoDB] Unable to open './#innodb_redo/#ib_redo6' (error: 1000).

```bash
sudo chown -R mysql:mysql /var/lib/mysql
sudo chmod -R 755 /var/lib/mysql
```