"""03/28/2021"""
import graphene


class JobPostingLocationInput(graphene.InputObjectType):
    """Input for job posting location mutation"""
    city = graphene.String(required=True)
    state = graphene.String(required=True)
    zip_code = graphene.String(required=True)


class JobPostingFieldsInput(graphene.InputObjectType):
    """Input for job posting fields mutation"""
    id = graphene.Int(required=True)
    required = graphene.Boolean(required=True)

class JobPostingInput(graphene.InputObjectType):
    """Input for job posting mutation"""
    employer_id = graphene.Int(required=True)
    role = graphene.String(required=True)
    team = graphene.String(required=True)
    description = graphene.String(required=True)
    location = JobPostingLocationInput(required=True)
    fields = graphene.List(JobPostingFieldsInput)
