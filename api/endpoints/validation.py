"""Collection of methods used for input validation."""
import base64


def validate_person_data(value):
    validators = {
        'firstName': validate_string,
        'lastName': validate_string,
    }

    return validate(value, validators)


def validate_children_data(value):
    if not validate_list(value):
        return False

    for child in value:
        if not validate_person_data(child):
            return False

    return True


def validate_signature(value):
    try:
        return base64.b64encode(base64.b64decode(value.split(',')[1])) == bytes(value.split(',')[1], encoding=ascii)
    except:
        print("Expected base64, got something else")
        return False


def validate_accept(_value):
    """
    Validate any input.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True for any input type
    """
    return True


def validate_boolean(value):
    """
    Validate a boolean input.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has type boolean
    """
    return isinstance(value, bool)


def validate_int(value):
    """
    Validate an int input.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has type int
    """
    return isinstance(value, int)


def validate_float(value):
    """
    Validate a float input.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has type float or int
    """
    return isinstance(value, (float, int))


def validate_string(value):
    """
    Validate a string input.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has type string
    """
    return isinstance(value, str)


def validate_email(value):
    """
    Validate an email input.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has email format
    """
    return isinstance(value, str) and len(value.split('@')) == 2


def validate_list(value):
    """
    Validate a list input.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value is a list
    """
    return isinstance(value, list)


def validate(data, validators):
    """
    Validates data object based on types (methods) specified in validators.
    Removes redundant keys. Sets value to none for keys present in validators but not in data
    :param data: incoming data
    :param validators: key value dict specifying data type of values
    :return: None if there was an error, else data.
    """
    not_required_keys = []
    if not data:
        return None
    for key in validators.keys():
        if key not in data:
            return None
    for key, value in data.items():
        if key not in validators.keys():
            print("(WARNING) key:{} not in validators, "
                  "therefore removing it from data.".format(key))
            not_required_keys.append(key)
        elif not validators[key](value) and value is not None:
            print("key:{}, value: {} is not valid!".format(key, value))
            return None

    for key in not_required_keys:
        data.pop(key, None)
    return data


def read_form_data(request):
    """
    Returns the request's form data as a dictionary, both in `request.form`
    and `request.files`. Importantly, it also ensures through the file_keys
    list that form data expected to be sent as a file, does not appear as
    a form key-value pair.
    """
    data = {}
    if request.json:
        data.update(request.json)
    if request.form.to_dict():
        data.update(request.form.to_dict())

    data.update(request.files.to_dict())
    if bool(data):
        return data

    return None
