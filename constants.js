module.exports = {
    // Missing field
    ERROR_MISSING_FIELD_USERNAME: 'Missed mandatory \'username\' field in the request',
    ERROR_MISSING_FIELD_PASSWORD: 'Missed mandatory \'password\' field in the request',
    ERROR_MISSING_FIELD_DEVICEID: 'Missed mandatory \'deviceId\' field in the request',
    ERROR_MISSING_FIELD_CHILDID: 'Missed mandatory \'childId\' field in the request',
    ERROR_MISSING_FIELD_POLLVALUE: 'Missed mandatory \'pollutionValue\' field in the request',
    ERROR_MISSING_FIELD_GPSLAT: 'Missed mandatory \'gpsLat\' field in the request',
    ERROR_MISSING_FIELD_GPSLONG: 'Missed mandatory \'gpsLong\' field in the request',
    ERROR_MISSING_FIELD_TIMESTAMP: 'Missed mandatory \'timeStamp\' field in the request',

    // Invalid field
    ERROR_INVALID_FIELD_TIMESTAMP :  'Filed \'timeStamp\' is not a valid ISO date format',
    ERROR_USERNAME_ALREADY_EXISTS :  'Username already exists',
    ERROR_USERNAME_NOT_EXIST :  'The given username does not exist',
    ERROR_DEVICE_ALREADY_PAIRED :  'The wearable device is already paired with a child',
    ERROR_CHILDID_NOT_EXIST :  'The given childId does not exist for parent ',
    ERROR_INVALID_FIELD_BIRTHDATE :  'The given birthDate is not a valid date format',

    // Success messages
    SUCCESS_GENERAL: 'Successful operation',
    SUCCESS_USER_ADDED : 'User added successfully',
    SUCCESS_EVENT_ADDED : 'Event added successfully',
    SUCCESS_CHILD_ADDED : 'Child added successfully to the parent ',
    SUCCESS_CHILD_REMOVED : 'Child removed successfully from the parent ',
    SUCCESS_USER_REMOVED : 'User removed successfully'
};