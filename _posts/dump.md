```bash
mysqldump -u root -p usujodal announcements > announcements_dump.sql

mysql -u root -p usujodal < announcements.sql

mysql -u root -p usujodal < files.sql

```

```sql
ALTER TABLE `my_database`.`g5_write_6010` DROP COLUMN `wr_facebook_user`;


RENAME TABLE `g5_write_6010` TO `g5_write_2024`;

       
use usujodal;

SET SQL_SAFE_UPDATES = 0;

UPDATE announcements AS g
    JOIN g5_write_6010 AS a
ON g.title = a.title
    SET
        g.views = a.views,
        g.created_at = a.created_at,
        g.updated_at = a.updated_at
WHERE g.title = a.title;

SET SQL_SAFE_UPDATES = 1;

```