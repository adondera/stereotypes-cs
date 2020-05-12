from typing import List


def validate_accept(value):
    return True


def validate_boolean(value):
    return isinstance(value, bool)


def validate_int(value):
    return isinstance(value, int)


def validate_float(value):
    return isinstance(value, float) or isinstance(value, int)


def validate_string(value):
    return isinstance(value, str)


def validate_email(value):
    return isinstance(value, str) and len(value.split('@')) == 2


def validate_list(value):
    return isinstance(value, list)


def validate(data, validators):
    not_required_keys = []
    if not data:
        return None
    for key in validators.keys():
        if key not in data:
            data.update({key: None})
    for key, value in data.items():
        if key not in validators.keys():
            print("(WARNING) key:{} not in validators, therefore removing it from data.".format(key))
            not_required_keys.append(key)
        elif not validators[key](value) and value is not None:
            print("key:{}, value: {} is not valid!".format(key, value))
            return None

    for key in not_required_keys:
        data.pop(key, None)
    return data


def read_form_data(request, file_keys: List[str] = []) -> dict:
    """Returns the request's form data as a dictionary, both in `request.form`
       and `request.files`. Importantly, it also ensures through the file_keys
       list that form data expected to be sent as a file, does not appear as
       a form key-value pair.
    """
    data = {}
    if request.json:
        data.update(request.json)
    if request.form.to_dict():
        data.update(request.form.to_dict())

    # for file_key in file_keys:
    #     data.pop(file_key, None) # should not be there as form val

    data.update(request.files.to_dict())
    if bool(data):
        return data
    return None
