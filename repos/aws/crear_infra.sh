
aws dynamodb create-table --cli-input-json file://"/repos/aws/infra_local/portalcontenidos-auth.json" --endpoint-url http://localhost:4566




aws dynamodb create-table --cli-input-json file://"/repos/aws/infra_local/portalcontenidos-audit.json" --endpoint-url http://localhost:4566


aws sqs create-queue --queue-name portal-contenidos-audit-sqs-fifo.fifo --attributes FifoQueue=true,ContentBasedDeduplication=true,VisibilityTimeout=9000 --endpoint-url http://localhost:4566



aws dynamodb update-time-to-live --table-name portalcontenidos-auth --time-to-live-specification "Enabled=true, AttributeName=expirationTime" --endpoint-url http://localhost:4566


aws --endpoint-url=http://localhost:4566 secretsmanager create-secret --name portal-contenidos-portalSecret  --description "Portal contenidos secrets manager" --secret-string file://"C:\repos\aws\SecretsManager\PortalContenidosSecretsManager.json"


aws --endpoint-url http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/queue/portal-contenidos-audit-sqs-fifo.fifo --wait-time-seconds 10

aws --profile=default --endpoint-url=http://localhost:4566 s3 mb s3://mytestbucket
aws --profile=default --endpoint-url=http://localhost:4566 s3 cp "C:\repos\cert\dev\s3-updated\truststore.jks"  s3://mytestbucket