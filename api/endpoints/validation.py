"""Collection of methods used for input validation."""
import base64
import re

email_regex = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")


def validate_answers(answers):
    """
    Validate a JSON input for test answers.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has the format required for posting test answers
    """

    if not validate_list(answers):
        return False

    for answer in answers:
        if not (validate_answer(answer.copy())
                or validate_open_answer(answer.copy())
                or validate_not_binary(answer.copy())):
            print("Answer is not valid: {}".format(answer))
            return False

    return True


def validate_not_binary(value):
    """
    Validate a JSON input for non binary question type answer.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has the format required for non binary question answer
    """

    validators = {
        "participant_id": validate_int,
        "question_id": validate_int,
        "answers": validate_accept,
        "before_video": validate_boolean
    }

    return validate(value, validators)


def validate_open_answer(value):
    """
    Validate a JSON input for open question answer type.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has the format required for open answers
    """

    validators = {
        "participant_id": validate_int,
        "question_id": validate_int,
        "open_answer": validate_string,
        "before_video": validate_boolean
    }

    return validate(value, validators)


def validate_answer(value):
    """
    Validate a JSON input for a single answer.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has the format required for an answer
    """

    validators = {
        "participant_id": validate_int,
        "question_id": validate_int,
        "img_id": validate_string,
        "answers": validate_accept,
        "response_time": validate_int,
        "before_video": validate_boolean
    }

    return validate(value, validators)


def validate_dissemination_answers(answers):
    """
    Validate a JSON input for answers for dissemination app.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has the format required for posting answers
    """

    if not validate_list(answers):
        return False

    for answer in answers:
        if not validate_dissemination_answer(answer):
            print("Answer is not valid: {}".format(answer))
            return False

    return True


def validate_dissemination_answer(value):
    """
    Validate a JSON input for a single answer for dissemination app.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has the format required for an answer
    """

    validators = {
        "question_id": validate_int,
        "block_nr": validate_int,
        "response_time": validate_int
    }

    return validate(value, validators)


def validate_person_data(value):
    """
    Validate a JSON input for person data.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has the format required for posting person data
    """

    validators = {
        'firstName': validate_string,
        'lastName': validate_string,
    }

    return validate(value, validators)


def validate_children_data(value):
    """
    Validate a JSON input for children data.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has the format required for posting children data
    """

    if not validate_list(value):
        return False

    for child in value:
        if not validate_person_data(child):
            return False

    return True


def validate_signature(value):
    """
    Validate a JSON input for signature.

    Parameters:
    value (any): Input value

    Returns:
    boolean: True if value has the format required for a signature
    """

    try:
        return base64.b64encode(base64.b64decode(value.split(',')[1])) == \
               bytes(value.split(',')[1], encoding='ascii')
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
    boolean: True if value has email format or is empty string
    """
    return isinstance(value, str) and (email_regex.match(value) or value == "")


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
