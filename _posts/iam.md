sudo nano /var/log/syslog


```bash
2024-09-01T00:37:41.768740+00:00 ip-172-31-1-144 amazon-ssm-agent.amazon-ssm-agent[526]: 2024-09-01 00:37:41 WARN EC2RoleProvider Failed to connect to Systems Manager with instance profile role credentials. Err: retrieved credentials failed to report to ssm. Error: EC2RoleRequestError: no EC2 instance role found
2024-09-01T00:37:41.772123+00:00 ip-172-31-1-144 amazon-ssm-agent.amazon-ssm-agent[526]: caused by: RequestError: send request failed
2024-09-01T00:37:41.772233+00:00 ip-172-31-1-144 amazon-ssm-agent.amazon-ssm-agent[526]: caused by: Get "http://169.254.169.254/latest/meta-data/iam/security-credentials/": dial tcp 169.254.169.254:80: connect: network is unreachable
2024-09-01T00:37:41.883425+00:00 ip-172-31-1-144 amazon-ssm-agent.amazon-ssm-agent[526]: 2024-09-01 00:37:41 ERROR [TokenRequestService] failed to retrieve instance identity role. Error: EC2MetadataError: failed to get IMDSv2 token and fallback to IMDSv1 is disabled
2024-09-01T00:37:41.883495+00:00 ip-172-31-1-144 amazon-ssm-agent.amazon-ssm-agent[526]: caused by: :
2024-09-01T00:37:41.883539+00:00 ip-172-31-1-144 amazon-ssm-agent.amazon-ssm-agent[526]: #011status code: 0, request id:
2024-09-01T00:37:41.883563+00:00 ip-172-31-1-144 amazon-ssm-agent.amazon-ssm-agent[526]: caused by: RequestError: send request failed
2024-09-01T00:37:41.883583+00:00 ip-172-31-1-144 amazon-ssm-agent.amazon-ssm-agent[526]: caused by: Put "http://169.254.169.254/latest/api/token": dial tcp 169.254.169.254:80: connect: network is unreachable
2024-09-01T00:37:41.983866+00:00 ip-172-31-1-144 amazon-ssm-agent.amazon-ssm-agent[526]: 2024-09-01 00:37:41 ERROR EC2RoleProvider Failed to connect to Systems Manager with SSM role credentials. error calling RequestManagedInstanceRoleToken: unable to build RSA signature. No Authorization header in request
```

```bash
sudo apt-get update
sudo apt-get install -y software-properties-common
sudo add-apt-repository "deb [arch=amd64] https://s3.amazonaws.com/amazon-ssm-region-$(curl -s http://169.254.169.254/latest/meta-data/placement/region)/amazon-ssm-agent/ubuntu/amd64/ stable main"

sudo apt-get update

sudo systemctl status snap.amazon-ssm-agent.amazon-ssm-agent.service

sudo snap start amazon-ssm-agent

```

https://brunch.co.kr/@topasvga/618
https://luminousolding.tistory.com/122
https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent-status-and-restart.html