
One Time setup:
    Install AWS ClI (https://aws.amazon.com/cli/)
    Install JDK version 6+ (Preferrably 8+)
    Download and install local instance of DynamoDB (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
    Start the DynamoDB instance (Navigate to the location installed, and run java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb)
    Run "setup-dynamodb.bat" to create the table, and load the sample entries from the JSON file "db"

