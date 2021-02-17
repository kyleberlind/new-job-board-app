"""02/15/2021"""
def snake_to_camel_case(string: str) -> str:
    """Converts snake case to camel case"""
    split_words, camel_case_words = string.split('_'), ''
    for index, word in enumerate(split_words):
        if index == 0:
            camel_case_words += word
        else:
            camel_case_words += word.capitalize()
    return camel_case_words
