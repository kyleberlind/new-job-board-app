"""03/04/2021"""
import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from ..models.job_posting.job_posting_application_model import JobPostingApplicationModelSQLAlchemy
from ..models.applicant.applicant_info_model import ApplicantInfoModelSQLAlchemy

class JobPostingApplicationObject(SQLAlchemyObjectType):
    class Meta:
        model = JobPostingApplicationModelSQLAlchemy
        interfaces = (graphene.relay.Node,)

class ApplicantInfoModelObject(SQLAlchemyObjectType):
    class Meta:
        model = ApplicantInfoModelSQLAlchemy
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    applications_by_employer_id = graphene.List(
        JobPostingApplicationObject, employer_id=graphene.Int())

    @staticmethod
    def resolve_applications_by_employer_id(parent, info, **args):
        employer_id = args.get('employer_id')
        applications_query = JobPostingApplicationObject.get_query(info)
        return applications_query.filter(
            JobPostingApplicationModelSQLAlchemy.employer_id.contains(employer_id)).all()

job_posting_schema = graphene.Schema(query=Query)
