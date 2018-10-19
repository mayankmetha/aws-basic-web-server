
One Time setup:
    Install AWS ClI (https://aws.amazon.com/cli/)
    Configure AWS CLI. Provide the region as "ap-south-1", output as json. The access code and id are available from the AWS Console.
    Install JDK version 6+ (Preferrably 8+)
    Download and install local instance of DynamoDB (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
    Start the DynamoDB instance (Navigate to the location installed, and run java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb)
    Run "setup-dynamodb.bat" to create the table, and load the sample entries from the JSON file "db"

Accessing Ubuntu Instance:
Check details here to SSH to the VM: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html
VM IP: ec2-13-233-103-153.ap-south-1.compute.amazonaws.com
Username: ubuntu
Cmd: ssh -i <private key> ubuntu@ec2-13-233-103-153.ap-south-1.compute.amazonaws.com