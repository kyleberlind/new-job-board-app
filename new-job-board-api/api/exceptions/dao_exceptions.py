"""
01/26/2020

Exceptions for data access objects
"""

class BaseDaoException(Exception):
    """Base Exception for Data access objects"""

class JobDaoException(BaseException):
    """Base Exception for Data access objects"""

class NoJobPostingFoundException(BaseException):
    """Base Exception for Data access objects"""
